import { supabase } from './supabase'
import type { SkillAssessment } from '@/data/skills-assessment'

export interface Profile {
  id: string
  full_name: string | null
  email: string | null

  // Role mapping
  job_title: string | null
  industry: string | null
  company_size: string | null
  responsibilities: string[] | null

  // Task inventory
  tasks_time_consuming: string[] | null
  tasks_repetitive: string[] | null
  tasks_judgment: string[] | null

  // Skills assessment
  skill_assessment: SkillAssessment | null
  ai_readiness_score: number | null

  // Personalization
  learning_preference: string | null
  email_time: string | null
  focus_area: string | null

  // Trial tracking
  trial_started_at: string | null
  trial_ends_at: string | null
  onboarding_completed_at: string | null

  // Progress tracking
  current_streak: number
  last_activity_at: string | null
  completed_experiments: string[] | null

  // Timestamps
  created_at: string
  updated_at: string
}

export interface OnboardingData {
  // Role mapping
  jobTitle: string
  industry: string
  companySize: string
  responsibilities: string[]

  // Task inventory
  timeConsumingTasks: string[]
  repetitiveTasks: string[]
  judgmentTasks: string[]

  // Skills assessment
  skillAssessment: SkillAssessment
  aiReadinessScore: number

  // Personalization
  learningPreference: string
  emailTime: string
  focusArea: string
}

export async function getProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) {
    console.error('Error fetching profile:', error)
    return null
  }

  return data as Profile
}

export async function saveOnboardingData(
  userId: string,
  data: OnboardingData
): Promise<{ success: boolean; error?: string }> {
  const now = new Date().toISOString()
  const trialEnd = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()

  const { error } = await supabase
    .from('profiles')
    .update({
      job_title: data.jobTitle,
      industry: data.industry,
      company_size: data.companySize,
      responsibilities: data.responsibilities,
      tasks_time_consuming: data.timeConsumingTasks,
      tasks_repetitive: data.repetitiveTasks,
      tasks_judgment: data.judgmentTasks,
      skill_assessment: data.skillAssessment,
      ai_readiness_score: data.aiReadinessScore,
      learning_preference: data.learningPreference,
      email_time: data.emailTime,
      focus_area: data.focusArea,
      trial_started_at: now,
      trial_ends_at: trialEnd,
      onboarding_completed_at: now,
      last_activity_at: now
    })
    .eq('id', userId)

  if (error) {
    console.error('Error saving onboarding data:', error)
    return { success: false, error: error.message }
  }

  return { success: true }
}

export async function updateStreak(userId: string): Promise<void> {
  const profile = await getProfile(userId)
  if (!profile) return

  const now = new Date()
  const lastActivity = profile.last_activity_at
    ? new Date(profile.last_activity_at)
    : null

  let newStreak = profile.current_streak || 0

  if (lastActivity) {
    const hoursSinceLastActivity = (now.getTime() - lastActivity.getTime()) / (1000 * 60 * 60)

    if (hoursSinceLastActivity > 48) {
      // Streak broken - more than 48 hours
      newStreak = 1
    } else if (hoursSinceLastActivity > 20) {
      // New day - increment streak
      newStreak += 1
    }
    // Otherwise same day - keep streak
  } else {
    newStreak = 1
  }

  await supabase
    .from('profiles')
    .update({
      current_streak: newStreak,
      last_activity_at: now.toISOString()
    })
    .eq('id', userId)
}

export async function markExperimentComplete(
  userId: string,
  experimentId: string
): Promise<void> {
  const profile = await getProfile(userId)
  if (!profile) return

  const completed = profile.completed_experiments || []
  if (!completed.includes(experimentId)) {
    completed.push(experimentId)
  }

  await supabase
    .from('profiles')
    .update({
      completed_experiments: completed,
      last_activity_at: new Date().toISOString()
    })
    .eq('id', userId)
}

export function calculateTrialStatus(profile: Profile): {
  isInTrial: boolean
  trialExpired: boolean
  daysLeft: number
  dayNumber: number
} {
  if (!profile.trial_started_at || !profile.trial_ends_at) {
    return { isInTrial: false, trialExpired: false, daysLeft: 7, dayNumber: 0 }
  }

  const now = new Date()
  const trialEnd = new Date(profile.trial_ends_at)
  const trialStart = new Date(profile.trial_started_at)

  const daysLeft = Math.max(0, Math.ceil((trialEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)))
  const dayNumber = Math.min(7, Math.ceil((now.getTime() - trialStart.getTime()) / (1000 * 60 * 60 * 24)))

  return {
    isInTrial: daysLeft > 0,
    trialExpired: daysLeft === 0,
    daysLeft,
    dayNumber
  }
}
