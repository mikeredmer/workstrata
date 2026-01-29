'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'landing-hero' })
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to join')
      }

      setStatus('success')
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center">
        <div className="bg-green-50 text-green-800 px-6 py-4 rounded-xl mb-4">
          <p className="font-semibold">You&apos;re on the list!</p>
          <p className="text-sm mt-1">We&apos;ll notify you when we launch.</p>
        </div>
        <Link 
          href="/auth/signup"
          className="inline-block text-primary-600 hover:text-primary-700 font-medium"
        >
          Want to try the free assessment now? →
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="flex gap-2">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="bg-primary-600 text-white px-6 py-3 rounded-xl hover:bg-primary-700 transition shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {status === 'loading' ? 'Joining...' : 'Get Early Access'}
        </button>
      </div>
      {status === 'error' && (
        <p className="text-red-600 text-sm mt-2">{errorMsg}</p>
      )}
      <p className="mt-3 text-sm text-gray-500">
        Free assessment included. No spam, ever.
      </p>
    </form>
  )
}
