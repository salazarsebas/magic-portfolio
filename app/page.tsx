import Link from 'next/link'
import { AsciiHero } from '@/components/ascii-hero'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <AsciiHero />
      <h1 className="text-4xl font-bold mt-8 mb-4">Sebastián Salazar Solano</h1>
      <p className="text-xl mb-8">"Knowledge is the torch that lights the world"</p>
      <div className="space-x-4">
        <Link 
          href="/projects" 
          className="bg-primary text-primary-foreground px-6 py-2 rounded-full hover:bg-primary/90 transition-colors"
        >
          View Projects
        </Link>
        <Link 
          href="/contact" 
          className="bg-secondary text-secondary-foreground px-6 py-2 rounded-full hover:bg-secondary/90 transition-colors"
        >
          Contact Me
        </Link>
      </div>
    </div>
  )
}

