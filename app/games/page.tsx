import Image from 'next/image'
import Link from 'next/link'

const games = [
  {
    id: 1,
    title: "Dinosnake",
    image: "/games/dinosnake.jpg",
    link: "/games/dinosnake"
  },
  {
    id: 2,
    title: "Farmer Tetris",
    image: "/games/farmer-tetris.jpg",
    link: "/games/farmer-tetris"
  }
]

export default function Games() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Games</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {games.map((game) => (
          <Link key={game.id} href={game.link} className="group">
            <div className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105">
              <Image 
                src={game.image} 
                alt={game.title} 
                width={600} 
                height={400} 
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h2 className="text-2xl font-bold mb-2">{game.title}</h2>
                <p className="text-sm">Click to play!</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

