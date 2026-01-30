'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { getProfile, calculateTrialStatus, updateStreak, type Profile } from '@/lib/profiles'
import { skillLabels, levelLabels, type SkillAssessment } from '@/data/skills-assessment'

// Mock content for today (will be dynamic later)
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
  const { user, loading: authLoading, signOut } = useAuth()
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login')
      return
    }

    if (user) {
      loadProfile()
    }
  }, [user, authLoading, router])

  const loadProfile = async () => {
    if (!user) return

    setLoading(true)
    const profileData = await getProfile(user.id)
    setProfile(profileData)
    setLoading(false)

    // Update streak on page load
    if (profileData?.onboarding_completed_at) {
      await updateStreak(user.id)
    }
  }

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  if (authLoading || loading) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </main>
    )
  }

  if (!user) {
    return null
  }

  // If user hasn't completed onboarding, redirect to capture
  if (profile && !profile.onboarding_completed_at) {
    router.push('/capture')
    return null
  }

  // Calculate trial status
  const trialStatus = profile ? calculateTrialStatus(profile) : { isInTrial: true, trialExpired: false, daysLeft: 7, dayNumber: 1 }
  const trialProgress = ((7 - trialStatus.daysLeft) / 7) * 100

  // Calculate readiness score from profile
  const skillAssessment = (profile?.skill_assessment as SkillAssessment) || {
    contextAssembly: 'developing',
    qualityJudgment: 'developing',
    taskDecomposition: 'developing',
    iterativeRefinement: 'developing',
    workflowIntegration: 'developing',
    frontierRecognition: 'developing'
  }

  const readinessScore = profile?.ai_readiness_score || 25

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
      {trialStatus.isInTrial && (
        <div className="bg-primary-600 text-white">
          <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="font-medium">Day {trialStatus.dayNumber} of 7</span>
              <div className="w-32 h-2 bg-primary-400 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white transition-all"
                  style={{ width: `${trialProgress}%` }}
                />
              </div>
              <span className="text-primary-200 text-sm">{trialStatus.daysLeft} days left in trial</span>
            </div>
            <button className="text-sm bg-white/20 hover:bg-white/30 px-4 py-1.5 rounded-lg transition">
              Upgrade to Pro
            </button>
          </div>
        </div>
      )}

      {/* Trial Expired Banner */}
      {trialStatus.trialExpired && (
        <div className="bg-amber-500 text-white">
          <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
            <span className="font-medium">Your trial has ended. Upgrade to continue learning.</span>
            <button className="text-sm bg-white text-amber-600 px-4 py-1.5 rounded-lg font-medium hover:bg-gray-100 transition">
              Upgrade Now
            </button>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Welcome + Stats */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back{profile?.full_name ? `, ${profile.full_name.split(' ')[0]}` : ''}!
          </h1>
          <p className="text-gray-600">Keep your streak going — you&apos;re building real AI skills.</p>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border p-5">
            <p className="text-sm text-gray-500 mb-1">Current Streak</p>
            <p className="text-3xl font-bold text-primary-600">{profile?.current_streak || 0} days</p>
          </div>
          <div className="bg-white rounded-xl border p-5">
            <p className="text-sm text-gray-500 mb-1">AI Readiness</p>
            <p className="text-3xl font-bold text-gray-900">{readinessScore}%</p>
          </div>
          <div className="bg-white rounded-xl border p-5">
            <p className="text-sm text-gray-500 mb-1">Experiments Done</p>
            <p className="text-3xl font-bold text-gray-900">{profile?.completed_experiments?.length || 0}</p>
          </div>
          <div className="bg-white rounded-xl border p-5">
            <p className="text-sm text-gray-500 mb-1">Focus Area</p>
            <p className="text-lg font-bold text-gray-900">
              {profile?.focus_area ? skillLabels[profile.focus_area as keyof SkillAssessment] : 'Not set'}
            </p>
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
                <button
                  onClick={() => alert('Learning content coming soon! This will link to curated articles and videos.')}
                  className="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition"
                >
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
                  <button
                    onClick={() => alert('Experiment template coming soon! This will open a guided workflow for this experiment.')}
                    className="bg-amber-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-amber-600 transition"
                  >
                    Start Experiment
                  </button>
                  <button
                    onClick={() => alert('Marked complete! (In production, this will save to your profile)')}
                    className="text-gray-600 px-4 py-3 rounded-lg font-medium hover:bg-gray-100 transition"
                  >
                    Mark Complete
                  </button>
                </div>
              </div>
            </div>

            {/* Profile Summary */}
            {profile && (
              <div className="bg-white rounded-xl border p-6">
                <h2 className="font-bold text-gray-900 mb-4">Your Profile</h2>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Role:</span>
                    <span className="ml-2 text-gray-900">{profile.job_title || 'Not set'}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Industry:</span>
                    <span className="ml-2 text-gray-900">{profile.industry || 'Not set'}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Company Size:</span>
                    <span className="ml-2 text-gray-900">{profile.company_size ? `${profile.company_size} employees` : 'Not set'}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Learning Style:</span>
                    <span className="ml-2 text-gray-900">
                      {profile.learning_preference === 'video' ? 'Video-first' :
                       profile.learning_preference === 'text' ? 'Article-first' :
                       profile.learning_preference === 'mixed' ? 'Mixed' : 'Not set'}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Skill Profile Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border p-6">
              <h2 className="font-bold text-gray-900 mb-4">Your Skill Profile</h2>
              <div className="space-y-3">
                {(Object.keys(skillAssessment) as (keyof SkillAssessment)[]).map(skillKey => {
                  const level = skillAssessment[skillKey]
                  const levelInfo = levelLabels[level]
                  const isFocus = profile?.focus_area === skillKey

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
                    <span className="font-medium">{profile?.completed_experiments?.length || 0}/42</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500"
                      style={{ width: `${((profile?.completed_experiments?.length || 0) / 42) * 100}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Trial Progress</span>
                    <span className="font-medium">Day {trialStatus.dayNumber}/7</span>
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
