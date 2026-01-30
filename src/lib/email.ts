import { Resend } from 'resend'

// Lazy-load Resend client to handle missing API key during build
let resend: Resend | null = null

function getResendClient(): Resend {
  if (!resend) {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      throw new Error('RESEND_API_KEY environment variable is not set')
    }
    resend = new Resend(apiKey)
  }
  return resend
}

const FROM_EMAIL = 'WorkStrata <hello@workstrata.ai>'

export interface SendEmailParams {
  to: string
  subject: string
  html: string
  text?: string
}

export async function sendEmail({ to, subject, html, text }: SendEmailParams) {
  try {
    const client = getResendClient()
    const { data, error } = await client.emails.send({
      from: FROM_EMAIL,
      to,
      subject,
      html,
      text: text || stripHtml(html)
    })

    if (error) {
      console.error('Email send error:', error)
      return { success: false, error: error.message }
    }

    return { success: true, id: data?.id }
  } catch (err) {
    console.error('Email send exception:', err)
    return { success: false, error: err instanceof Error ? err.message : 'Unknown error' }
  }
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
}

// ============================================
// EMAIL TEMPLATES
// ============================================

export function welcomeEmail(name: string, readinessScore: number, focusArea: string) {
  const subject = `Welcome to WorkStrata – Your AI journey starts now`

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1f2937; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #4f46e5; margin: 0;">WorkStrata</h1>
  </div>

  <h2 style="color: #1f2937;">Welcome, ${name}!</h2>

  <p>You've taken the first step toward becoming AI-capable. Here's what we learned about you:</p>

  <div style="background: linear-gradient(135deg, #4f46e5, #6366f1); color: white; padding: 20px; border-radius: 12px; margin: 20px 0;">
    <p style="margin: 0; font-size: 14px; opacity: 0.9;">YOUR AI READINESS SCORE</p>
    <p style="margin: 5px 0; font-size: 48px; font-weight: bold;">${readinessScore}%</p>
    <p style="margin: 0; font-size: 14px; opacity: 0.9;">Focus area: ${focusArea}</p>
  </div>

  <h3>Your 7-Day Trial</h3>
  <p>For the next 7 days, you'll receive:</p>
  <ul>
    <li><strong>Daily content</strong> – Curated articles and videos matched to your role</li>
    <li><strong>Micro-experiments</strong> – Practical exercises to apply at work today</li>
    <li><strong>Progress tracking</strong> – Watch your skills improve</li>
  </ul>

  <div style="background: #f3f4f6; padding: 20px; border-radius: 12px; margin: 20px 0;">
    <p style="margin: 0 0 10px 0; font-weight: 600;">Day 1 starts tomorrow</p>
    <p style="margin: 0; color: #6b7280;">Check your inbox for your first lesson on ${focusArea}.</p>
  </div>

  <p>Questions? Just reply to this email.</p>

  <p style="color: #6b7280; font-size: 14px; margin-top: 40px;">
    – The WorkStrata Team<br>
    <a href="https://workstrata.ai/dashboard" style="color: #4f46e5;">Go to your dashboard</a>
  </p>

  <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
  <p style="color: #9ca3af; font-size: 12px; text-align: center;">
    WorkStrata · From AI-curious to AI-capable<br>
    <a href="https://workstrata.ai/unsubscribe" style="color: #9ca3af;">Unsubscribe</a>
  </p>
</body>
</html>
  `

  return { subject, html }
}

export function dailyContentEmail(
  name: string,
  dayNumber: number,
  skillName: string,
  contentTitle: string,
  contentPreview: string,
  contentUrl: string,
  experimentTitle: string,
  experimentDescription: string
) {
  const subject = `Day ${dayNumber}: ${contentTitle}`

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1f2937; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #4f46e5; margin: 0; font-size: 20px;">WorkStrata</h1>
    <p style="color: #6b7280; margin: 5px 0 0 0;">Day ${dayNumber} of 7</p>
  </div>

  <p>Good morning, ${name}!</p>

  <p>Today's focus: <strong>${skillName}</strong></p>

  <!-- Today's Learning -->
  <div style="background: #eef2ff; padding: 20px; border-radius: 12px; margin: 20px 0;">
    <p style="margin: 0 0 5px 0; font-size: 12px; color: #4f46e5; font-weight: 600; text-transform: uppercase;">TODAY'S LEARNING</p>
    <h3 style="margin: 0 0 10px 0; color: #1f2937;">${contentTitle}</h3>
    <p style="margin: 0 0 15px 0; color: #4b5563;">${contentPreview}</p>
    <a href="${contentUrl}" style="display: inline-block; background: #4f46e5; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 500;">Start Learning →</a>
  </div>

  <!-- Today's Experiment -->
  <div style="background: #fef3c7; padding: 20px; border-radius: 12px; margin: 20px 0;">
    <p style="margin: 0 0 5px 0; font-size: 12px; color: #d97706; font-weight: 600; text-transform: uppercase;">TODAY'S EXPERIMENT</p>
    <h3 style="margin: 0 0 10px 0; color: #1f2937;">${experimentTitle}</h3>
    <p style="margin: 0; color: #4b5563;">${experimentDescription}</p>
  </div>

  <p style="color: #6b7280;">This should take about 15 minutes total. You've got this!</p>

  <p style="color: #6b7280; font-size: 14px; margin-top: 40px;">
    – The WorkStrata Team<br>
    <a href="https://workstrata.ai/dashboard" style="color: #4f46e5;">View your progress</a>
  </p>

  <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
  <p style="color: #9ca3af; font-size: 12px; text-align: center;">
    WorkStrata · Day ${dayNumber} of your free trial<br>
    <a href="https://workstrata.ai/unsubscribe" style="color: #9ca3af;">Unsubscribe</a>
  </p>
</body>
</html>
  `

  return { subject, html }
}

