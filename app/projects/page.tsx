import { ProjectCard } from '@/components/project-card'

const projects = [
  {
    id: 1,
    title: 'AI-Powered Chat Application',
    description: 'A real-time chat application with AI-powered responses.',
    technologies: ['React', 'Node.js', 'Socket.io', 'OpenAI API'],
    image: '/projects/chat-app.jpg',
    demoUrl: 'https://chat-app-demo.com',
    repoUrl: 'https://github.com/username/chat-app',
  },
  {
    id: 2,
    title: 'E-commerce Platform',
    description: 'A full-featured e-commerce platform with payment integration.',
    technologies: ['Next.js', 'Stripe', 'MongoDB', 'Tailwind CSS'],
    image: '/projects/ecommerce.jpg',
    demoUrl: 'https://ecommerce-demo.com',
    repoUrl: 'https://github.com/username/ecommerce',
  },
  {
    id: 3,
    title: 'Portfolio Website Generator',
    description: 'An application that generates custom portfolio websites for developers.',
    technologies: ['Vue.js', 'Firebase', 'Netlify'],
    image: '/projects/portfolio-generator.jpg',
    demoUrl: '',
    repoUrl: 'https://github.com/username/portfolio-generator',
  },
  {
    id: 4,
    title: 'Blockchain Explorer',
    description: 'A web application for exploring and analyzing blockchain transactions.',
    technologies: ['React', 'Web3.js', 'Express', 'MongoDB'],
    image: '/projects/blockchain-explorer.jpg',
    demoUrl: 'https://blockchain-explorer-demo.com',
    repoUrl: 'https://github.com/username/blockchain-explorer',
  },
  {
    id: 5,
    title: 'AR Navigation App',
    description: 'An augmented reality app for indoor navigation in large buildings.',
    technologies: ['React Native', 'ARKit', 'ARCore', 'Node.js'],
    image: '/projects/ar-navigation.jpg',
    demoUrl: '',
    repoUrl: 'https://github.com/username/ar-navigation',
  },
]

export default function Projects() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">My Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  )
}

