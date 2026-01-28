import Link from 'next/link'

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
            Get Free Assessment
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Find the 10+ hours you&apos;re losing to work AI should handle.
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Answer one question about your day. Get instant analysis of what&apos;s automatable, how much time you&apos;ll save, and exactly how to set it up.
          </p>
          <Link 
            href="/capture"
            className="inline-block bg-primary-600 text-white text-lg px-8 py-4 rounded-xl hover:bg-primary-700 transition shadow-lg hover:shadow-xl"
          >
            Get Your Free Assessment →
          </Link>
          <p className="mt-4 text-sm text-gray-500">Takes 2 minutes. No credit card required.</p>
        </div>
      </section>

      {/* Value Prop Bar */}
      <section className="py-8 px-6 border-y border-gray-100 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-600 font-medium">
            Most professionals spend <span className="text-primary-600 font-bold">10-15 hours/week</span> on work AI could handle
          </p>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            You know AI can help.
            <br />
            <span className="text-gray-500">You just don&apos;t know where to start.</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="text-4xl mb-4">😵‍💫</div>
              <h3 className="font-semibold mb-2">Thousands of tools, zero direction</h3>
              <p className="text-gray-600 text-sm">You&apos;ve heard about ChatGPT, Zapier, and a hundred others. But which ones actually matter for YOUR work?</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="text-4xl mb-4">⏰</div>
              <h3 className="font-semibold mb-2">No time to experiment</h3>
              <p className="text-gray-600 text-sm">You&apos;re busy doing the work. When would you figure out what to automate?</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="text-4xl mb-4">🤷</div>
              <h3 className="font-semibold mb-2">Blind spots everywhere</h3>
              <p className="text-gray-600 text-sm">The most automatable tasks are the ones you&apos;ve done so long you don&apos;t even notice them anymore.</p>
            </div>
          </div>
        </div>
      </section>

      {/* What People Discover */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            What people discover
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <p className="text-5xl font-bold text-primary-600 mb-2">12h</p>
              <p className="text-gray-700">Average weekly hours spent on automatable tasks by product managers</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <p className="text-5xl font-bold text-primary-600 mb-2">73%</p>
              <p className="text-gray-700">Of repetitive work can be fully or partially automated with existing tools</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <p className="text-5xl font-bold text-primary-600 mb-2">$31K</p>
              <p className="text-gray-700">Average annual value of time that could be reclaimed through automation</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            From buried in tasks to clear on priorities
          </h2>
          <p className="text-center text-gray-600 mb-12">3 steps. 2 minutes. Real clarity.</p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-14 h-14 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
              <h3 className="font-semibold mb-2">Capture</h3>
              <p className="text-gray-600 text-sm">Tell us your role and select your common workflows.</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
              <h3 className="font-semibold mb-2">Analyze</h3>
              <p className="text-gray-600 text-sm">We classify each task and calculate your time savings.</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
              <h3 className="font-semibold mb-2">Implement</h3>
              <p className="text-gray-600 text-sm">Get specific tool recommendations and step-by-step guides.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Start free. Upgrade when you&apos;re ready.
          </h2>
          <p className="text-center text-gray-600 mb-12">No credit card required to get started.</p>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Free */}
            <div className="bg-white p-8 rounded-xl shadow-sm border-2 border-transparent">
              <h3 className="text-xl font-bold mb-2">Free</h3>
              <p className="text-4xl font-bold mb-4">$0<span className="text-lg text-gray-500 font-normal">/mo</span></p>
              <ul className="space-y-3 mb-8 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> 10 task assessments
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Time & dollar estimates
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Basic automation guides
                </li>
              </ul>
              <Link href="/capture" className="block text-center bg-gray-100 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-200 transition">
                Get Started Free
              </Link>
            </div>
            
            {/* Pro */}
            <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-primary-500 relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-500 text-white text-xs px-3 py-1 rounded-full">Most Popular</span>
              <h3 className="text-xl font-bold mb-2">Pro</h3>
              <p className="text-4xl font-bold mb-4">$29<span className="text-lg text-gray-500 font-normal">/mo</span></p>
              <ul className="space-y-3 mb-8 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Unlimited assessments
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Premium implementation guides
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Tool recommendations with templates
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Priority support
                </li>
              </ul>
              <Link href="/capture" className="block text-center bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition">
                Start 7-Day Trial
              </Link>
            </div>
            
            {/* Team */}
            <div className="bg-white p-8 rounded-xl shadow-sm border-2 border-transparent opacity-75">
              <h3 className="text-xl font-bold mb-2">Team</h3>
              <p className="text-4xl font-bold mb-4 text-gray-400">Soon</p>
              <ul className="space-y-3 mb-8 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-gray-400">○</span> Team-wide insights
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gray-400">○</span> Manager dashboard
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gray-400">○</span> Workflow pattern detection
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gray-400">○</span> SSO & compliance
                </li>
              </ul>
              <button disabled className="block w-full text-center bg-gray-100 text-gray-400 px-6 py-3 rounded-lg cursor-not-allowed">
                Join Waitlist
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Stop doing robot work.
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Find out how much of your week is spent on tasks AI should handle.
          </p>
          <Link 
            href="/capture"
            className="inline-block bg-primary-600 text-white text-lg px-8 py-4 rounded-xl hover:bg-primary-700 transition shadow-lg hover:shadow-xl"
          >
            Get Your Free Assessment →
          </Link>
          <p className="mt-4 text-sm text-gray-500">Free forever. No credit card required.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-200">
        <div className="max-w-4xl mx-auto text-center text-gray-500 text-sm">
          <p>© 2026 WorkStrata. Elevate humans to do human-level work.</p>
        </div>
      </footer>
    </main>
  )
}
