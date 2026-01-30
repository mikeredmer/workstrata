'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { skillQuestions, skillLabels, levelLabels, questionToSkillKey, calculateReadinessScore, getSkillTip, type SkillAssessment } from '@/data/skills-assessment'
import { useAuth } from '@/contexts/AuthContext'
import { saveOnboardingData } from '@/lib/profiles'

type Step = 'role' | 'tasks' | 'skills' | 'personalization' | 'results'

const industries = [
  'Technology', 'Finance', 'Healthcare', 'Marketing', 'Sales',
  'Consulting', 'Education', 'Legal', 'HR', 'Operations', 'Other'
]

const companySizes = [
  '1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'
]

const responsibilities = [
  'Writing & Documentation', 'Research & Analysis', 'Data Management',
  'Communication & Emails', 'Project Management', 'Presentations',
  'Customer Interaction', 'Report Generation', 'Meeting Management',
  'Process Documentation', 'Decision Making', 'Team Coordination'
]

const taskTypes = [
  'Email drafting and responses', 'Meeting notes and summaries',
  'Research and information gathering', 'Data entry and cleanup',
  'Report writing', 'Presentation creation', 'Scheduling and planning',
  'Document review', 'Social media management', 'Customer support responses',
  'Content creation', 'Analysis and insights', 'Process documentation',
  'Training materials', 'Proposal writing'
]

const learningPreferences = [
  { id: 'video', label: 'Video tutorials', desc: 'Watch and learn' },
  { id: 'text', label: 'Articles & guides', desc: 'Read at my pace' },
  { id: 'mixed', label: 'Mix of both', desc: 'Variety works best' }
]

const emailTimes = [
  { id: 'morning', label: 'Morning (7-9am)', desc: 'Start the day learning' },
  { id: 'lunch', label: 'Midday (12-1pm)', desc: 'Learn during lunch' },
  { id: 'evening', label: 'Evening (6-8pm)', desc: 'Wind down with learning' }
]

const defaultSkillAssessment: SkillAssessment = {
  contextAssembly: 'developing',
  qualityJudgment: 'developing',
  taskDecomposition: 'developing',
  iterativeRefinement: 'developing',
  workflowIntegration: 'developing',
  frontierRecognition: 'developing'
}

