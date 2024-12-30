import Image from 'next/image'
import { PixelArtSkill } from '@/components/pixel-art-skill'

export default function About() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">About Me</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Image 
            src="/profile-picture.jpg" 
            alt="Profile Picture" 
            width={400} 
            height={400} 
            className="rounded-lg"
          />
        </div>
        <div>
          <p className="mb-4">
            Hi, I'm a passionate and innovative Software Engineer and Developer with a strong focus on leveraging artificial intelligence to drive
            efficiency and scalability in software development. Proven track record of contributing to open-source projects within the
            Starknet and Stellar ecosystems, demonstrating deep engagement with blockchain and decentralized technologies. Key member
            of the founding team of a project in the Stellar network, contributing to strategic planning, architecture, and development.
            Adept at collaborating in distributed environments and committed to producing high-quality, maintainable code that aligns
            with best practices in responsible AI use.
          </p>
          <h2 className="text-2xl font-bold mb-4">Skills</h2>
          <div className="grid grid-cols-2 gap-4">
            <PixelArtSkill name="React" level={5} />
            <PixelArtSkill name="Next.js" level={4} />
            <PixelArtSkill name="TypeScript" level={4} />
            <PixelArtSkill name="Node.js" level={3} />
          </div>
        </div>
      </div>
    </div>
  )
}

