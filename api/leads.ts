import type { IncomingMessage, ServerResponse } from 'node:http'
import { MongoClient } from 'mongodb'

// Tipos mínimos do req/res que a Vercel injeta nas Serverless Functions Node
// (body já vem parseado como JSON, e res ganha os helpers .status()/.json()).
// Evitamos depender do pacote @vercel/node só por esses tipos — a árvore de
// dependências dele (ajv/path-to-regexp/undici antigos) trazia 5
// vulnerabilidades conhecidas (2 moderate, 3 high) sem necessidade real aqui.
type VercelRequest = IncomingMessage & {
  method?: string
  body?: unknown
}

type VercelResponse = ServerResponse & {
  status(code: number): VercelResponse
  json(body: unknown): void
}

const MONGODB_URI = process.env.MONGODB_URI
const DB_NAME = 'vysao-solar'
const COLLECTION_NAME = 'leads'
const TIPOS_IMOVEL_VALIDOS = new Set(['Residencial', 'Comercial', 'Rural'])

let cachedClientPromise: Promise<MongoClient> | null = null

// Reaproveita a conexão entre invocações "quentes" da function — abrir uma
// conexão nova a cada request esgota rápido o limite de conexões do cluster
// M0 (free tier) sob concorrência.
function getClient(): Promise<MongoClient> {
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI não configurada nas variáveis de ambiente da Vercel')
  }
  if (!cachedClientPromise) {
    cachedClientPromise = new MongoClient(MONGODB_URI).connect()
  }
  return cachedClientPromise
}

type LeadPayload = {
  nome?: unknown
  telefone?: unknown
  cidade?: unknown
  valor_conta?: unknown
  tipo_imovel?: unknown
  'bot-field'?: unknown
}

function readString(value: unknown): string {
  return typeof value === 'string' || typeof value === 'number' ? String(value).trim() : ''
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const body = (req.body ?? {}) as LeadPayload

  // Honeypot: campo escondido que só bots preenchem. Finge sucesso sem
  // gravar nada, pra não sinalizar pro bot que foi filtrado.
  if (readString(body['bot-field']) !== '') {
    res.status(200).json({ ok: true })
    return
  }

  const nome = readString(body.nome)
  const telefone = readString(body.telefone)
  const cidade = readString(body.cidade)
  const valorConta = readString(body.valor_conta)
  const tipoImovel = readString(body.tipo_imovel)

  if (!nome || !telefone || !cidade || !valorConta || !TIPOS_IMOVEL_VALIDOS.has(tipoImovel)) {
    res.status(400).json({ error: 'Campos obrigatórios ausentes ou inválidos' })
    return
  }

  try {
    const client = await getClient()
    await client.db(DB_NAME).collection(COLLECTION_NAME).insertOne({
      nome,
      telefone,
      cidade,
      valorConta,
      tipoImovel,
      createdAt: new Date(),
      userAgent: req.headers['user-agent'] ?? null,
    })
    res.status(200).json({ ok: true })
  } catch (err) {
    console.error('[api/leads] Falha ao salvar lead no MongoDB', err)
    res.status(500).json({ error: 'Falha ao salvar lead' })
  }
}