export default function CapturePage() {
  const router = useRouter()
  const { user } = useAuth()
  const [step, setStep] = useState<Step>('role')
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState('')

  // Role mapping
  const [jobTitle, setJobTitle] = useState('')
  const [industry, setIndustry] = useState('')
  const [companySize, setCompanySize] = useState('')
  const [selectedResponsibilities, setSelectedResponsibilities] = useState<string[]>([])

  // Task inventory
  const [timeConsumingTasks, setTimeConsumingTasks] = useState<string[]>([])
  const [repetitiveTasks, setRepetitiveTasks] = useState<string[]>([])
  const [judgmentTasks, setJudgmentTasks] = useState<string[]>([])

  // Skills
  const [skillAssessment, setSkillAssessment] = useState<SkillAssessment>(defaultSkillAssessment)
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0)

  // Personalization
  const [learningPreference, setLearningPreference] = useState('')
  const [emailTime, setEmailTime] = useState('')
  const [focusArea, setFocusArea] = useState('')

  const readinessScore = calculateReadinessScore(skillAssessment)

  const toggleSelection = (item: string, selected: string[], setSelected: (items: string[]) => void) => {
    if (selected.includes(item)) {
      setSelected(selected.filter(i => i !== item))
    } else {
      setSelected([...selected, item])
    }
  }

  const handleRoleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep('tasks')
  }

  const handleTasksSubmit = () => {
    setCurrentSkillIndex(0)
    setStep('skills')
  }

  const handleSkillAnswer = (level: 'developing' | 'intermediate' | 'advanced' | 'unsure') => {
    const currentQuestion = skillQuestions[currentSkillIndex]
    const skillKey = questionToSkillKey[currentQuestion.id]

    setSkillAssessment(prev => ({
      ...prev,
      [skillKey]: level
    }))

    if (currentSkillIndex < skillQuestions.length - 1) {
      setCurrentSkillIndex(prev => prev + 1)
    } else {
      setStep('personalization')
    }
  }

  const handlePersonalizationSubmit = () => {
    setStep('results')
  }

  const handleStartTrial = async () => {
    if (!user) {
      // If not logged in, redirect to signup
      router.push('/auth/signup')
      return
    }

    setSaving(true)
    setSaveError('')

    const result = await saveOnboardingData(user.id, {
      jobTitle,
      industry,
      companySize,
      responsibilities: selectedResponsibilities,
      timeConsumingTasks,
      repetitiveTasks,
      judgmentTasks,
      skillAssessment,
      aiReadinessScore: readinessScore,
      learningPreference,
      emailTime,
      focusArea
    })

    setSaving(false)

    if (result.success) {
      // Send welcome email (fire and forget - don't block navigation)
      fetch('/api/email/welcome', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.email,
          name: jobTitle ? jobTitle.split(' ')[0] : 'there',
          readinessScore,
          focusArea
        })
      }).catch(err => console.error('Welcome email failed:', err))

      router.push('/dashboard')
    } else {
      setSaveError(result.error || 'Failed to save. Please try again.')
    }
  }

  // Calculate which skills need the most work
  const skillPriorities = (Object.keys(skillAssessment) as (keyof SkillAssessment)[])
    .map(key => ({ key, level: skillAssessment[key] }))
    .sort((a, b) => {
      const order = { developing: 0, unsure: 1, intermediate: 2, advanced: 3 }
      return order[a.level] - order[b.level]
    })
    .slice(0, 3)

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-gray-900">WorkStrata</Link>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className={step === 'role' ? 'text-primary-600 font-medium' : ''}>1. Role</span>
            <span>→</span>
            <span className={step === 'tasks' ? 'text-primary-600 font-medium' : ''}>2. Tasks</span>
            <span>→</span>
            <span className={step === 'skills' ? 'text-primary-600 font-medium' : ''}>3. Skills</span>
            <span>→</span>
            <span className={step === 'personalization' ? 'text-primary-600 font-medium' : ''}>4. Setup</span>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-8">

        {/* STEP 1: Role Mapping */}
        {step === 'role' && (
          <div>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-3">Tell us about your role</h1>
              <p className="text-gray-600">We&apos;ll use this to personalize your AI skills curriculum.</p>
            </div>

            <form onSubmit={handleRoleSubmit} className="space-y-6">
              <div className="bg-white rounded-xl border p-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">What&apos;s your job title? *</label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g., Marketing Manager"
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
                  autoFocus
                />
              </div>

              <div className="bg-white rounded-xl border p-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">What industry are you in?</label>
                <div className="flex flex-wrap gap-2">
                  {industries.map(ind => (
                    <button
                      key={ind}
                      type="button"
                      onClick={() => setIndustry(ind)}
                      className={`px-4 py-2 rounded-full text-sm transition ${
                        industry === ind
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {ind}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl border p-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Company size</label>
                <div className="flex flex-wrap gap-2">
                  {companySizes.map(size => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setCompanySize(size)}
                      className={`px-4 py-2 rounded-full text-sm transition ${
                        companySize === size
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {size} employees
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl border p-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">What are your main responsibilities? (select all that apply)</label>
                <div className="flex flex-wrap gap-2">
                  {responsibilities.map(resp => (
                    <button
                      key={resp}
                      type="button"
                      onClick={() => toggleSelection(resp, selectedResponsibilities, setSelectedResponsibilities)}
                      className={`px-4 py-2 rounded-full text-sm transition ${
                        selectedResponsibilities.includes(resp)
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {resp}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={!jobTitle}
                className="w-full bg-primary-600 text-white py-4 rounded-xl font-semibold hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue →
              </button>
            </form>
          </div>
        )}

        {/* STEP 2: Task Inventory */}
        {step === 'tasks' && (
          <div>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-3">What tasks fill your day?</h1>
              <p className="text-gray-600">This helps us identify where AI can make the biggest impact.</p>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-xl border p-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Which tasks take the most time? (select up to 5)
                </label>
                <div className="flex flex-wrap gap-2">
                  {taskTypes.map(task => (
                    <button
                      key={task}
                      type="button"
                      onClick={() => {
                        if (timeConsumingTasks.includes(task) || timeConsumingTasks.length < 5) {
                          toggleSelection(task, timeConsumingTasks, setTimeConsumingTasks)
                        }
                      }}
                      className={`px-3 py-2 rounded-lg text-sm transition ${
                        timeConsumingTasks.includes(task)
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {task}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl border p-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Which feel repetitive or tedious?
                </label>
                <div className="flex flex-wrap gap-2">
                  {taskTypes.map(task => (
                    <button
                      key={task}
                      type="button"
                      onClick={() => toggleSelection(task, repetitiveTasks, setRepetitiveTasks)}
                      className={`px-3 py-2 rounded-lg text-sm transition ${
                        repetitiveTasks.includes(task)
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {task}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl border p-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Which require your judgment and creativity?
                </label>
                <div className="flex flex-wrap gap-2">
                  {taskTypes.map(task => (
                    <button
                      key={task}
                      type="button"
                      onClick={() => toggleSelection(task, judgmentTasks, setJudgmentTasks)}
                      className={`px-3 py-2 rounded-lg text-sm transition ${
                        judgmentTasks.includes(task)
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {task}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep('role')}
                  className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-200 transition"
                >
                  ← Back
                </button>
                <button
                  onClick={handleTasksSubmit}
                  disabled={timeConsumingTasks.length === 0}
                  className="flex-1 bg-primary-600 text-white py-4 rounded-xl font-semibold hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Skills Assessment */}
        {step === 'skills' && (
          <div>
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-600">AI Skills Assessment</span>
                <span className="text-sm text-gray-500">{currentSkillIndex + 1} of {skillQuestions.length}</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary-600 transition-all duration-300"
                  style={{ width: `${((currentSkillIndex + 1) / skillQuestions.length) * 100}%` }}
                />
              </div>
            </div>

            {skillQuestions[currentSkillIndex] && (
              <div className="bg-white rounded-2xl border p-8">
                <div className="mb-6">
                  <span className="inline-block bg-primary-100 text-primary-700 text-sm font-medium px-3 py-1 rounded-full mb-3">
                    {skillQuestions[currentSkillIndex].skill}
                  </span>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {skillQuestions[currentSkillIndex].question}
                  </h2>
                  <p className="text-gray-500 text-sm">
                    {skillQuestions[currentSkillIndex].skillDescription}
                  </p>
                </div>

                <div className="space-y-3">
                  {skillQuestions[currentSkillIndex].options.map((option, idx) => (
                    <button
                      key={`${currentSkillIndex}-${idx}`}
                      onClick={(e) => {
                        (e.target as HTMLButtonElement).blur()
                        handleSkillAnswer(option.level)
                      }}
                      className="w-full text-left p-4 rounded-xl border-2 border-gray-200 hover:border-primary-500 hover:bg-primary-50 transition focus:outline-none active:bg-primary-100"
                    >
                      <span className="text-gray-900">{option.text}</span>
                    </button>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t flex justify-between items-center">
                  <button
                    onClick={() => setStep('tasks')}
                    className="text-gray-500 hover:text-gray-700 text-sm"
                  >
                    ← Back to tasks
                  </button>
                  {currentSkillIndex > 0 && (
                    <button
                      onClick={() => setCurrentSkillIndex(prev => prev - 1)}
                      className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                    >
                      ← Previous question
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 4: Personalization */}
        {step === 'personalization' && (
          <div>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-3">Almost done! Personalize your experience</h1>
              <p className="text-gray-600">Help us deliver content that fits your style.</p>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-xl border p-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">How do you prefer to learn?</label>
                <div className="space-y-2">
                  {learningPreferences.map(pref => (
                    <button
                      key={pref.id}
                      type="button"
                      onClick={() => setLearningPreference(pref.id)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition ${
                        learningPreference === pref.id
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="font-medium text-gray-900">{pref.label}</span>
                      <span className="text-gray-500 text-sm ml-2">— {pref.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl border p-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">When should we send your daily content?</label>
                <div className="space-y-2">
                  {emailTimes.map(time => (
                    <button
                      key={time.id}
                      type="button"
                      onClick={() => setEmailTime(time.id)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition ${
                        emailTime === time.id
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="font-medium text-gray-900">{time.label}</span>
                      <span className="text-gray-500 text-sm ml-2">— {time.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl border p-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">What&apos;s your first priority?</label>
                <div className="space-y-2">
                  {skillPriorities.map((skill, idx) => (
                    <button
                      key={skill.key}
                      type="button"
                      onClick={() => setFocusArea(skill.key)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition ${
                        focusArea === skill.key
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900">{skillLabels[skill.key]}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${levelLabels[skill.level].color}`}>
                          {levelLabels[skill.level].label}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {idx === 0 ? 'Biggest opportunity for growth' : idx === 1 ? 'Second priority' : 'Third priority'}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setCurrentSkillIndex(skillQuestions.length - 1)
                    setStep('skills')
                  }}
                  className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-200 transition"
                >
                  ← Back
                </button>
                <button
                  onClick={handlePersonalizationSubmit}
                  className="flex-1 bg-primary-600 text-white py-4 rounded-xl font-semibold hover:bg-primary-700 transition"
                >
                  See My Results →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: Results / Trial Start */}
        {step === 'results' && (
          <div>
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-3">Your AI Skills Profile</h1>
              <p className="text-gray-600">Here&apos;s where you stand — and where we&apos;ll help you grow.</p>
            </div>

            {/* Readiness Score */}
            <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-6 text-white mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-primary-200 text-sm font-medium mb-1">AI READINESS SCORE</p>
                  <p className="text-5xl font-bold">{readinessScore}%</p>
                </div>
                <div className="text-right">
                  <p className="text-primary-200 text-sm">Based on 6 core skills</p>
                  <p className="text-primary-100 text-sm mt-1">
                    {readinessScore < 40 ? 'Room to grow — let\'s fix that!' :
                     readinessScore < 70 ? 'Good foundation — time to level up' :
                     'Strong skills — optimize further'}
                  </p>
                </div>
              </div>
            </div>

            {/* Skills Breakdown */}
            <div className="bg-white rounded-xl border p-6 mb-6">
              <h2 className="font-bold text-gray-900 mb-4">Your Skill Profile</h2>
              <div className="space-y-4">
                {(Object.keys(skillAssessment) as (keyof SkillAssessment)[]).map(skillKey => {
                  const level = skillAssessment[skillKey]
                  const levelInfo = levelLabels[level]
                  const isFocus = focusArea === skillKey
                  return (
                    <div key={skillKey} className={`p-4 rounded-lg border-2 ${isFocus ? 'border-primary-500 bg-primary-50' : 'border-gray-100'}`}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">{skillLabels[skillKey]}</span>
                          {isFocus && <span className="text-xs bg-primary-600 text-white px-2 py-0.5 rounded-full">Your focus</span>}
                        </div>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${levelInfo.color}`}>
                          {levelInfo.label}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{getSkillTip(skillKey, level)}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Your Plan */}
            <div className="bg-white rounded-xl border p-6 mb-6">
              <h2 className="font-bold text-gray-900 mb-2">Your Personalized Plan</h2>
              <p className="text-gray-600 text-sm mb-4">Based on your profile as a <strong>{jobTitle}</strong> in <strong>{industry || 'your industry'}</strong></p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold">1</div>
                  <div>
                    <p className="font-medium text-gray-900">Focus: {focusArea ? skillLabels[focusArea as keyof SkillAssessment] : 'AI Skills'}</p>
                    <p className="text-sm text-gray-500">Your starting skill area</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold">2</div>
                  <div>
                    <p className="font-medium text-gray-900">{learningPreference === 'video' ? 'Video-first' : learningPreference === 'text' ? 'Article-first' : 'Mixed'} content</p>
                    <p className="text-sm text-gray-500">Matched to how you learn best</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold">3</div>
                  <div>
                    <p className="font-medium text-gray-900">{emailTime === 'morning' ? 'Morning' : emailTime === 'lunch' ? 'Midday' : 'Evening'} delivery</p>
                    <p className="text-sm text-gray-500">Daily content when you want it</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trial CTA */}
            <div className="bg-primary-50 rounded-xl border-2 border-primary-200 p-6 text-center">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Your 7-Day Free Trial Starts Now</h2>
              <p className="text-gray-600 mb-6">
                Full access to daily content, experiments, and progress tracking.
                No credit card required.
              </p>
              {saveError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {saveError}
                </div>
              )}
              <button
                onClick={handleStartTrial}
                disabled={saving}
                className="w-full bg-primary-600 text-white py-4 rounded-xl font-semibold hover:bg-primary-700 transition text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Saving...' : 'Start My Trial →'}
              </button>
              <p className="text-sm text-gray-500 mt-4">
                Cancel anytime. Upgrade to Pro ($29/mo) when you&apos;re ready.
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
