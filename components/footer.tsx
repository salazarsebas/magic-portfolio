import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-background text-foreground py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p>¡Nice to have you here!</p>
          </div>
          <div className="flex space-x-4">
            <Link href="https://github.com/salazarsebas" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              GitHub
            </Link>
            <Link href="https://www.linkedin.com/in/sebastian-salazar-solano/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              LinkedIn
            </Link>
            <Link href="https://x.com/ssalazar_dev" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              X
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

