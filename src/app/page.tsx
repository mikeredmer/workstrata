'use client'

import Link from 'next/link'
import { useState } from 'react'

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <div className="border-b border-gray-200">
      <button
        className="w-full py-6 text-left flex justify-between items-center hover:text-primary-600 transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium text-lg">{question}</span>
        <span className="text-2xl text-gray-400">{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen && (
        <div className="pb-6 text-gray-600 leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  )
}

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="text-xl font-bold text-gray-900">WorkStrata</span>
          <Link 
            href="/capture" 
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition"
          >
            Start Free Assessment
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            From AI-curious to AI-capable,<br />for YOUR actual job.
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Free assessment reveals your AI skill gaps. Daily content + experiments close them. 15 minutes a day.
          </p>
          <Link 
            href="/capture"
            className="inline-block bg-primary-600 text-white text-lg px-8 py-4 rounded-xl hover:bg-primary-700 transition shadow-lg hover:shadow-xl"
          >
            Start Free Assessment →
          </Link>
          <p className="mt-4 text-sm text-gray-500">7-day free trial. No credit card required.</p>
        </div>
      </section>

      {/* Value Prop Bar */}
      <section className="py-6 px-6 border-y border-gray-100 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-600 font-medium">
            Be among the first to level up your AI skills
          </p>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            You know AI matters.
          </h2>
          <p className="text-2xl md:text-3xl text-gray-500 mb-12">
            You just don&apos;t know where to start.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="bg-gray-50 p-6 rounded-xl text-left">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">The Course Trap</h3>
              <p className="text-gray-600">You&apos;ve tried courses. Generic content, fluff-filled videos, certificates that mean nothing. You learned ABOUT AI but never learned to USE it.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl text-left">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">The Tool Overwhelm</h3>
              <p className="text-gray-600">ChatGPT, Claude, Gemini, Copilot... Thousands of tools, zero direction. Which ones matter for YOUR work?</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl text-left">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">The Secret User</h3>
              <p className="text-gray-600">You&apos;re using AI &quot;secretly&quot; at work. No one taught you. No one validates your approach. Are you doing it right?</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Go from &quot;I should use AI more&quot;
          </h2>
          <p className="text-2xl md:text-3xl text-gray-500 text-center mb-16">
            to &quot;I&apos;m the AI person on my team&quot;
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <span className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">1</span>
                <h3 className="text-xl font-semibold">Assess</h3>
              </div>
              <p className="text-gray-600 font-medium mb-2">5-minute skill assessment</p>
              <p className="text-gray-500">Discover where you stand across 6 core AI capabilities. No judgment—just a clear picture of your starting point.</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <span className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">2</span>
                <h3 className="text-xl font-semibold">Learn</h3>
              </div>
              <p className="text-gray-600 font-medium mb-2">Daily curated content</p>
              <p className="text-gray-500">15 minutes of the best AI content on the internet, filtered for YOUR role. Videos, articles, tutorials—only what&apos;s actually useful.</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <span className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">3</span>
                <h3 className="text-xl font-semibold">Apply</h3>
              </div>
              <p className="text-gray-600 font-medium mb-2">Real experiments for your job</p>
              <p className="text-gray-500">Each day includes a micro-experiment to try at work. Not theory—actual tasks you can complete today.</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <span className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">4</span>
                <h3 className="text-xl font-semibold">Grow</h3>
              </div>
              <p className="text-gray-600 font-medium mb-2">Track your progress</p>
              <p className="text-gray-500">Watch your skills improve over time. Re-assess monthly. Build a portfolio of experiments that prove your capability.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Differentiation Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why this works when courses don&apos;t
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="py-4 px-6 text-left text-gray-500 font-medium">The Old Way</th>
                  <th className="py-4 px-6 text-left text-primary-600 font-medium">The WorkStrata Way</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="py-4 px-6 text-gray-500">Generic courses for everyone</td>
                  <td className="py-4 px-6 text-gray-900 font-medium">Content matched to YOUR role</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-500">Learn once, forget fast</td>
                  <td className="py-4 px-6 text-gray-900 font-medium">Daily habit, lasting change</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-500">Theory you never apply</td>
                  <td className="py-4 px-6 text-gray-900 font-medium">Experiments for your actual job</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-500">Certificates no one cares about</td>
                  <td className="py-4 px-6 text-gray-900 font-medium">Skills you can demonstrate</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-500">Expensive or useless</td>
                  <td className="py-4 px-6 text-gray-900 font-medium">$29/mo that pays for itself</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            The AI skills gap is real
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <p className="text-4xl font-bold text-primary-600 mb-2">73%</p>
              <p className="text-gray-600">of professionals feel behind on AI skills</p>
              <p className="text-sm text-gray-400 mt-2">— Workplace AI Survey</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <p className="text-4xl font-bold text-primary-600 mb-2">2x</p>
              <p className="text-gray-600">more likely to be promoted with AI skills</p>
              <p className="text-sm text-gray-400 mt-2">— LinkedIn Learning Report</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <p className="text-4xl font-bold text-primary-600 mb-2">15min</p>
              <p className="text-gray-600">a day is all it takes to level up</p>
              <p className="text-sm text-gray-400 mt-2">— Our learning framework</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Start free. Upgrade when you&apos;re ready.
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Try everything for 7 days. No credit card required.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Free Trial */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-2">Free Trial</h3>
              <p className="text-gray-500 mb-4">7 days</p>
              <p className="text-4xl font-bold mb-6">$0</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-gray-600">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Full skill assessment
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Daily content for 7 days
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  All experiments unlocked
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  No credit card required
                </li>
              </ul>
              <Link 
                href="/capture"
                className="block w-full text-center bg-gray-100 text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-200 transition font-medium"
              >
                Start Free Trial
              </Link>
            </div>

            {/* Starter */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-2">Starter</h3>
              <p className="text-gray-500 mb-4">For getting started</p>
              <p className="text-4xl font-bold mb-6">$9<span className="text-lg text-gray-500 font-normal">/mo</span></p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-gray-600">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Weekly curated content
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Basic experiments
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Progress tracking
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Email support
                </li>
              </ul>
              <button
                className="block w-full text-center bg-gray-100 text-gray-400 px-6 py-3 rounded-lg font-medium cursor-not-allowed"
                disabled
              >
                Coming Soon
              </button>
            </div>

            {/* Pro */}
            <div className="bg-white border-2 border-primary-600 rounded-2xl p-8 relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-600 text-white text-sm px-3 py-1 rounded-full">
                Most Popular
              </span>
              <h3 className="text-xl font-bold mb-2">Pro</h3>
              <p className="text-gray-500 mb-4">For serious learners</p>
              <p className="text-4xl font-bold mb-6">$29<span className="text-lg text-gray-500 font-normal">/mo</span></p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-gray-600">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Daily curated content
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Full experiment library
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Advanced progress tracking
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Monthly re-assessment
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Priority support
                </li>
              </ul>
              <button
                className="block w-full text-center bg-gray-100 text-gray-400 px-6 py-3 rounded-lg font-medium cursor-not-allowed"
                disabled
              >
                Coming Soon
              </button>
            </div>
          </div>
          
          <p className="text-center text-gray-500 mt-8">
            Save 28% with annual billing — $249/year ($20.75/mo)
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="bg-white rounded-2xl shadow-sm px-8">
            <FAQItem 
              question="Can't I just learn this from ChatGPT?"
              answer="You can. But will you? ChatGPT is your gym equipment. WorkStrata is your personal trainer. You could figure it out alone—but without structure, curriculum, and accountability, most people try for a week and stop."
            />
            <FAQItem 
              question="I'm already using AI at work."
              answer="Great! But using AI and being AI-capable are different. We help you go from 'I use ChatGPT sometimes' to 'I have a systematic approach to AI-augmented work that I can articulate and prove.'"
            />
            <FAQItem 
              question="Is $29/month worth it for emails?"
              answer="You're not paying for emails. You're paying for curation (we filter the noise), structure (skills-based curriculum), and accountability (daily habit). If you save 1 hour per week from better AI skills, that's $200/month in value at $50/hour."
            />
            <FAQItem 
              question="AI changes so fast. Won't this be outdated?"
              answer="Exactly why courses fail—they're frozen in time. Our content is curated daily. And we teach skills (how to think with AI), not tools (which button to click). Skills transfer across whatever model is trending next month."
            />
            <FAQItem 
              question="My job is too specialized for this."
              answer="Your job title is unique. Your tasks aren't. Everyone writes emails, summarizes information, does research, analyzes data, and communicates with others. We train the AI skills that apply to cognitive work everywhere."
            />
            <FAQItem 
              question="What if AI replaces my job anyway?"
              answer="Then you definitely want to be the person who understands AI. The risk isn't learning too much about AI—it's being the person who doesn't. WorkStrata is career insurance."
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 bg-primary-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stop falling behind.<br />Start building AI skills that matter.
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Free assessment. 7-day trial. Cancel anytime.
          </p>
          <Link 
            href="/capture"
            className="inline-block bg-white text-primary-600 text-lg px-8 py-4 rounded-xl hover:bg-gray-100 transition shadow-lg font-semibold"
          >
            Start Free Assessment →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-900">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="text-xl font-bold text-white">WorkStrata</span>
          <div className="flex gap-6 text-gray-400">
            <a href="#" className="hover:text-white transition">Privacy</a>
            <a href="#" className="hover:text-white transition">Terms</a>
            <a href="#" className="hover:text-white transition">Contact</a>
          </div>
          <p className="text-gray-500">© 2026 WorkStrata</p>
        </div>
      </footer>
    </main>
  )
}
