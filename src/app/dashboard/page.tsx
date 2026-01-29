'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { skillLabels, levelLabels, type SkillAssessment } from '@/data/skills-assessment'

// Mock data for now - will be replaced with real data from Supabase
const mockUserData = {
  name: 'User',
  trialStarted: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
  trialEnds: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
  currentStreak: 2,
  role: 'Product Manager',
  industry: 'Technology',
  focusArea: 'contextAssembly',
  learningPreference: 'mixed',
  skillAssessment: {
    contextAssembly: 'developing',
    qualityJudgment: 'intermediate',
    taskDecomposition: 'developing',
    iterativeRefinement: 'intermediate',
    workflowIntegration: 'developing',
    frontierRecognition: 'unsure'
  } as SkillAssessment,
  completedExperiments: 3,
  totalExperiments: 42
}

// Mock content for today
const todayContent = {
  skill: 'Context Assembly',
  title: 'The 3-Part Context Formula',
  type: 'article',
  duration: '8 min read',
  preview: 'Learn the exact framework for giving AI the context it needs to produce great output on the first try.',
  experiment: {
    title: 'Rewrite a recent email request',
    description: 'Take an email you sent to AI in the last week. Apply the 3-part context formula and compare the results.',
    timeEstimate: '10 min'
  }
}

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth()
  const router = useRouter()
  const [userData] = useState(mockUserData)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login')
    }
  }, [user, loading, router])

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </main>
    )
  }

  if (!user) {
    return null
  }

  // Calculate trial days
  const now = new Date()
  const trialDaysLeft = Math.max(0, Math.ceil((userData.trialEnds.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)))
  const trialDayNumber = 7 - trialDaysLeft + 1
  const trialProgress = ((7 - trialDaysLeft) / 7) * 100

  // Calculate readiness score
  const levelScores: Record<string, number> = { developing: 25, unsure: 25, intermediate: 60, advanced: 100 }
  const readinessScore = Math.round(
    Object.values(userData.skillAssessment).reduce((sum, level) => sum + (levelScores[level] || 25), 0) / 6
  )

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-gray-900">WorkStrata</Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{user.email}</span>
            <button 
              onClick={handleSignOut}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Trial Banner */}
      <div className="bg-primary-600 text-white">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-medium">Day {trialDayNumber} of 7</span>
            <div className="w-32 h-2 bg-primary-400 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white transition-all"
                style={{ width: `${trialProgress}%` }}
              />
            </div>
            <span className="text-primary-200 text-sm">{trialDaysLeft} days left in trial</span>
          </div>
          <button className="text-sm bg-white/20 hover:bg-white/30 px-4 py-1.5 rounded-lg transition">
            Upgrade to Pro
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Welcome + Stats */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back!</h1>
          <p className="text-gray-600">Keep your streak going — you&apos;re building real AI skills.</p>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border p-5">
            <p className="text-sm text-gray-500 mb-1">Current Streak</p>
            <p className="text-3xl font-bold text-primary-600">{userData.currentStreak} days</p>
          </div>
          <div className="bg-white rounded-xl border p-5">
            <p className="text-sm text-gray-500 mb-1">AI Readiness</p>
            <p className="text-3xl font-bold text-gray-900">{readinessScore}%</p>
          </div>
          <div className="bg-white rounded-xl border p-5">
            <p className="text-sm text-gray-500 mb-1">Experiments Done</p>
            <p className="text-3xl font-bold text-gray-900">{userData.completedExperiments}</p>
          </div>
          <div className="bg-white rounded-xl border p-5">
            <p className="text-sm text-gray-500 mb-1">Focus Area</p>
            <p className="text-lg font-bold text-gray-900">{skillLabels[userData.focusArea as keyof SkillAssessment]}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Today's Content */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border overflow-hidden">
              <div className="bg-primary-50 px-6 py-4 border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-medium text-primary-600 uppercase tracking-wide">Today&apos;s Learning</span>
                    <h2 className="text-xl font-bold text-gray-900 mt-1">{todayContent.skill}</h2>
                  </div>
                  <span className="text-sm text-gray-500">{todayContent.duration}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{todayContent.title}</h3>
                <p className="text-gray-600 mb-4">{todayContent.preview}</p>
                <button className="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition">
                  Start Learning →
                </button>
              </div>
            </div>

            {/* Today's Experiment */}
            <div className="bg-white rounded-xl border overflow-hidden">
              <div className="bg-amber-50 px-6 py-4 border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-medium text-amber-600 uppercase tracking-wide">Today&apos;s Experiment</span>
                    <h2 className="text-xl font-bold text-gray-900 mt-1">{todayContent.experiment.title}</h2>
                  </div>
                  <span className="text-sm text-gray-500">{todayContent.experiment.timeEstimate}</span>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">{todayContent.experiment.description}</p>
                <div className="flex gap-3">
                  <button className="bg-amber-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-amber-600 transition">
                    Start Experiment
                  </button>
                  <button className="text-gray-600 px-4 py-3 rounded-lg font-medium hover:bg-gray-100 transition">
                    Mark Complete
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Skill Profile Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border p-6">
              <h2 className="font-bold text-gray-900 mb-4">Your Skill Profile</h2>
              <div className="space-y-3">
                {(Object.keys(userData.skillAssessment) as (keyof SkillAssessment)[]).map(skillKey => {
                  const level = userData.skillAssessment[skillKey]
                  const levelInfo = levelLabels[level]
                  const isFocus = userData.focusArea === skillKey
                  
                  return (
                    <div key={skillKey} className={`flex items-center justify-between p-2 rounded-lg ${isFocus ? 'bg-primary-50' : ''}`}>
                      <div className="flex items-center gap-2">
                        <span className={`text-sm ${isFocus ? 'font-medium text-primary-700' : 'text-gray-700'}`}>
                          {skillLabels[skillKey]}
                        </span>
                        {isFocus && <span className="text-xs text-primary-600">★</span>}
                      </div>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${levelInfo.color}`}>
                        {levelInfo.label}
                      </span>
                    </div>
                  )
                })}
              </div>
              <Link 
                href="/capture"
                className="block text-center text-sm text-primary-600 font-medium mt-4 hover:underline"
              >
                Retake Assessment
              </Link>
            </div>

            {/* Progress */}
            <div className="bg-white rounded-xl border p-6">
              <h2 className="font-bold text-gray-900 mb-4">Your Progress</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Experiments</span>
                    <span className="font-medium">{userData.completedExperiments}/{userData.totalExperiments}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-500"
                      style={{ width: `${(userData.completedExperiments / userData.totalExperiments) * 100}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Trial Progress</span>
                    <span className="font-medium">Day {trialDayNumber}/7</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary-500"
                      style={{ width: `${trialProgress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl border p-6">
              <h2 className="font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition flex items-center gap-3">
                  <span className="text-xl">📚</span>
                  <span className="text-sm text-gray-700">Browse Experiments</span>
                </button>
                <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition flex items-center gap-3">
                  <span className="text-xl">📊</span>
                  <span className="text-sm text-gray-700">View Full Report</span>
                </button>
                <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition flex items-center gap-3">
                  <span className="text-xl">⚙️</span>
                  <span className="text-sm text-gray-700">Email Preferences</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Upgrade CTA */}
        <div className="mt-8 bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Love what you&apos;re learning?</h2>
              <p className="text-primary-100">Upgrade to Pro for unlimited access, all experiments, and monthly re-assessments.</p>
            </div>
            <button 
              onClick={() => alert('Stripe checkout coming soon!')}
              className="bg-white text-primary-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition flex-shrink-0"
            >
              Upgrade to Pro - $29/mo
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
