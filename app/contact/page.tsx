import { AsciiContactArt } from '@/components/ascii-contact-art'
import { SocialLinks } from '@/components/social-links'
import { ResumeButton } from '@/components/resume-button'

export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Contact Me</h1>
      <div className="flex flex-col items-center space-y-8">
        <AsciiContactArt />
        <SocialLinks />
        <ResumeButton />
      </div>
    </div>
  )
}

