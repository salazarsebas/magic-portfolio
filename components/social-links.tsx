import Link from 'next/link'
import { Github, Linkedin, Twitter } from 'lucide-react'

export function SocialLinks() {
  return (
    <div className="flex space-x-4 mb-8">
      <Link href="https://github.com/salazarsebas" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
        <Github size={24} />
      </Link>
      <Link href="https://www.linkedin.com/in/sebastian-salazar-solano/" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
        <Linkedin size={24} />
      </Link>
      <Link href="https://x.com/ssalazar_dev" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
        <Twitter size={24} />
      </Link>
    </div>
  )
}

