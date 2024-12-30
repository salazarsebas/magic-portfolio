'use client'

import { useState } from 'react'
import { FileText } from 'lucide-react'

const resumeContent = `
Sebastián Salazar Solano 
Costa Rica · linkedin.com/in/sebastian-salazar-solano/ · https://github.com/salazarsebas · 
sebastian.salazar.solano@gmail.com · https://app.onlydust.com/u/salazarsebas  
 
Passionate and innovative Software Engineer and Developer with a strong focus on leveraging artificial intelligence to drive 
efficiency and scalability in software development. Proven track record of contributing to open-source projects within the 
Starknet and Stellar ecosystems, demonstrating deep engagement with blockchain and decentralized technologies. Key member 
of the founding team of a project in the Stellar network, contributing to strategic planning, architecture, and development. 
Adept at collaborating in distributed environments and committed to producing high-quality, maintainable code that aligns 
with best practices in responsible AI use. 
 
PROFESSIONAL EXPERIENCE 
 
Revolutionary Farmers 
Co-founder 
Remote  
October 2024–Present  
● I added small functionalities to the project that add professionalism to it. 
● I am a maintainer in open-source contributions and provide help to contributors in case they need it. 
● I participated in introducing the project on the OnlyDust platform and started participating in 
ODHacks. 
● I developed the implementation of the Trustless Work API (implementation of escrows in Stellar). 
● I proposed ideas for the project to be developed and as a team we decided which ideas of each member 
to adopt to have the best project, innovative and with projection. 
 
OnlyDust 
OOS Contributor 
Remote 
November 2024–Present 
● I contributed with component staging with shadcn/ui to the SafeSwap project. 
● I contributed with the solution to a bug in the Citizen of Arcanis project game. 
● I contributed help/guidance for contributors to the semaphore-stellar-boilerplate project. 
● I contributed with help/guidelines for the contributors and contributed with the landing page footer 
to the PayStell project. 
● I contributed with unit testing in Cairo to the Go Stark Me project. 
 
Personal projects 
Software Developer 
Costa Rica 
January 2023–Present 
● Creation of projects with the objective of receiving learning and that can be converted into real projects. 
● Carrying out personal projects to improve my skills in software development. 
 
EDUCATION 
 
Universidad Internacional de las Américas 
Software engineering  
Costa Rica 
January 2023-Present 

SKILLS 
 
● Proficient in Cairo, Astro, Java, Python, C#, and JavaScript with experience in web development, unit testing, 
and game development. Active in OSP contributing with documentation, bug fixes and leading. 
`

export function ResumeButton() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <>
      <button
        onClick={openModal}
        className="flex items-center space-x-2 bg-secondary text-secondary-foreground px-6 py-2 rounded-full hover:bg-secondary/90 transition-colors"
      >
        <FileText size={20} />
        <span>View Resume</span>
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-background p-4 rounded-lg w-full max-w-4xl h-[80vh] flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Resume</h2>
              <button onClick={closeModal} className="text-foreground hover:text-primary">
                Close
              </button>
            </div>
            <div className="flex-grow overflow-auto">
              <pre className="whitespace-pre-wrap text-sm">{resumeContent}</pre>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => {
                  const blob = new Blob([resumeContent], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'Sebastian_Salazar_Solano_Resume.txt';
                  a.click();
                }}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-full hover:bg-primary/90 transition-colors"
              >
                Download Resume
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

