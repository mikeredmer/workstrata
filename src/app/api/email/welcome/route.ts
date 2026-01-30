import { NextRequest, NextResponse } from 'next/server'
import { sendEmail, welcomeEmail } from '@/lib/email'
import { skillLabels, type SkillAssessment } from '@/data/skills-assessment'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name, readinessScore, focusArea } = body

    if (!email || !name) {
      return NextResponse.json(
        { error: 'Missing required fields: email, name' },
        { status: 400 }
      )
    }

    const focusAreaLabel = focusArea
      ? skillLabels[focusArea as keyof SkillAssessment] || focusArea
      : 'AI Skills'

    const { subject, html } = welcomeEmail(
      name,
      readinessScore || 25,
      focusAreaLabel
    )

    const result = await sendEmail({
      to: email,
      subject,
      html
    })

    if (result.success) {
      return NextResponse.json({ success: true, id: result.id })
    } else {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Welcome email error:', error)
    return NextResponse.json(
      { error: 'Failed to send welcome email' },
      { status: 500 }
    )
  }
}
