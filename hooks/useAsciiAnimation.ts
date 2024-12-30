import { useState, useEffect } from 'react'

const frames = [
  `
   _____
  |     |
  |     |
  |_____|
  `,
  `
   _____
  |  _  |
  | | | |
  |_____| 
  `,
  `
   _____
  |  _  |
  | |_| |
  |_____|
  `,
]

export function useAsciiAnimation(interval = 500) {
  const [frame, setFrame] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setFrame((prevFrame) => (prevFrame + 1) % frames.length)
    }, interval)

    return () => clearInterval(timer)
  }, [interval])

  return frames[frame]
}

