import { useState } from "react"
import { PenTool, Palette, Code, Server } from "lucide-react"
import Program from "../components/Program"
import IllustrationGallery from "./Art"

const workCards = [
  {
    id: "illustration",
    title: "Illustration",
    description: "Creating stunning visuals with Clip Studio & Ibis Paint.",
    icon: PenTool,
    color: "purple",
  },
  {
    id: "design",
    title: "Graphic Design",
    description: "Crafting modern and elegant UI/UX experiences.",
    icon: Palette,
    color: "blue",
  },
  {
    id: "programming",
    title: "Programming",
    description: "Building web applications with React, Vite, & Laravel.",
    icon: Code,
    color: "green",
  },
  {
    id: "backend",
    title: "Backend Development",
    description: "Ensuring data security and scalability with Hono & Laravel.",
    icon: Server,
    color: "yellow",
  },
]

const MyWork = () => {
  const [activeSection, setActiveSection] = useState(null)

  const handleSectionClick = (section) => {
    setActiveSection(activeSection === section ? null : section)
  }

  return (
    <div className="py-10 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="bg-gray-800 rounded-lg p-8 shadow-xl text-white">
          {/* Header */}
          <div className="mb-10 text-center">
            <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
              My Work
            </h2>
            <p className="text-gray-400">Showcasing my journey in Illustration & Programming</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {workCards.map((card) => (
              <div
                key={card.id}
                className={`p-6 rounded-lg cursor-pointer transition-all duration-300 ease-in-out ${
                  activeSection === card.id
                    ? `bg-${card.color}-400 bg-opacity-25`
                    : `hover:bg-${card.color}-400 hover:bg-opacity-30`
                }`}
                onClick={() => handleSectionClick(card.id)}
              >
                <div className="flex items-start space-x-4">
                  <card.icon className={`text-${card.color}-400 w-6 h-6 mt-1`} />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                    <p className="text-gray-400">{card.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="mt-8 transition-all duration-300 ease-in-out">
        {activeSection === "programming" && <Program />}
        {activeSection === "illustration" && <IllustrationGallery />}
      </div>
    </div>
  )
}

export default MyWork