import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY not configured')
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY)
}

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Missing signature or webhook secret' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    const stripe = getStripe()
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const supabase = getSupabaseAdmin()

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      const email = session.customer_email || session.metadata?.email
      
      if (email) {
        await supabase
          .from('signups')
          .update({ 
            stripe_customer_id: session.customer as string,
            subscription_status: 'active',
            subscription_id: session.subscription as string
          })
          .eq('email', email.toLowerCase())
        
        console.log(`[stripe] Subscription activated for ${email}`)
      }
      break
    }
    
    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription
      const customerId = subscription.customer as string
      
      await supabase
        .from('signups')
        .update({ subscription_status: 'cancelled' })
        .eq('stripe_customer_id', customerId)
      
      console.log(`[stripe] Subscription cancelled for customer ${customerId}`)
      break
    }

    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription
      const customerId = subscription.customer as string
      
      await supabase
        .from('signups')
        .update({ subscription_status: subscription.status })
        .eq('stripe_customer_id', customerId)
      
      console.log(`[stripe] Subscription updated: ${subscription.status}`)
      break
    }
  }

  return NextResponse.json({ received: true })
}
