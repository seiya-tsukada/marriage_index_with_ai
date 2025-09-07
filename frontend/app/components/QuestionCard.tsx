'use client'

interface Question {
  id: number
  question: string
  options: Array<{
    id: string
    text: string
    score: number
  }>
}

interface QuestionCardProps {
  question: Question
  onAnswer: (optionId: string) => void
}

export default function QuestionCard({ question, onAnswer }: QuestionCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
        {question.question}
      </h2>
      
      <div className="space-y-4">
        {question.options.map((option) => (
          <button
            key={option.id}
            onClick={() => onAnswer(option.id)}
            className="w-full p-4 text-left bg-gray-50 hover:bg-primary-50 border border-gray-200 hover:border-primary-300 rounded-lg transition-all duration-200 hover:shadow-md group"
          >
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full border-2 border-gray-300 group-hover:border-primary-500 mr-4 flex-shrink-0"></div>
              <span className="text-gray-700 group-hover:text-primary-700 font-medium">
                {option.text}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
