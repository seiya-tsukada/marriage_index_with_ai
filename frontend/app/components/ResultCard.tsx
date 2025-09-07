'use client'

interface Result {
  title: string
  description: string
  color: string
  total_score: number
}

interface ResultCardProps {
  result: Result
  onReset: () => void
}

export default function ResultCard({ result, onReset }: ResultCardProps) {
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-500 text-white'
      case 'green':
        return 'bg-green-500 text-white'
      case 'orange':
        return 'bg-orange-500 text-white'
      default:
        return 'bg-primary-500 text-white'
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <div className={`inline-block px-6 py-3 rounded-full text-lg font-semibold mb-6 ${getColorClasses(result.color)}`}>
          {result.title}
        </div>
        
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          あなたのMarriage Index
        </h2>
        
        <div className="mb-8">
          <div className="text-6xl font-bold text-primary-500 mb-2">
            {result.total_score}
          </div>
          <div className="text-gray-500">/ 9点</div>
        </div>
        
        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          {result.description}
        </p>
        
        <div className="space-y-4">
          <button
            onClick={onReset}
            className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            もう一度診断する
          </button>
          
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            ホームに戻る
          </button>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          Marriage Indexはあなたの結婚観を理解するためのツールです。<br />
          結果は参考程度にご活用ください。
        </p>
      </div>
    </div>
  )
}
