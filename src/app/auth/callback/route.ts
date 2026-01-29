import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const onboarding = requestUrl.searchParams.get('onboarding')
  
  if (code) {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    
    await supabase.auth.exchangeCodeForSession(code)
  }

  // If coming from signup, redirect to onboarding/assessment
  if (onboarding === 'true') {
    return NextResponse.redirect(new URL('/capture', request.url))
  }

  // Otherwise redirect to dashboard
  return NextResponse.redirect(new URL('/dashboard', request.url))
}
