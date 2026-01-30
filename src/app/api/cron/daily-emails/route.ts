import { NextRequest, NextResponse } from 'next/server'
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { sendEmail, dailyContentEmail, trialEndingEmail, trialExpiredEmail } from '@/lib/email'
import { getDayContent } from '@/data/curriculum'

// Lazy-load Supabase admin client to handle missing env vars during build
let supabaseAdmin: SupabaseClient | null = null

function getSupabaseAdmin(): SupabaseClient {
  if (!supabaseAdmin) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!url || !serviceKey) {
      throw new Error('Supabase environment variables not configured')
    }
    supabaseAdmin = createClient(url, serviceKey)
  }
  return supabaseAdmin
}

// Verify cron secret to prevent unauthorized access
function verifyCronSecret(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET

  if (!cronSecret) {
    console.warn('CRON_SECRET not set - skipping auth check in development')
    return process.env.NODE_ENV === 'development'
  }

  return authHeader === `Bearer ${cronSecret}`
}

export async function POST(request: NextRequest) {
  // Verify this is an authorized cron request
  if (!verifyCronSecret(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const results = {
      dailyEmails: { sent: 0, failed: 0 },
      trialWarnings: { sent: 0, failed: 0 },
      trialExpired: { sent: 0, failed: 0 }
    }

    const admin = getSupabaseAdmin()

    // Get all users with active trials
    const now = new Date()
    const { data: users, error: fetchError } = await admin
      .from('profiles')
      .select('*')
      .not('onboarding_completed_at', 'is', null)
      .not('trial_started_at', 'is', null)

    if (fetchError) {
      console.error('Failed to fetch users:', fetchError)
      return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
    }

    if (!users || users.length === 0) {
      return NextResponse.json({ message: 'No users to email', results })
    }

    for (const user of users) {
      const trialStart = new Date(user.trial_started_at)
      const trialEnd = new Date(user.trial_ends_at)
      const daysSinceStart = Math.floor((now.getTime() - trialStart.getTime()) / (1000 * 60 * 60 * 24))
      const daysUntilEnd = Math.ceil((trialEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

      // Skip if no email
      if (!user.email) continue

      const name = user.full_name?.split(' ')[0] || 'there'

      // Trial has expired
      if (daysUntilEnd <= 0) {
        const { subject, html } = trialExpiredEmail(name, user.ai_readiness_score || 25)
        const result = await sendEmail({ to: user.email, subject, html })
        if (result.success) {
          results.trialExpired.sent++
        } else {
          results.trialExpired.failed++
        }
        continue
      }

      // Trial ending soon (1-2 days left)
      if (daysUntilEnd <= 2) {
        const { subject, html } = trialEndingEmail(name, daysUntilEnd, user.ai_readiness_score || 25)
        const result = await sendEmail({ to: user.email, subject, html })
        if (result.success) {
          results.trialWarnings.sent++
        } else {
          results.trialWarnings.failed++
        }
      }

      // Send daily content (days 1-7)
      const dayNumber = daysSinceStart + 1 // Day 1 is the day after signup
      if (dayNumber >= 1 && dayNumber <= 7) {
        const dayContent = getDayContent(dayNumber)

        if (dayContent) {
          const { subject, html } = dailyContentEmail(
            name,
            dayNumber,
            dayContent.skillName,
            dayContent.title,
            dayContent.preview,
            dayContent.content.url,
            dayContent.experiment.title,
            dayContent.experiment.description
          )

          const result = await sendEmail({ to: user.email, subject, html })
          if (result.success) {
            results.dailyEmails.sent++
          } else {
            results.dailyEmails.failed++
          }
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Daily emails processed',
      results,
      processedAt: now.toISOString()
    })

  } catch (error) {
    console.error('Daily email cron error:', error)
    return NextResponse.json(
      { error: 'Failed to process daily emails' },
      { status: 500 }
    )
  }
}

// Also support GET for manual testing
export async function GET(request: NextRequest) {
  return POST(request)
}