export function trialEndingEmail(name: string, daysLeft: number, readinessScore: number) {
  const subject = daysLeft === 1
    ? `Your trial ends tomorrow – don't lose your progress`
    : `${daysLeft} days left in your trial`

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1f2937; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #4f46e5; margin: 0;">WorkStrata</h1>
  </div>

  <h2>Hey ${name},</h2>

  <p>Your free trial ends in <strong>${daysLeft} day${daysLeft > 1 ? 's' : ''}</strong>.</p>

  <p>Here's what you've accomplished so far:</p>

  <div style="background: #f3f4f6; padding: 20px; border-radius: 12px; margin: 20px 0;">
    <p style="margin: 0;"><strong>AI Readiness Score:</strong> ${readinessScore}%</p>
    <p style="margin: 10px 0 0 0;"><strong>Days of learning:</strong> ${7 - daysLeft}</p>
  </div>

  <p>When your trial ends, you'll lose access to:</p>
  <ul>
    <li>Daily curated content</li>
    <li>Experiment library</li>
    <li>Progress tracking</li>
    <li>Monthly re-assessments</li>
  </ul>

  <div style="text-align: center; margin: 30px 0;">
    <a href="https://workstrata.ai/dashboard" style="display: inline-block; background: #4f46e5; color: white; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px;">Upgrade to Pro – $29/mo</a>
  </div>

  <p style="color: #6b7280; text-align: center;">Cancel anytime. Keep building your AI skills.</p>

  <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
  <p style="color: #9ca3af; font-size: 12px; text-align: center;">
    WorkStrata · Your trial ends in ${daysLeft} day${daysLeft > 1 ? 's' : ''}<br>
    <a href="https://workstrata.ai/unsubscribe" style="color: #9ca3af;">Unsubscribe</a>
  </p>
</body>
</html>
  `

  return { subject, html }
}

export function trialExpiredEmail(name: string, readinessScore: number) {
  const subject = `Your WorkStrata trial has ended`

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1f2937; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #4f46e5; margin: 0;">WorkStrata</h1>
  </div>

  <h2>Hey ${name},</h2>

  <p>Your 7-day free trial has ended.</p>

  <p>You made real progress – your AI Readiness Score reached <strong>${readinessScore}%</strong>. Don't let that momentum slip away.</p>

  <div style="background: #fef2f2; border: 1px solid #fecaca; padding: 20px; border-radius: 12px; margin: 20px 0;">
    <p style="margin: 0; color: #991b1b;"><strong>Your access has been paused.</strong></p>
    <p style="margin: 10px 0 0 0; color: #7f1d1d;">Daily content, experiments, and progress tracking are now locked.</p>
  </div>

  <p>Ready to continue?</p>

  <div style="text-align: center; margin: 30px 0;">
    <a href="https://workstrata.ai/dashboard" style="display: inline-block; background: #4f46e5; color: white; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px;">Upgrade to Pro – $29/mo</a>
  </div>

  <p style="color: #6b7280; text-align: center;">Your progress is saved. Pick up right where you left off.</p>

  <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
  <p style="color: #9ca3af; font-size: 12px; text-align: center;">
    WorkStrata · From AI-curious to AI-capable<br>
    <a href="https://workstrata.ai/unsubscribe" style="color: #9ca3af;">Unsubscribe</a>
  </p>
</body>
</html>
  `

  return { subject, html }
}
