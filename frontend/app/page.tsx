'use client'

import { useState, useEffect } from 'react'
import QuestionCard from './components/QuestionCard'
import ResultCard from './components/ResultCard'
import LoadingSpinner from './components/LoadingSpinner'

interface Question {
  id: number
  question: string
  options: Array<{
    id: string
    text: string
    score: number
  }>
}

interface Answer {
  question_id: number
  option_id: string
}

interface Result {
  title: string
  description: string
  color: string
  total_score: number
}

export default function Home() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [result, setResult] = useState<Result | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchQuestions()
  }, [])

  const fetchQuestions = async () => {
    try {
      const response = await fetch('/api/questions')
      const data = await response.json()
      setQuestions(data.questions)
    } catch (error) {
      console.error('Failed to fetch questions:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAnswer = (optionId: string) => {
    const newAnswer: Answer = {
      question_id: questions[currentQuestionIndex].id,
      option_id: optionId
    }
    
    const updatedAnswers = [...answers, newAnswer]
    setAnswers(updatedAnswers)

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      submitQuiz(updatedAnswers)
    }
  }

  const submitQuiz = async (finalAnswers: Answer[]) => {
    setSubmitting(true)
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers: finalAnswers }),
      })
      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error('Failed to submit quiz:', error)
    } finally {
      setSubmitting(false)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestionIndex(0)
    setAnswers([])
    setResult(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center p-4">
        <ResultCard result={result} onReset={resetQuiz} />
      </div>
    )
  }

  if (submitting) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner />
          <p className="mt-4 text-lg text-gray-600">結果を計算中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Marriage Index</h1>
          <p className="text-lg text-gray-600">あなたの結婚観を診断してみましょう</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>質問 {currentQuestionIndex + 1} / {questions.length}</span>
              <span>{Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {questions.length > 0 && (
            <QuestionCard
              question={questions[currentQuestionIndex]}
              onAnswer={handleAnswer}
            />
          )}
        </div>
      </div>
    </div>
  )
}
