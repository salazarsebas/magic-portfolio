'use client'

import { useAsciiAnimation } from '@/hooks/useAsciiAnimation'

export function AsciiHero() {
  const asciiArt = useAsciiAnimation()

  return (
    <pre className="text-primary font-mono text-sm md:text-base lg:text-lg">
      {asciiArt}
    </pre>
  )
}

