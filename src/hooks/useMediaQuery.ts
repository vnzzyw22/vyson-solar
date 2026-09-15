import { useEffect, useState } from 'react'

// Calcula o valor inicial de forma síncrona (lazy initializer), não em um
// efeito — assim o primeiro render já sai correto. Isso importa bastante no
// caso de uso do vídeo da Hero: se o mount inicial "chutasse" desktop e só
// corrigisse depois num efeito, o <video preload="auto"> teria uma chance de
// começar a baixar antes de ser desmontado, gastando dado do usuário no
// celular à toa.
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches)

  useEffect(() => {
    const mql = window.matchMedia(query)
    setMatches(mql.matches)
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [query])

  return matches
}
