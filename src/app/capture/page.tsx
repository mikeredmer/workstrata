'use client'

import { useState } from 'react'
import Link from 'next/link'
import { roleProfiles, findRoleByTitle, type RoleProfile, type Workflow } from '@/data/role-workflows'

type Step = 'profile' | 'workflows' | 'results'

interface SelectedWorkflow extends Workflow {
  selected: boolean
  customHours?: number
}

export default function CapturePage() {
  const [step, setStep] = useState<Step>('profile')
  const [jobTitle, setJobTitle] = useState('')
  const [salary, setSalary] = useState('')
  const [matchedRole, setMatchedRole] = useState<RoleProfile | null>(null)
  const [workflows, setWorkflows] = useState<SelectedWorkflow[]>([])
  const [showSignupModal, setShowSignupModal] = useState(false)
  const [email, setEmail] = useState('')
  const [signupSent, setSignupSent] = useState(false)
  const [signupLoading, setSignupLoading] = useState(false)
  const [signupError, setSignupError] = useState('')

  const hourlyRate = salary ? Math.round(parseInt(salary) / 2080) : 50
  const selectedWorkflows = workflows.filter(w => w.selected)
  const automatableWorkflows = selectedWorkflows.filter(w => w.strataLevel <= 2)
  const totalHoursPerWeek = selectedWorkflows.reduce((sum, w) => sum + (w.customHours ?? w.avgHoursPerWeek), 0)
  const automatableHours = automatableWorkflows.reduce((sum, w) => sum + (w.customHours ?? w.avgHoursPerWeek), 0)
  const automatableDollars = automatableHours * hourlyRate * 50

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const role = findRoleByTitle(jobTitle)
    if (role) {
      setMatchedRole(role)
      setWorkflows(role.workflows.map(w => ({ ...w, selected: false })))
    }
    setStep('workflows')
  }

  const handleWorkflowToggle = (id: string) => {
    setWorkflows(prev => prev.map(w => w.id === id ? { ...w, selected: !w.selected } : w))
  }

  const handleSeeResults = () => setStep('results')
  
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setSignupLoading(true)
    setSignupError('')
    
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          role: matchedRole?.title || jobTitle,
          salary: salary ? parseInt(salary) : undefined,
          workflows: selectedWorkflows.map(w => w.name),
          potentialSavings: automatableDollars
        })
      })
      
      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Signup failed')
      }
      
      setSignupSent(true)
    } catch (err) {
      setSignupError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setSignupLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-gray-900">WorkStrata</Link>
          {step === 'results' && <button onClick={() => setShowSignupModal(true)} className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium">Save Results</button>}
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        
        {/* STEP 1: Profile */}
        {step === 'profile' && (
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Find your automation opportunities</h1>
              <p className="text-lg text-gray-600">Enter your role to see where you&apos;re likely losing time to repetitive work.</p>
            </div>
            <form onSubmit={handleProfileSubmit} className="bg-white rounded-2xl shadow-sm border p-8">
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Your job title *</label>
                <input type="text" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} placeholder="e.g., Marketing Manager" required className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:outline-none text-lg" autoFocus />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Annual salary <span className="font-normal text-gray-400">(for personalized $ calculations)</span></label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">$</span>
                  <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)} placeholder="75,000" className="w-full pl-10 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:outline-none text-lg" />
                </div>
              </div>
              <button type="submit" className="w-full bg-primary-600 text-white text-lg py-4 rounded-xl font-semibold hover:bg-primary-700 transition">Analyze My Role →</button>
            </form>
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500 mb-3">Or select a role:</p>
              <div className="flex flex-wrap justify-center gap-2">{roleProfiles.map(role => (<button key={role.id} onClick={() => setJobTitle(role.title)} className="text-sm bg-white border border-gray-200 hover:border-primary-500 hover:text-primary-600 px-4 py-2 rounded-full transition">{role.title}</button>))}</div>
            </div>
          </div>
        )}

        {/* STEP 2: Workflows */}
        {step === 'workflows' && (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <span className="inline-block bg-primary-100 text-primary-700 text-sm font-medium px-4 py-1 rounded-full mb-3">{matchedRole?.title || jobTitle}</span>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Which of these do you do?</h1>
              <p className="text-gray-600">Select the workflows that are part of your regular work.</p>
            </div>
            {matchedRole ? (
              <div className="space-y-3">{workflows.map(workflow => (
                <div key={workflow.id} onClick={() => handleWorkflowToggle(workflow.id)} className={`bg-white rounded-xl p-5 border-2 cursor-pointer transition ${workflow.selected ? 'border-primary-500 shadow-md' : 'border-gray-200 hover:border-gray-300'}`}>
                  <div className="flex items-start gap-4">
                    <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition ${workflow.selected ? 'bg-primary-600 border-primary-600' : 'border-gray-300'}`}>
                      {workflow.selected && <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-gray-900">{workflow.name}</h3>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${workflow.strataLevel === 1 ? 'bg-red-100 text-red-700' : workflow.strataLevel === 2 ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'}`}>
                          {workflow.strataLevel === 1 ? '🤖 Automate' : workflow.strataLevel === 2 ? '🤝 AI+You' : '🧠 You'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{workflow.description}</p>
                      <p className="text-xs text-gray-400 mt-2">{workflow.avgHoursPerWeek} hrs/week avg</p>
                    </div>
                  </div>
                </div>
              ))}</div>
            ) : (
              <div className="bg-white rounded-xl p-8 text-center border">
                <p className="text-gray-600 mb-4">We don&apos;t have pre-built workflows for &quot;{jobTitle}&quot; yet.</p>
                <p className="text-sm text-gray-500 mb-4">Choose a similar role:</p>
                <div className="flex flex-wrap justify-center gap-2">{roleProfiles.map(role => (<button key={role.id} onClick={() => { setMatchedRole(role); setWorkflows(role.workflows.map(w => ({ ...w, selected: false }))); }} className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg">{role.title}</button>))}</div>
              </div>
            )}
            {selectedWorkflows.length > 0 && (
              <>
                <div className="h-28" />
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
                  <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">{selectedWorkflows.length} workflow{selectedWorkflows.length > 1 ? 's' : ''} selected</p>
                      <p className="text-sm text-gray-600">{totalHoursPerWeek} hrs/week • <span className="text-green-600 font-semibold">${(totalHoursPerWeek * hourlyRate * 50).toLocaleString()}/year</span> potential</p>
                    </div>
                    <button onClick={handleSeeResults} className="bg-primary-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-primary-700 transition">See My Results →</button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* STEP 3: Results */}
        {step === 'results' && (
          <div>
            {/* Hero Metrics */}
            <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-3xl p-8 text-white mb-8">
              <div className="flex items-center gap-2 mb-6">
                <span className="bg-white/20 text-sm font-medium px-3 py-1 rounded-full">{matchedRole?.title || jobTitle}</span>
                <span className="bg-white/20 text-sm px-3 py-1 rounded-full">${hourlyRate}/hr</span>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-primary-200 text-sm font-medium mb-1">TIME YOU CAN RECLAIM</p>
                  <p className="text-5xl font-bold mb-1">{automatableHours}<span className="text-2xl font-normal opacity-80"> hrs/week</span></p>
                  <p className="text-primary-200">{totalHoursPerWeek > 0 ? Math.round(automatableHours / totalHoursPerWeek * 100) : 0}% of your selected work</p>
                </div>
                <div>
                  <p className="text-primary-200 text-sm font-medium mb-1">ANNUAL VALUE</p>
                  <p className="text-5xl font-bold mb-1">${Math.round(automatableDollars / 1000)}K</p>
                  <p className="text-primary-200">{automatableHours * 50} hours back per year</p>
                </div>
              </div>
            </div>

            {/* Automation Roadmap */}
            <div className="bg-white rounded-2xl border p-6 mb-6">
              <h2 className="font-bold text-gray-900 mb-4">Your Automation Roadmap</h2>
              <p className="text-gray-600 text-sm mb-6">Ranked by potential impact. Start with #1 for quickest wins.</p>
              
              <div className="space-y-4">
                {automatableWorkflows
                  .sort((a, b) => ((b.customHours ?? b.avgHoursPerWeek) * hourlyRate) - ((a.customHours ?? a.avgHoursPerWeek) * hourlyRate))
                  .map((workflow, idx) => {
                    const hours = workflow.customHours ?? workflow.avgHoursPerWeek
                    const value = hours * hourlyRate * 50
                    return (
                      <div key={workflow.id} className="border-2 border-gray-100 rounded-xl p-5 hover:border-gray-200 transition">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-primary-100 text-primary-700 rounded-xl flex items-center justify-center font-bold text-lg flex-shrink-0">
                            {idx + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4 mb-2">
                              <h3 className="font-semibold text-gray-900">{workflow.name}</h3>
                              <span className="text-green-600 font-bold whitespace-nowrap">${value.toLocaleString()}/yr</span>
                            </div>
                            <p className="text-sm text-gray-500 mb-3">{hours} hrs/week • {workflow.strataLevel === 1 ? 'Fully automatable' : 'AI can assist'}</p>
                            
                            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                              <p className="text-sm font-semibold text-amber-800 mb-1">⚡ Quick Win</p>
                              <p className="text-sm text-amber-900">{workflow.quickWin}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
              </div>
            </div>

            {/* Final CTA */}
            <div className="bg-white rounded-2xl border p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Ready to reclaim {automatableHours} hours every week?</h2>
              <p className="text-gray-600 mb-6">Save your roadmap and get step-by-step implementation guides.</p>
              <button onClick={() => setShowSignupModal(true)} className="bg-primary-600 text-white text-lg px-8 py-4 rounded-xl font-semibold hover:bg-primary-700 transition">Save My ${automatableDollars.toLocaleString()}/Year Roadmap →</button>
              <p className="text-sm text-gray-500 mt-4">Free forever • No credit card required</p>
            </div>
          </div>
        )}
      </div>

      {/* Signup Modal */}
      {showSignupModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 relative">
            <button onClick={() => setShowSignupModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl">×</button>
            {signupSent ? (
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Roadmap saved!</h3>
                <p className="text-gray-600 mb-4">We&apos;ve saved your ${automatableDollars.toLocaleString()}/year automation roadmap to <strong>{email}</strong></p>
                
                {/* Pro upgrade placeholder */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm font-semibold text-gray-700 mb-3">Want step-by-step implementation guides?</p>
                  <button 
                    onClick={() => alert('Stripe checkout will open here')}
                    className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-3 rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 transition"
                  >
                    Upgrade to Pro - $29/mo
                  </button>
                  <p className="text-xs text-gray-500 mt-2">Unlimited assessments + premium guides + priority support</p>
                </div>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold mb-2">Save your ${automatableDollars.toLocaleString()}/year roadmap</h3>
                <p className="text-gray-600 mb-6">Create a free account to save your results and get implementation guides.</p>
                <form onSubmit={handleSignup}>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 mb-4 text-lg" disabled={signupLoading} />
                  {signupError && <p className="text-red-600 text-sm mb-4">{signupError}</p>}
                  <button type="submit" disabled={signupLoading} className="w-full bg-primary-600 text-white py-4 rounded-xl hover:bg-primary-700 transition font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed">
                    {signupLoading ? 'Saving...' : 'Save My Roadmap →'}
                  </button>
                </form>
                <p className="text-center text-sm text-gray-500 mt-4">Free forever • No credit card required</p>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  )
}
