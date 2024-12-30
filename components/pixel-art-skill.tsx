interface PixelArtSkillProps {
  name: string
  level: number
}

export function PixelArtSkill({ name, level }: PixelArtSkillProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 grid grid-cols-4 grid-rows-4 gap-0.5 mb-2">
        {Array.from({ length: 16 }).map((_, index) => (
          <div 
            key={index} 
            className={`${index < level * 3 ? 'bg-primary' : 'bg-gray-300'} w-full h-full`}
          />
        ))}
      </div>
      <span className="text-sm font-medium">{name}</span>
    </div>
  )
}

