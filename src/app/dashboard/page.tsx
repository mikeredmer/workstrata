'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'

interface SavedAssessment {
  id: string
  email: string
  role: string
  salary: number | null
  workflows: string | null
  potential_savings: number | null
  created_at: string
}

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth()
  const router = useRouter()
  const [assessments, setAssessments] = useState<SavedAssessment[]>([])
  const [loadingData, setLoadingData] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login')
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user) {
      loadAssessments()
    }
  }, [user])

  const loadAssessments = async () => {
    try {
      const { data, error } = await supabase
        .from('signups')
        .select('*')
        .eq('email', user?.email?.toLowerCase())
        .order('created_at', { ascending: false })

      if (error) throw error
      setAssessments(data || [])
    } catch (err) {
      console.error('Error loading assessments:', err)
    } finally {
      setLoadingData(false)
    }
  }

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
    return null // Will redirect
  }

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

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Your Assessments</h1>
            <p className="text-gray-600 mt-1">Track your automation opportunities over time</p>
          </div>
          <Link 
            href="/capture"
            className="bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition"
          >
            New Assessment
          </Link>
        </div>

        {loadingData ? (
          <div className="bg-white rounded-2xl border p-8 text-center">
            <p className="text-gray-500">Loading your assessments...</p>
          </div>
        ) : assessments.length === 0 ? (
          <div className="bg-white rounded-2xl border p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">No assessments yet</h2>
            <p className="text-gray-600 mb-6">Take your first assessment to discover your automation opportunities.</p>
            <Link 
              href="/capture"
              className="inline-block bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition"
            >
              Start Free Assessment
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {assessments.map((assessment) => {
              const workflows = assessment.workflows?.split(', ') || []
              const savings = assessment.potential_savings || 0
              
              return (
                <div key={assessment.id} className="bg-white rounded-2xl border p-6 hover:border-gray-300 transition">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900 text-lg">{assessment.role || 'Assessment'}</h3>
                        <span className="text-green-600 font-bold">${savings.toLocaleString()}/yr potential</span>
                      </div>
                      <p className="text-sm text-gray-500 mb-3">
                        {new Date(assessment.created_at).toLocaleDateString('en-US', { 
                          month: 'long', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </p>
                      {workflows.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {workflows.slice(0, 5).map((workflow, idx) => (
                            <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                              {workflow}
                            </span>
                          ))}
                          {workflows.length > 5 && (
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                              +{workflows.length - 5} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    <Link
                      href="/capture"
                      className="text-primary-600 text-sm font-medium hover:underline"
                    >
                      Retake →
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Upgrade CTA */}
        <div className="mt-8 bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Unlock Premium Features</h2>
              <p className="text-primary-100">Get step-by-step implementation guides, unlimited assessments, and priority support.</p>
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
