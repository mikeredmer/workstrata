// 201 Skills Assessment Questions
// Based on the 6 skills framework: the missing "201 level" between basic prompting and technical implementation

export interface SkillQuestion {
  id: string
  skill: string
  skillDescription: string
  question: string
  options: {
    text: string
    level: 'developing' | 'intermediate' | 'advanced' | 'unsure'
  }[]
}

export interface SkillAssessment {
  contextAssembly: 'developing' | 'intermediate' | 'advanced' | 'unsure'
  qualityJudgment: 'developing' | 'intermediate' | 'advanced' | 'unsure'
  taskDecomposition: 'developing' | 'intermediate' | 'advanced' | 'unsure'
  iterativeRefinement: 'developing' | 'intermediate' | 'advanced' | 'unsure'
  workflowIntegration: 'developing' | 'intermediate' | 'advanced' | 'unsure'
  frontierRecognition: 'developing' | 'intermediate' | 'advanced' | 'unsure'
}

export const skillQuestions: SkillQuestion[] = [
  {
    id: 'context-assembly',
    skill: 'Context Assembly',
    skillDescription: 'Knowing what information to provide AI and why',
    question: 'When you ask AI for help, how much context do you typically provide?',
    options: [
      { text: 'Just the basic request — AI should figure it out', level: 'developing' },
      { text: 'Some context — I explain what I need', level: 'intermediate' },
      { text: 'Detailed context — examples, constraints, background, and format', level: 'advanced' },
      { text: 'I\'m not sure what context would help', level: 'unsure' }
    ]
  },
  {
    id: 'quality-judgment',
    skill: 'Quality Judgment',
    skillDescription: 'Knowing when to trust AI output vs verify',
    question: 'How do you decide whether to trust AI output?',
    options: [
      { text: 'I usually accept what AI gives me', level: 'developing' },
      { text: 'I spot-check obvious errors', level: 'intermediate' },
      { text: 'I have specific verification steps based on the task type', level: 'advanced' },
      { text: 'I\'m not sure when to verify', level: 'unsure' }
    ]
  },
  {
    id: 'task-decomposition',
    skill: 'Task Decomposition',
    skillDescription: 'Breaking work into AI-appropriate chunks',
    question: 'When facing a complex task, how do you approach using AI?',
    options: [
      { text: 'I give AI the whole task at once', level: 'developing' },
      { text: 'I sometimes break it into parts if the first attempt fails', level: 'intermediate' },
      { text: 'I systematically break tasks into AI-sized chunks before starting', level: 'advanced' },
      { text: 'I\'m not sure how to break tasks down for AI', level: 'unsure' }
    ]
  },
  {
    id: 'iterative-refinement',
    skill: 'Iterative Refinement',
    skillDescription: 'Moving from 70% to 95% through structured passes',
    question: 'When AI output isn\'t quite right, what do you do?',
    options: [
      { text: 'Start over with a new prompt', level: 'developing' },
      { text: 'Ask AI to fix the specific issue', level: 'intermediate' },
      { text: 'Use structured follow-ups to refine: first accuracy, then tone, then format', level: 'advanced' },
      { text: 'I usually just accept imperfect output', level: 'unsure' }
    ]
  },
  {
    id: 'workflow-integration',
    skill: 'Workflow Integration',
    skillDescription: 'Embedding AI into how work actually gets done',
    question: 'How integrated is AI in your regular work?',
    options: [
      { text: 'I use AI occasionally when I think of it', level: 'developing' },
      { text: 'I have a few tasks where I regularly use AI', level: 'intermediate' },
      { text: 'AI is embedded in my standard workflows with templates and triggers', level: 'advanced' },
      { text: 'I haven\'t figured out where AI fits in my work', level: 'unsure' }
    ]
  },
  {
    id: 'frontier-recognition',
    skill: 'Frontier Recognition',
    skillDescription: 'Knowing where AI fails for YOUR specific work',
    question: 'How well do you know where AI doesn\'t work for your tasks?',
    options: [
      { text: 'I\'m often surprised when AI fails', level: 'developing' },
      { text: 'I have a general sense of AI limitations', level: 'intermediate' },
      { text: 'I can predict exactly which parts of my work AI will struggle with', level: 'advanced' },
      { text: 'I\'m not sure where the boundaries are', level: 'unsure' }
    ]
  }
]

