'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'

const GRID_SIZE = 20
const CELL_SIZE = 20
const INITIAL_DINO = [{ x: 10, y: 10 }]
const INITIAL_DIRECTION = { x: 1, y: 0 }
const INITIAL_PLANT = { x: 15, y: 15 }
const GAME_SPEED = 150

const PLANTS = ['🌱', '🌾', '🌳', '🌴']
const DINO = '🦕'

const DIRECTIONS = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
  w: { x: 0, y: -1 },
  s: { x: 0, y: 1 },
  a: { x: -1, y: 0 },
  d: { x: 1, y: 0 }
}

const directionToAngle = (dir) => {
  if (dir.x === 1) return Math.PI
  if (dir.x === -1) return 0
  if (dir.y === 1) return 3 * Math.PI / 2
  if (dir.y === -1) return Math.PI / 2
  return Math.PI
}

export default function DinoSnake() {
  const [dino, setDino] = useState(INITIAL_DINO)
  const [plant, setPlant] = useState(INITIAL_PLANT)
  const [gameOver, setGameOver] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [score, setScore] = useState(0)
  const [currentPlant, setCurrentPlant] = useState(PLANTS[0])
  const canvasRef = useRef(null)
  const gameLoopRef = useRef(null)
  const directionRef = useRef(INITIAL_DIRECTION)
  const lastMoveTimeRef = useRef(0)
  const router = useRouter()

  const isValidMove = useCallback((newDirection) => {
    const currentDirection = directionRef.current
    return !(newDirection.x + currentDirection.x === 0 && 
             newDirection.y + currentDirection.y === 0)
  }, [])

  const handleKeyPress = useCallback((e) => {
    if (!gameStarted) return
    
    e.preventDefault()
    const key = e.key.toLowerCase()
    const newDirection = DIRECTIONS[key] || DIRECTIONS[e.key]
    
    if (newDirection && isValidMove(newDirection)) {
      directionRef.current = newDirection
    }
  }, [isValidMove, gameStarted])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [handleKeyPress])

  const spawnNewPlant = useCallback(() => {
    let newPlantPos
    do {
      newPlantPos = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      }
    } while (dino.some(segment => 
      segment.x === newPlantPos.x && segment.y === newPlantPos.y
    ))
    setPlant(newPlantPos)
    setCurrentPlant(PLANTS[Math.floor(Math.random() * PLANTS.length)])
  }, [dino])

  const moveDino = useCallback(() => {
    if (gameOver || !gameStarted) return

    const now = performance.now()
    if (now - lastMoveTimeRef.current < GAME_SPEED) return
    lastMoveTimeRef.current = now

    setDino(prevDino => {
      const newDino = [...prevDino]
      const head = {
        x: newDino[0].x + directionRef.current.x,
        y: newDino[0].y + directionRef.current.y
      }

      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        setGameOver(true)
        return prevDino
      }

      if (newDino.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true)
        return prevDino
      }

      newDino.unshift(head)

      if (head.x === plant.x && head.y === plant.y) {
        setScore(prev => prev + 1)
        spawnNewPlant()
      } else {
        newDino.pop()
      }

      return newDino
    })
  }, [gameOver, gameStarted, spawnNewPlant])

  useEffect(() => {
    const gameLoop = () => {
      moveDino()
      gameLoopRef.current = requestAnimationFrame(gameLoop)
    }
    
    if (gameStarted) {
      gameLoopRef.current = requestAnimationFrame(gameLoop)
    }
    
    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current)
      }
    }
  }, [moveDino, gameStarted])

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, GRID_SIZE * CELL_SIZE, GRID_SIZE * CELL_SIZE)

    dino.forEach((segment, index) => {
      ctx.save()
      ctx.translate(
        (segment.x + 0.5) * CELL_SIZE,
        (segment.y + 0.5) * CELL_SIZE
      )

      let rotation
      if (index === 0) {
        rotation = directionToAngle(directionRef.current)
      } else {
        const prevSegment = dino[index - 1]
        const dx = prevSegment.x - segment.x
        const dy = prevSegment.y - segment.y
        rotation = Math.atan2(dy, dx) + Math.PI
      }

      ctx.rotate(rotation)
      ctx.font = `${CELL_SIZE}px Arial`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(DINO, 0, 0)
      ctx.restore()
    })

    ctx.font = `${CELL_SIZE}px Arial`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(
      currentPlant,
      (plant.x + 0.5) * CELL_SIZE,
      (plant.y + 0.5) * CELL_SIZE
    )
  }, [dino, plant, currentPlant])

  const handleStart = () => {
    setGameStarted(true)
    lastMoveTimeRef.current = performance.now()
  }

  const handleRestart = () => {
    setDino(INITIAL_DINO)
    directionRef.current = INITIAL_DIRECTION
    setPlant(INITIAL_PLANT)
    setGameOver(false)
    setGameStarted(false)
    setScore(0)
    setCurrentPlant(PLANTS[0])
    lastMoveTimeRef.current = performance.now()
  }

  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8">DinoSnake</h1>
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={GRID_SIZE * CELL_SIZE}
          height={GRID_SIZE * CELL_SIZE}
          className="border border-gray-300 rounded-lg shadow-lg bg-green-50"
        />
        {!gameStarted && !gameOver && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center rounded-lg">
            <div className="bg-background border border-border p-4 rounded-lg text-center">
              <h2 className="text-2xl font-bold mb-4 text-foreground">Ready to Play DinoSnake?</h2>
              <button
                onClick={handleStart}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-full hover:bg-primary/90 transition-colors"
              >
                Start Game
              </button>
            </div>
          </div>
        )}
        {gameOver && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center rounded-lg">
            <div className="bg-background border border-border p-4 rounded-lg text-center">
              <h2 className="text-2xl font-bold mb-2 text-foreground">Game Over</h2>
              <p className="text-foreground mb-4">Your score: {score}</p>
              <button
                onClick={handleRestart}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-full hover:bg-primary/90 transition-colors mr-2"
              >
                Play Again
              </button>
              <button
                onClick={() => router.push('/games')}
                className="bg-secondary text-secondary-foreground px-4 py-2 rounded-full hover:bg-secondary/90 transition-colors"
              >
                Back to Games
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="mt-4">
        <p className="text-xl">Score: {score}</p>
      </div>
      <div className="mt-4 text-center">
        <p className="text-sm text-muted-foreground">Use arrow keys or WASD to control the dinosaur</p>
      </div>
    </div>
  )
}

