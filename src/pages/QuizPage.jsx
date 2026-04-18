import { useMemo, useState } from 'react'
import { QUIZ_SIZE, quizQuestions } from '../data/quizQuestions'
import usePageMeta from '../hooks/usePageMeta'

function shuffleQuestions(items) {
  const shuffled = [...items]

  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    const current = shuffled[i]
    shuffled[i] = shuffled[j]
    shuffled[j] = current
  }

  return shuffled
}

function createQuiz() {
  return shuffleQuestions(quizQuestions).slice(0, QUIZ_SIZE)
}

function getResultCopy(score) {
  if (score === QUIZ_SIZE) return 'Perfect dimension hop. Rick would pretend not to be impressed.'
  if (score >= 8) return 'You know your way around the multiverse.'
  if (score >= 5) return 'Solid run. A little more portal mileage and you are there.'
  return 'The Citadel has questions. Try another round.'
}

function getOptionLabel(question, key) {
  return question.options.find(option => option.key === key)?.label ?? 'No answer'
}

function StartQuizModal({ onStart }) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center px-4 py-8">
      <div className="absolute inset-0 bg-dark-950/80 backdrop-blur-sm" />
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="start-quiz-title"
        aria-describedby="start-quiz-description"
        className="relative z-10 w-full max-w-lg overflow-hidden rounded-xl border border-border-glass bg-dark-900/95 p-6 text-center shadow-[0_0_44px_rgba(56,189,248,0.14)] sm:p-8"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-portal-green/70 to-transparent" />
        <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-portal-green">Ready?</p>
        <h2 id="start-quiz-title" className="mt-3 font-display text-3xl font-bold tracking-tight text-gray-100">
          Start the Rick and Morty Quiz
        </h2>
        <p id="start-quiz-description" className="mt-4 text-sm leading-relaxed text-gray-400">
          You will get 10 random multiple-choice questions. Answers stay locked away until the end.
        </p>
        <div className="mt-6 grid grid-cols-3 gap-3 text-center">
          <div className="rounded-lg border border-border-glass bg-surface-glass px-3 py-3">
            <div className="font-display text-xl font-bold text-portal-green">{QUIZ_SIZE}</div>
            <div className="mt-1 text-[10px] uppercase tracking-[0.16em] text-gray-500">Questions</div>
          </div>
          <div className="rounded-lg border border-border-glass bg-surface-glass px-3 py-3">
            <div className="font-display text-xl font-bold text-electric-blue">{quizQuestions.length}</div>
            <div className="mt-1 text-[10px] uppercase tracking-[0.16em] text-gray-500">In Bank</div>
          </div>
          <div className="rounded-lg border border-border-glass bg-surface-glass px-3 py-3">
            <div className="font-display text-xl font-bold text-accent-amber">1</div>
            <div className="mt-1 text-[10px] uppercase tracking-[0.16em] text-gray-500">Attempt</div>
          </div>
        </div>
        <button
          type="button"
          onClick={onStart}
          autoFocus
          className="mt-7 w-full rounded-lg border border-portal-green/40 bg-portal-green/10 px-6 py-3 font-display text-sm font-semibold text-portal-green transition-[border-color,background-color,box-shadow] hover:border-portal-green/70 hover:bg-portal-green/15 hover:shadow-[0_0_24px_rgba(57,231,95,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue sm:w-auto"
        >
          Start Quiz
        </button>
      </section>
    </div>
  )
}