export const skillLabels: Record<string, string> = {
  contextAssembly: 'Context Assembly',
  qualityJudgment: 'Quality Judgment',
  taskDecomposition: 'Task Decomposition',
  iterativeRefinement: 'Iterative Refinement',
  workflowIntegration: 'Workflow Integration',
  frontierRecognition: 'Frontier Recognition'
}

export const levelLabels: Record<string, { label: string; color: string; description: string }> = {
  developing: { 
    label: 'Developing', 
    color: 'text-amber-600 bg-amber-50', 
    description: 'Room to grow — this is where most people start'
  },
  intermediate: { 
    label: 'Intermediate', 
    color: 'text-blue-600 bg-blue-50', 
    description: 'Good foundation — ready to level up'
  },
  advanced: { 
    label: 'Advanced', 
    color: 'text-green-600 bg-green-50', 
    description: 'Strong skill — you\'re ahead of most'
  },
  unsure: { 
    label: 'Exploring', 
    color: 'text-gray-600 bg-gray-50', 
    description: 'That\'s okay — awareness is the first step'
  }
}

// Map question IDs to assessment keys
export const questionToSkillKey: Record<string, keyof SkillAssessment> = {
  'context-assembly': 'contextAssembly',
  'quality-judgment': 'qualityJudgment',
  'task-decomposition': 'taskDecomposition',
  'iterative-refinement': 'iterativeRefinement',
  'workflow-integration': 'workflowIntegration',
  'frontier-recognition': 'frontierRecognition'
}

// Calculate overall readiness score
export function calculateReadinessScore(assessment: SkillAssessment): number {
  const levels = Object.values(assessment)
  const scores = levels.map(level => {
    switch (level) {
      case 'advanced': return 3
      case 'intermediate': return 2
      case 'developing': return 1
      case 'unsure': return 1
      default: return 1
    }
  })
  return Math.round((scores.reduce((a, b) => a + b, 0) / (levels.length * 3)) * 100)
}

// Get skill-specific tips based on level
export function getSkillTip(skill: keyof SkillAssessment, level: string): string {
  const tips: Record<string, Record<string, string>> = {
    contextAssembly: {
      developing: 'Start by including: what you need, why you need it, any constraints, and an example of good output.',
      intermediate: 'Add role context ("You are a..."), specify format requirements, and include relevant background documents.',
      advanced: 'You\'re doing great! Consider creating reusable context templates for your frequent tasks.',
      unsure: 'Try the RICE method: Role, Instructions, Context, Examples. Start with just these four elements.'
    },
    qualityJudgment: {
      developing: 'Create a simple checklist: facts accurate? tone right? format correct? Run through it each time.',
      intermediate: 'Build task-specific verification steps. Data tasks need different checks than creative tasks.',
      advanced: 'Consider documenting your verification protocols to share with your team.',
      unsure: 'Start with one rule: always verify any numbers, names, or specific claims AI produces.'
    },
    taskDecomposition: {
      developing: 'Before prompting, write down: What are the 3-5 steps to complete this task manually?',
      intermediate: 'Identify which steps benefit from AI and which need human judgment. Do AI steps first.',
      advanced: 'Create workflow templates that pre-chunk your common tasks.',
      unsure: 'Use the "could I explain this to a new employee in one sentence?" test for chunk size.'
    },
    iterativeRefinement: {
      developing: 'Instead of restarting, try: "That\'s close, but please adjust [specific thing]"',
      intermediate: 'Use a refinement sequence: 1) accuracy, 2) completeness, 3) tone, 4) format',
      advanced: 'Document your refinement patterns for different task types.',
      unsure: 'Think of AI like a draft — the first output is v1, not the final product.'
    },
    workflowIntegration: {
      developing: 'Pick ONE recurring task this week and use AI every time you do it.',
      intermediate: 'Create saved prompts/templates for your regular AI-assisted tasks.',
      advanced: 'Look for automation opportunities: can triggers start your AI workflows?',
      unsure: 'List your weekly tasks. Star the ones that are repetitive — those are AI candidates.'
    },
    frontierRecognition: {
      developing: 'Keep a simple log: "AI worked well / didn\'t work well" for a week. Patterns will emerge.',
      intermediate: 'For each task type, note: AI strengths, AI weaknesses, human checkpoints needed.',
      advanced: 'Share your frontier knowledge with colleagues — it\'s valuable institutional knowledge.',
      unsure: 'Common AI struggles: recent events, your company-specific context, nuanced judgment calls.'
    }
  }
  return tips[skill]?.[level] || tips[skill]?.developing || ''
}
