import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'

// Game constants
const BOARD_WIDTH = 10
const BOARD_HEIGHT = 20
const CELL_SIZE = 30

// Farmer levels
const FARMER_LEVELS = [
  'Subsistence Farmer',
  'Smallholder Farmer',
  'Emerging Farmer',
  'Commercial Farmer',
  'Organic Farmer',
  'Regenerative Farmer',
  'Agri-Tech Farmer',
  'Cooperative Farmer',
  'Agro-Industrial Farmer',
  'Agripreneur',
  'Revo Farmer'
]

// Crop emojis for Tetrominos
const CROPS = ['🥔', '🍇', '🥝', '🧅', '🍅', '🍎', '🍆', '🥕', '🌽', '🍋']

// Tetromino shapes
const TETROMINOS = [
  [[1, 1, 1, 1]],                 // I
  [[1, 1], [1, 1]],               // O
  [[0, 1, 1], [1, 1, 0]],         // S
  [[1, 1, 0], [0, 1, 1]],         // Z
  [[1, 0, 0], [1, 1, 1]],         // L
  [[0, 0, 1], [1, 1, 1]],         // J
  [[0, 1, 0], [1, 1, 1]]          // T
]

const createEmptyBoard = () => Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(0))

const FarmerTetris = React.memo(() => {
  const [board, setBoard] = useState(createEmptyBoard())
  const [currentPiece, setCurrentPiece] = useState(null)
  const [nextPiece, setNextPiece] = useState(null)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [isPaused, setIsPaused] = useState(false)
  const [gameStarted, setGameStarted] = useState(false) // Added gameStarted state
  const canvasRef = useRef(null)
  const requestRef = useRef(null)
  const lastTimeRef = useRef(0)
  const dropIntervalRef = useRef(1000)
  const router = useRouter()

  const generatePiece = useCallback(() => {
    const shape = TETROMINOS[Math.floor(Math.random() * TETROMINOS.length)]
    const crop = CROPS[Math.floor(Math.random() * CROPS.length)]
    return {
      shape,
      crop,
      x: Math.floor(BOARD_WIDTH / 2) - Math.floor(shape[0].length / 2),
      y: 0
    }
  }, [])

  const isValidMove = useCallback((shape, x, y) => {
    return shape.every((row, dy) =>
      row.every((value, dx) =>
        value === 0 || (
          x + dx >= 0 &&
          x + dx < BOARD_WIDTH &&
          y + dy < BOARD_HEIGHT &&
          (y + dy < 0 || board[y + dy][x + dx] === 0)
        )
      )
    )
  }, [board])

  const moveDown = useCallback(() => {
    if (!currentPiece) return

    const newY = currentPiece.y + 1
    if (isValidMove(currentPiece.shape, currentPiece.x, newY)) {
      setCurrentPiece(prev => ({ ...prev, y: newY }))
    } else {
      // Piece has landed
      const newBoard = board.map(row => [...row])
      currentPiece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value) {
            newBoard[currentPiece.y + y][currentPiece.x + x] = currentPiece.crop
          }
        })
      })

      // Check for completed rows
      const completedRows = newBoard.filter(row => row.every(cell => cell !== 0)).length
      if (completedRows > 0) {
        const newScore = score + completedRows * 100 * level
        const newLevel = Math.floor(newScore / 1000) + 1
        setScore(newScore)
        setLevel(prevLevel => Math.min(prevLevel + 1, FARMER_LEVELS.length - 1))
        dropIntervalRef.current = Math.max(100, 1000 - (newLevel - 1) * 100)
        
        // Remove completed rows
        const newBoardAfterClear = newBoard.filter(row => !row.every(cell => cell !== 0))
        while (newBoardAfterClear.length < BOARD_HEIGHT) {
          newBoardAfterClear.unshift(Array(BOARD_WIDTH).fill(0))
        }
        setBoard(newBoardAfterClear)
      } else {
        setBoard(newBoard)
      }

      // Prepare the next piece
      const nextPieceValue = nextPiece || generatePiece()
      setCurrentPiece(nextPieceValue)
      setNextPiece(generatePiece())

      // Check for game over
      if (!isValidMove(nextPieceValue.shape, nextPieceValue.x, nextPieceValue.y)) {
        setGameOver(true)
      }
    }
  }, [board, currentPiece, nextPiece, generatePiece, level, score, isValidMove])

  const drawBoard = useCallback(() => {
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, BOARD_WIDTH * CELL_SIZE, BOARD_HEIGHT * CELL_SIZE)

    // Draw the board
    board.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value) {
          ctx.font = `${CELL_SIZE * 0.8}px Arial`
          ctx.fillStyle = 'currentColor'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText(value, x * CELL_SIZE + CELL_SIZE / 2, y * CELL_SIZE + CELL_SIZE / 2)
        }
      })
    })

    // Draw the current piece
    if (currentPiece) {
      currentPiece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value) {
            const pieceX = (currentPiece.x + x) * CELL_SIZE
            const pieceY = (currentPiece.y + y) * CELL_SIZE
            ctx.font = `${CELL_SIZE * 0.8}px Arial`
            ctx.fillStyle = 'currentColor'
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.fillText(currentPiece.crop, pieceX + CELL_SIZE / 2, pieceY + CELL_SIZE / 2)
          }
        })
      })
    }
  }, [board, currentPiece])

  const rotate = useCallback(() => {
    if (!currentPiece) return

    const rotated = currentPiece.shape[0].map((_, i) =>
      currentPiece.shape.map(row => row[i]).reverse()
    )

    if (isValidMove(rotated, currentPiece.x, currentPiece.y)) {
      setCurrentPiece(prev => ({ ...prev, shape: rotated }))
    }
  }, [currentPiece, isValidMove])

  const moveHorizontal = useCallback((direction) => {
    if (!currentPiece) return

    const newX = currentPiece.x + direction
    if (isValidMove(currentPiece.shape, newX, currentPiece.y)) {
      setCurrentPiece(prev => ({ ...prev, x: newX }))
    }
  }, [currentPiece, isValidMove])

  const hardDrop = useCallback(() => {
    if (!currentPiece) return

    let newY = currentPiece.y
    while (isValidMove(currentPiece.shape, currentPiece.x, newY + 1)) {
      newY++
    }
    setCurrentPiece(prev => ({ ...prev, y: newY }))
    moveDown()
  }, [currentPiece, isValidMove, moveDown])

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (gameOver || isPaused) return

    switch (e.key) {
      case 'ArrowLeft':
        moveHorizontal(-1)
        break
      case 'ArrowRight':
        moveHorizontal(1)
        break
      case 'ArrowDown':
        moveDown()
        break
      case 'ArrowUp':
        rotate()
        break
      case ' ':
        hardDrop()
        break
      case 'p':
        setIsPaused(prev => !prev)
        break
    }
  }, [gameOver, isPaused, moveHorizontal, moveDown, rotate, hardDrop])

  const gameLoop = useCallback((timestamp) => {
    if (gameOver || isPaused) return

    if (!lastTimeRef.current || timestamp - lastTimeRef.current >= dropIntervalRef.current) {
      moveDown()
      lastTimeRef.current = timestamp
    }

    drawBoard()
    requestRef.current = requestAnimationFrame(gameLoop)
  }, [isPaused, gameOver, moveDown, drawBoard])

  const startGame = () => { // Added startGame function
    setGameStarted(true)
    setCurrentPiece(generatePiece())
    setNextPiece(generatePiece())
  }

  useEffect(() => {
    if (!currentPiece) {
      setCurrentPiece(generatePiece())
    }
    if (!nextPiece) {
      setNextPiece(generatePiece())
    }

    const handleKeyDown = (e) => handleKeyPress(e)
    window.addEventListener('keydown', handleKeyDown)

    if (gameStarted && !gameOver && !isPaused) { // Updated to start only when gameStarted is true
      requestRef.current = requestAnimationFrame(gameLoop)
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      cancelAnimationFrame(requestRef.current)
    }
  }, [gameStarted, generatePiece, handleKeyPress, gameLoop, gameOver, isPaused])

  const restartGame = () => {
    setBoard(createEmptyBoard())
    setCurrentPiece(generatePiece())
    setNextPiece(generatePiece())
    setGameOver(false)
    setScore(0)
    setLevel(1)
    dropIntervalRef.current = 1000
    lastTimeRef.current = 0
    setIsPaused(false)
    setGameStarted(true) // Reset gameStarted to true on restart
  }

  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8">Farmer Tetris</h1>
      <div className="flex gap-8">
        <div className="relative">
          <canvas
            ref={canvasRef}
            width={BOARD_WIDTH * CELL_SIZE}
            height={BOARD_HEIGHT * CELL_SIZE}
            className="border border-gray-300 rounded-lg shadow-lg"
          />
          {(gameOver || isPaused || !gameStarted) && ( // Updated overlay condition
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center rounded-lg">
              <div className="bg-background border border-border p-4 rounded-lg text-center">
                <h2 className="text-2xl font-bold mb-2 text-foreground">
                  {gameOver ? 'Game Over' : isPaused ? 'Paused' : 'Farmer Tetris'}
                </h2>
                {gameOver && <p className="mb-4 text-foreground">Your score: {score}</p>}
                {!gameStarted && !gameOver && (
                  <p className="mb-4 text-foreground">Get ready to farm some tetrominoes!</p>
                )}
                <button
                  onClick={gameOver ? restartGame : isPaused ? () => setIsPaused(false) : startGame}
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-full hover:bg-primary/90 transition-colors mr-2"
                >
                  {gameOver ? 'Play Again' : isPaused ? 'Resume' : 'Start Game'}
                </button>
                {gameOver && (
                  <button
                    onClick={() => router.push('/games')}
                    className="bg-secondary text-secondary-foreground px-4 py-2 rounded-full hover:bg-secondary/90 transition-colors"
                  >
                    Back to Games
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Next Piece</h2>
            <div className="border border-gray-300 rounded-lg p-2 mb-4">
              {nextPiece && (
                <div style={{ width: nextPiece.shape[0].length * CELL_SIZE, height: nextPiece.shape.length * CELL_SIZE }}>
                  {nextPiece.shape.map((row, y) => (
                    <div key={y} className="flex">
                      {row.map((cell, x) => (
                        <div key={x} className="flex items-center justify-center" style={{ width: CELL_SIZE, height: CELL_SIZE }}>
                          {cell === 1 && <span className="text-2xl">{nextPiece.crop}</span>}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <p className="text-xl mb-2">Score: {score}</p>
            <p className="text-xl mb-4">Level: {FARMER_LEVELS[level - 1]}</p>
            {level === FARMER_LEVELS.length && (
              <a
                href="https://github.com/Crypto-Jaguars"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                You've reached Revo Farmer status!
              </a>
            )}
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2">Controls</h3>
            <ul className="text-sm">
              <li>← → : Move horizontally</li>
              <li>↓ : Move down</li>
              <li>↑ : Rotate</li>
              <li>Space : Hard drop</li>
              <li>P : Pause/Resume</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
})

export default function Page() {
  return <FarmerTetris />
}

