// 7-Day AI Skills Curriculum
// Each day focuses on a specific skill with curated content and a practical experiment

export interface DailyContent {
  day: number
  skill: string // maps to SkillAssessment keys
  skillName: string
  title: string
  preview: string
  estimatedTime: string

  // Main learning content
  content: {
    type: 'video' | 'article' | 'interactive'
    title: string
    source: string
    url: string
    duration: string
    keyTakeaways: string[]
  }

  // Bonus content (optional, for different learning styles)
  bonusContent?: {
    type: 'video' | 'article'
    title: string
    source: string
    url: string
    duration: string
  }

  // Daily experiment
  experiment: {
    title: string
    description: string
    steps: string[]
    timeEstimate: string
    successCriteria: string
  }

  // Quick tip for the day
  proTip: string
}

export const curriculum: DailyContent[] = [
  // ============================================
  // DAY 1: Context Assembly - The Foundation
  // ============================================
  {
    day: 1,
    skill: 'contextAssembly',
    skillName: 'Context Assembly',
    title: 'The 3-Part Context Formula',
    preview: 'Learn the exact framework for giving AI the context it needs to produce great output on the first try.',
    estimatedTime: '15 min',

    content: {
      type: 'article',
      title: 'Prompting Fundamentals: The Complete Guide',
      source: 'Anthropic',
      url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview',
      duration: '8 min read',
      keyTakeaways: [
        'Context = Role + Task + Constraints',
        'Be specific about what you want and what you don\'t want',
        'Include examples of good output when possible',
        'The more context you provide, the better the output'
      ]
    },

    bonusContent: {
      type: 'video',
      title: 'How to Use AI: The Complete Beginner\'s Guide',
      source: 'Jeff Su',
      url: 'https://www.youtube.com/watch?v=jHv63Uvk5VA',
      duration: '12 min'
    },

    experiment: {
      title: 'Rewrite a Recent AI Request',
      description: 'Take something you recently asked AI to do. Apply the 3-part context formula and compare the results.',
      steps: [
        'Find an AI prompt you used in the last week that gave mediocre results',
        'Identify what was missing: Role context? Task specifics? Constraints?',
        'Rewrite the prompt using: "You are [role]. I need you to [specific task]. The output should [constraints]."',
        'Run both prompts and compare the outputs side by side'
      ],
      timeEstimate: '10 min',
      successCriteria: 'The rewritten prompt produces noticeably better output with less back-and-forth needed.'
    },

    proTip: 'Start every AI conversation by stating who you are and what you\'re trying to accomplish. "I\'m a marketing manager preparing a quarterly report for my VP..." immediately improves output quality.'
  },

  // ============================================
  // DAY 2: Context Assembly - Advanced
  // ============================================
  {
    day: 2,
    skill: 'contextAssembly',
    skillName: 'Context Assembly',
    title: 'Context Stacking for Complex Tasks',
    preview: 'How to layer multiple pieces of context without overwhelming the AI or getting confused output.',
    estimatedTime: '15 min',

    content: {
      type: 'article',
      title: 'Long Context Window Tips',
      source: 'Anthropic',
      url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/long-context-tips',
      duration: '6 min read',
      keyTakeaways: [
        'Structure your context with clear sections and headers',
        'Put the most important information at the beginning and end',
        'Use XML tags or markdown to separate different types of context',
        'Reference specific parts of your context in your request'
      ]
    },

    bonusContent: {
      type: 'video',
      title: 'Advanced Prompt Engineering',
      source: 'Anthropic',
      url: 'https://www.youtube.com/watch?v=T9aRN5JkmL8',
      duration: '45 min'
    },

    experiment: {
      title: 'Build a Reusable Context Document',
      description: 'Create a "context doc" for a recurring task at work that you can paste into AI conversations.',
      steps: [
        'Pick a task you do regularly (weekly reports, customer emails, etc.)',
        'Write a context doc with sections: Your Role, Audience, Tone Guidelines, Examples of Good Output, Common Mistakes to Avoid',
        'Save this as a note or text file you can quickly copy-paste',
        'Test it by starting a new AI conversation with just the context doc + a simple request'
      ],
      timeEstimate: '15 min',
      successCriteria: 'Your context doc produces good first-draft output with minimal additional prompting.'
    },

    proTip: 'Create a "swipe file" of context docs for your most common tasks. The 5 minutes spent writing a good context doc saves hours over time.'
  },

  // ============================================
  // DAY 3: Quality Judgment
  // ============================================
  {
    day: 3,
    skill: 'qualityJudgment',
    skillName: 'Quality Judgment',
    title: 'Spotting AI Hallucinations',
    preview: 'Train your eye to catch when AI is confidently wrong. The patterns are more predictable than you think.',
    estimatedTime: '15 min',

    content: {
      type: 'article',
      title: 'Reducing Hallucinations in AI',
      source: 'Anthropic',
      url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/reduce-hallucinations',
      duration: '5 min read',
      keyTakeaways: [
        'AI hallucinates most with specific facts, dates, quotes, and citations',
        'Ask AI to say "I don\'t know" when uncertain instead of guessing',
        'Request sources and then verify them independently',
        'Be especially skeptical of confident-sounding specifics'
      ]
    },

    bonusContent: {
      type: 'article',
      title: 'The Art of AI-Assisted Writing',
      source: 'Every',
      url: 'https://every.to/chain-of-thought/the-art-of-ai-assisted-writing',
      duration: '10 min read'
    },

    experiment: {
      title: 'Fact-Check an AI Response',
      description: 'Deliberately test AI on something in your domain and verify its accuracy.',
      steps: [
        'Ask AI a detailed question about your field (industry stats, technical specs, company info)',
        'Note which parts of the response sound confident and specific',
        'Fact-check at least 3 specific claims using reliable sources',
        'Track: How many were accurate? How many were plausible but wrong? How many were obviously wrong?'
      ],
      timeEstimate: '10 min',
      successCriteria: 'You can identify the "hallucination risk zones" in AI output (usually specific numbers, dates, quotes, or niche facts).'
    },

    proTip: 'Add "If you\'re not certain about something, say so rather than guessing" to your prompts. This simple addition dramatically reduces confident-sounding hallucinations.'
  },

  // ============================================
  // DAY 4: Task Decomposition
  // ============================================
  {
    day: 4,
    skill: 'taskDecomposition',
    skillName: 'Task Decomposition',
    title: 'Breaking Down Big Tasks',
    preview: 'Why "write me a report" fails and "help me outline the sections" succeeds. Task size matters.',
    estimatedTime: '15 min',

    content: {
      type: 'article',
      title: 'Chain of Thought Prompting',
      source: 'Anthropic',
      url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/chain-of-thought',
      duration: '5 min read',
      keyTakeaways: [
        'Complex tasks should be broken into sequential steps',
        'Ask AI to think through problems step-by-step',
        'Each step should have a clear, verifiable output',
        'You stay in control by approving each step before moving on'
      ]
    },

    bonusContent: {
      type: 'video',
      title: 'How to 10x Your Productivity with AI',
      source: 'Ali Abdaal',
      url: 'https://www.youtube.com/watch?v=p7cMmZXGu8k',
      duration: '18 min'
    },

    experiment: {
      title: 'Decompose a Work Project',
      description: 'Take a real project and break it into AI-appropriate chunks.',
      steps: [
        'Pick a project you\'re currently working on or planning to start',
        'List all the subtasks involved (brainstorming, research, drafting, editing, etc.)',
        'For each subtask, mark: "AI can do this" / "AI can help with this" / "I need to do this"',
        'For "AI can help" tasks, write what specific help you\'d ask for'
      ],
      timeEstimate: '12 min',
      successCriteria: 'You have a clear map of where AI fits in your project workflow, with specific prompts ready for each AI-assisted step.'
    },

    proTip: 'When a task feels too big, ask AI: "What are the steps to accomplish [X]?" Then tackle each step as a separate conversation.'
  },

  // ============================================
  // DAY 5: Iterative Refinement
  // ============================================
  {
    day: 5,
    skill: 'iterativeRefinement',
    skillName: 'Iterative Refinement',
    title: 'The Feedback Loop',
    preview: 'Stop accepting first drafts. Learn to guide AI through revisions that actually improve the output.',
    estimatedTime: '15 min',

    content: {
      type: 'article',
      title: 'Multishot Prompting Examples',
      source: 'Anthropic',
      url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/multishot-prompting',
      duration: '5 min read',
      keyTakeaways: [
        'First drafts are starting points, not final outputs',
        'Be specific about what to keep and what to change',
        'Show examples of what "better" looks like',
        'Iterate in the same conversation to preserve context'
      ]
    },

    bonusContent: {
      type: 'video',
      title: 'Prompt Engineering Best Practices',
      source: 'OpenAI',
      url: 'https://www.youtube.com/watch?v=ahnGLM-RC1Y',
      duration: '25 min'
    },

    experiment: {
      title: 'Refine Through 3 Rounds',
      description: 'Practice the art of iterative improvement with a real deliverable.',
      steps: [
        'Ask AI to write something you actually need (email, summary, outline)',
        'Round 1: Point out the biggest issue and ask for a revision',
        'Round 2: Get more specific—"Make the intro punchier" or "Add more data to support point 2"',
        'Round 3: Polish—tone, length, specific word choices',
        'Compare the first draft to the final version'
      ],
      timeEstimate: '15 min',
      successCriteria: 'The final version is significantly better than the first draft, and you can articulate why each round of feedback helped.'
    },

    proTip: 'Use the phrase "Keep everything the same except..." to make targeted improvements without losing what\'s already working.'
  },

  // ============================================
  // DAY 6: Workflow Integration
  // ============================================
  {
    day: 6,
    skill: 'workflowIntegration',
    skillName: 'Workflow Integration',
    title: 'Where AI Fits in Your Day',
    preview: 'Map your actual workday and find the highest-leverage moments to bring AI into your workflow.',
    estimatedTime: '15 min',

    content: {
      type: 'article',
      title: 'Building Effective AI Workflows',
      source: 'a]6z',
      url: 'https://a16z.com/ai-productivity-guide/',
      duration: '8 min read',
      keyTakeaways: [
        'The best AI use cases save time on tasks you do frequently',
        'Start with "draft generation" tasks—where you need a starting point',
        'AI works best as a collaborator, not a replacement',
        'Build AI into existing workflows rather than creating new ones'
      ]
    },

    bonusContent: {
      type: 'video',
      title: 'How I Use AI in My Daily Workflow',
      source: 'Tiago Forte',
      url: 'https://www.youtube.com/watch?v=Mxmb4MaBiMs',
      duration: '20 min'
    },

    experiment: {
      title: 'Audit Your Workflow',
      description: 'Find the highest-leverage places to add AI to your actual work.',
      steps: [
        'For the next 2 hours, track every task you do (or review yesterday)',
        'For each task, mark: "AI could help" / "AI would slow me down" / "Not sure"',
        'For "AI could help" tasks, estimate time saved per occurrence',
        'Pick the top 3 highest-impact opportunities and write a prompt for each'
      ],
      timeEstimate: '20 min (including tracking time)',
      successCriteria: 'You have 3 specific, high-impact places to use AI in your regular workflow, with prompts ready to go.'
    },

    proTip: 'The best AI use cases aren\'t the flashiest—they\'re the boring, repetitive tasks you do every week. Start there.'
  },

  // ============================================
  // DAY 7: Frontier Recognition
  // ============================================
  {
    day: 7,
    skill: 'frontierRecognition',
    skillName: 'Frontier Recognition',
    title: 'Staying Current Without Drowning',
    preview: 'AI capabilities change fast. Build a sustainable system for knowing what\'s new without the FOMO.',
    estimatedTime: '15 min',

    content: {
      type: 'article',
      title: 'The State of AI in 2025',
      source: 'Benedict Evans',
      url: 'https://www.ben-evans.com/presentations',
      duration: '10 min read',
      keyTakeaways: [
        'Focus on capabilities, not specific tools (tools change, skills transfer)',
        'Most "AI news" is noise—filter for what affects your actual work',
        'New capabilities unlock new workflows, not just faster old ones',
        'The skill is recognizing when your limitations have changed'
      ]
    },

    bonusContent: {
      type: 'article',
      title: 'AI Index Annual Report',
      source: 'Stanford HAI',
      url: 'https://aiindex.stanford.edu/report/',
      duration: '15 min (key findings summary)'
    },

    experiment: {
      title: 'Set Up Your Signal Filter',
      description: 'Build a sustainable system for staying current on AI without drowning in hype.',
      steps: [
        'Identify 2-3 trusted sources for AI updates (newsletters, podcasts, or people)',
        'Unsubscribe from or mute everything else that creates noise',
        'Set a recurring 15-min weekly slot to catch up on AI developments',
        'Create a simple note: "Things AI can do now that it couldn\'t before" and commit to updating it monthly'
      ],
      timeEstimate: '12 min',
      successCriteria: 'You have a sustainable, low-noise system for staying current that doesn\'t require daily attention.'
    },

    proTip: 'The question isn\'t "what\'s new in AI?" but "what can I do now that I couldn\'t do last month?" Focus on capability changes that affect your work.'
  }
]

// Helper to get content for a specific day
export function getDayContent(dayNumber: number): DailyContent | undefined {
  return curriculum.find(c => c.day === dayNumber)
}

// Helper to get content by skill
export function getContentBySkill(skill: string): DailyContent[] {
  return curriculum.filter(c => c.skill === skill)
}
