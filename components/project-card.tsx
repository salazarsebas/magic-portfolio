'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useCallback } from 'react'

interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  image: string
  demoUrl: string
  repoUrl: string
}

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleMouseEnter = useCallback(() => setIsExpanded(true), [])
  const handleMouseLeave = useCallback(() => setIsExpanded(false), [])

  return (
    <div 
      className="bg-card text-card-foreground rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Image 
        src={project.image} 
        alt={project.title} 
        width={400} 
        height={200} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-sm mb-4">{project.description}</p>
        <div className={`space-y-4 transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span key={tech} className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
                {tech}
              </span>
            ))}
          </div>
          <div className="flex space-x-4">
            {project.demoUrl ? (
              <Link 
                href={project.demoUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm hover:bg-primary/90 transition-colors"
              >
                Live Demo
              </Link>
            ) : (
              <button
                className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm hover:bg-primary/90 transition-colors cursor-not-allowed"
                onClick={() => alert('This project is still being worked on. Check back soon for a live demo!')}
              >
                Live Demo
              </button>
            )}
            <Link 
              href={project.repoUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-sm hover:bg-secondary/90 transition-colors"
            >
              GitHub Repo
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