export default function QuizPage() {
  usePageMeta({
    title: 'Quiz',
    description:
      'Take a 10-question Rick and Morty quiz with random multiple-choice questions from across the multiverse.',
  })

  const [questions, setQuestions] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)

  const currentQuestion = questions[currentIndex]
  const selectedAnswer = currentQuestion ? answers[currentQuestion.id] ?? '' : ''
  const answeredCount = Object.keys(answers).length
  const progressPercent = hasStarted ? ((currentIndex + 1) / QUIZ_SIZE) * 100 : 0
  const isLastQuestion = currentIndex === QUIZ_SIZE - 1

  const score = useMemo(
    () => questions.reduce((total, question) => (
      answers[question.id] === question.answerKey ? total + 1 : total
    ), 0),
    [answers, questions],
  )

  const handleAnswer = (answerKey) => {
    if (!currentQuestion) return

    setAnswers(previous => ({
      ...previous,
      [currentQuestion.id]: answerKey,
    }))
  }

  const handleBack = () => {
    setCurrentIndex(index => Math.max(0, index - 1))
  }

  const handleNext = () => {
    if (!selectedAnswer) return

    if (isLastQuestion) {
      setSubmitted(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    setCurrentIndex(index => Math.min(QUIZ_SIZE - 1, index + 1))
  }

  const handleStartQuiz = () => {
    setQuestions(createQuiz())
    setCurrentIndex(0)
    setAnswers({})
    setSubmitted(false)
    setHasStarted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!hasStarted) {
    return (
      <div className="relative mx-auto min-h-[calc(100vh-9rem)] max-w-5xl px-4 py-10 sm:py-14">
        <section className="mb-8">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-portal-green">Rick and Morty Quiz</p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-gray-100 sm:text-4xl" style={{ textWrap: 'balance' }}>
            Test your multiverse recall
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-400 sm:text-base">
            Step through 10 random questions, then unlock your score and full answer review.
          </p>
        </section>

        <section
          aria-hidden="true"
          className="relative overflow-hidden rounded-xl border border-border-glass bg-surface-glass p-5 opacity-45 blur-[1px] backdrop-blur-sm sm:p-7"
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-electric-blue/60 to-transparent" />
          <p className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-electric-blue">
            Question 1 of {QUIZ_SIZE}
          </p>
          <div className="mt-5 h-2 overflow-hidden rounded-full bg-dark-800">
            <div className="h-full w-[10%] rounded-full bg-linear-to-r from-portal-green to-electric-blue" />
          </div>
          <div className="mt-8 h-8 max-w-2xl rounded bg-dark-800/80" />
          <div className="mt-6 grid gap-3">
            {['A', 'B', 'C', 'D'].map(key => (
              <div key={key} className="flex min-h-16 items-center gap-4 rounded-lg border border-border-glass bg-dark-900/50 px-4 py-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded border border-border-glass bg-surface-glass font-display text-sm font-bold text-electric-blue">
                  {key}
                </span>
                <span className="h-3 w-full max-w-sm rounded bg-dark-700/80" />
              </div>
            ))}
          </div>
        </section>

        <StartQuizModal onStart={handleStartQuiz} />
      </div>
    )
  }

  if (submitted) {
    const percentage = Math.round((score / QUIZ_SIZE) * 100)

    return (
      <div className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
        <section className="relative overflow-hidden rounded-xl border border-border-glass bg-surface-glass px-5 py-8 text-center backdrop-blur-sm sm:px-8 sm:py-10">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-portal-green/60 to-transparent" />
          <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-portal-green">Quiz complete</p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-gray-100 sm:text-5xl">
            {score}/{QUIZ_SIZE}
          </h1>
          <p className="mt-2 text-lg font-semibold text-electric-blue">{percentage}% correct</p>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-gray-400">
            {getResultCopy(score)}
          </p>
          <button
            type="button"
            onClick={handleStartQuiz}
            className="mt-7 rounded-lg border border-portal-green/40 bg-portal-green/10 px-6 py-3 font-display text-sm font-semibold text-portal-green transition-[border-color,background-color,box-shadow] hover:border-portal-green/70 hover:bg-portal-green/15 hover:shadow-[0_0_24px_rgba(57,231,95,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue"
          >
            Try Another Quiz
          </button>
        </section>

        <section className="mt-8" aria-labelledby="quiz-review-title">
          <h2 id="quiz-review-title" className="font-display text-2xl font-bold tracking-tight text-gray-100">
            Answer Review
          </h2>
          <div className="mt-5 grid gap-4">
            {questions.map((question, index) => {
              const selectedKey = answers[question.id]
              const isCorrect = selectedKey === question.answerKey

              return (
                <article
                  key={question.id}
                  className={`rounded-xl border p-5 backdrop-blur-sm ${isCorrect ? 'border-portal-green/25 bg-portal-green/5' : 'border-dead/25 bg-dead/5'}`}
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <h3 className="font-display text-lg font-semibold text-gray-100">
                      {index + 1}. {question.question}
                    </h3>
                    <span className={`shrink-0 rounded px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] ${isCorrect ? 'bg-portal-green/10 text-portal-green' : 'bg-dead/10 text-dead'}`}>
                      {isCorrect ? 'Correct' : 'Missed'}
                    </span>
                  </div>
                  <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                    <div>
                      <dt className="text-gray-500">Your answer</dt>
                      <dd className={isCorrect ? 'mt-1 text-portal-green' : 'mt-1 text-dead'}>
                        {selectedKey}. {getOptionLabel(question, selectedKey)}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">Correct answer</dt>
                      <dd className="mt-1 text-gray-200">
                        {question.answerKey}. {getOptionLabel(question, question.answerKey)}
                      </dd>
                    </div>
                  </dl>
                </article>
              )
            })}
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
      <section className="mb-8">
        <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-portal-green">Rick and Morty Quiz</p>
        <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-gray-100 sm:text-4xl" style={{ textWrap: 'balance' }}>
          Test your multiverse recall
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-400 sm:text-base">
          Answer 10 random questions. The score and corrections unlock after the final question.
        </p>
      </section>

      <section
        aria-labelledby="quiz-question-title"
        className="relative overflow-hidden rounded-xl border border-border-glass bg-surface-glass p-5 backdrop-blur-sm sm:p-7"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-electric-blue/60 to-transparent" />

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-electric-blue">
              Question {currentIndex + 1} of {QUIZ_SIZE}
            </p>
            <p className="mt-1 text-xs text-gray-500">{answeredCount} of {QUIZ_SIZE} answered</p>
          </div>
          <button
            type="button"
            onClick={handleStartQuiz}
            className="w-fit rounded-lg border border-border-glass bg-dark-800/70 px-4 py-2 text-sm text-gray-300 transition-[border-color,background-color,color] hover:border-electric-blue/40 hover:bg-dark-700 hover:text-electric-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue"
          >
            New Random Set
          </button>
        </div>

        <div className="mt-5 h-2 overflow-hidden rounded-full bg-dark-800">
          <div
            className="h-full rounded-full bg-linear-to-r from-portal-green to-electric-blue transition-[width] duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <fieldset className="mt-8">
          <legend id="quiz-question-title" className="font-display text-2xl font-bold leading-tight text-gray-100" style={{ textWrap: 'balance' }}>
            {currentQuestion.question}
          </legend>
          <div className="mt-6 grid gap-3">
            {currentQuestion.options.map(option => {
              const inputId = `question-${currentQuestion.id}-answer-${option.key}`
              const isSelected = selectedAnswer === option.key

              return (
                <label
                  key={option.key}
                  htmlFor={inputId}
                  className={`group flex min-h-16 cursor-pointer items-center gap-4 rounded-lg border px-4 py-3 transition-[border-color,background-color,box-shadow] ${isSelected ? 'border-portal-green/60 bg-portal-green/10 shadow-[0_0_22px_rgba(57,231,95,0.1)]' : 'border-border-glass bg-dark-900/50 hover:border-electric-blue/40 hover:bg-dark-800/70'}`}
                >
                  <input
                    id={inputId}
                    type="radio"
                    name={`question-${currentQuestion.id}`}
                    value={option.key}
                    checked={isSelected}
                    onChange={() => handleAnswer(option.key)}
                    className="h-4 w-4 accent-portal-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue"
                  />
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded border border-border-glass bg-surface-glass font-display text-sm font-bold text-electric-blue">
                    {option.key}
                  </span>
                  <span className="text-sm leading-relaxed text-gray-200 sm:text-base">{option.label}</span>
                </label>
              )
            })}
          </div>
        </fieldset>

        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={handleBack}
            disabled={currentIndex === 0}
            className="rounded-lg border border-border-glass bg-dark-800/70 px-5 py-3 font-display text-sm font-semibold text-gray-300 transition-[border-color,background-color,color,opacity] hover:border-electric-blue/40 hover:bg-dark-700 hover:text-electric-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-border-glass disabled:hover:bg-dark-800/70 disabled:hover:text-gray-300"
          >
            Back
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={!selectedAnswer}
            className="rounded-lg border border-portal-green/40 bg-portal-green/10 px-6 py-3 font-display text-sm font-semibold text-portal-green transition-[border-color,background-color,box-shadow,opacity] hover:border-portal-green/70 hover:bg-portal-green/15 hover:shadow-[0_0_24px_rgba(57,231,95,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-portal-green/40 disabled:hover:bg-portal-green/10 disabled:hover:shadow-none"
          >
            {isLastQuestion ? 'Submit Quiz' : 'Next Question'}
          </button>
        </div>
      </section>
    </div>
  )
}
