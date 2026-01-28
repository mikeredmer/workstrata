import { NextRequest, NextResponse } from 'next/server'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

interface SignupData {
  email: string
  role?: string
  salary?: number
  workflows?: string[]
  tools?: string[]
  potentialSavings?: number
}

export async function POST(request: NextRequest) {
  try {
    const body: SignupData = await request.json()
    const { email, role, salary, workflows, tools, potentialSavings } = body

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      )
    }

    if (!isSupabaseConfigured()) {
      console.log(`[signup] Supabase not configured - ${email}`)
      return NextResponse.json({ 
        success: true, 
        message: 'Signup received (database not configured)',
        isNew: true
      })
    }

    // Try to insert/upsert into signups table
    const { data, error } = await supabase
      .from('signups')
      .upsert({
        email: email.toLowerCase(),
        role: role || null,
        salary: salary || null,
        workflows: workflows || null,
        tools: tools || null,
        potential_savings: potentialSavings || null
      }, {
        onConflict: 'email',
        ignoreDuplicates: false
      })
      .select()
      .single()

    if (error) {
      // If signups table doesn't exist, log and succeed anyway
      if (error.code === '42P01' || error.code === 'PGRST205') {
        console.log(`[signup] Table not found - ${email} - $${potentialSavings || 0}/yr`)
        console.log('[signup] Run supabase-setup.sql to create the signups table')
        return NextResponse.json({ 
          success: true, 
          message: 'Signup received (table not created yet)',
          isNew: true
        })
      }
      
      console.error('[signup] Supabase error:', error)
      throw error
    }

    console.log(`[signup] Saved: ${email} - $${potentialSavings || 0}/yr - ${workflows?.length || 0} workflows`)

    return NextResponse.json({ 
      success: true, 
      message: 'Signup saved',
      isNew: true,
      id: data?.id
    })
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'Failed to save signup' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json({ 
        count: 0, 
        signups: [],
        message: 'Database not configured' 
      })
    }

    const { data, error } = await supabase
      .from('signups')
      .select('id, email, role, potential_savings, created_at')
      .order('created_at', { ascending: false })
      .limit(100)

    if (error) {
      if (error.code === '42P01' || error.code === 'PGRST205') {
        return NextResponse.json({ 
          count: 0, 
          signups: [],
          message: 'Table not created yet - run supabase-setup.sql' 
        })
      }
      throw error
    }

    return NextResponse.json({ 
      count: data?.length || 0,
      signups: data || []
    })
  } catch (error) {
    console.error('Get signups error:', error)
    return NextResponse.json({ error: 'Failed to get signups' }, { status: 500 })
  }
}
