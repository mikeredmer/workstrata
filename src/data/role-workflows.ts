// Role-based workflow library for guided discovery

export interface Workflow {
  id: string
  name: string
  description: string
  avgHoursPerWeek: number
  strataLevel: 1 | 2 | 3
  automationTools: string[]
  quickWin: string
}

export interface RoleProfile {
  id: string
  title: string
  aliases: string[]
  workflows: Workflow[]
}

export const roleProfiles: RoleProfile[] = [
  {
    id: 'marketing-manager',
    title: 'Marketing Manager',
    aliases: ['marketing director', 'marketing lead', 'head of marketing', 'growth manager', 'demand gen manager'],
    workflows: [
      {
        id: 'mm-1',
        name: 'Campaign performance reporting',
        description: 'Pulling data from ads platforms, compiling into spreadsheets or slides',
        avgHoursPerWeek: 3,
        strataLevel: 1,
        automationTools: ['Supermetrics', 'Google Looker Studio', 'Zapier'],
        quickWin: 'Set up Supermetrics to auto-pull ad data into Google Sheets weekly'
      },
      {
        id: 'mm-2',
        name: 'Social media scheduling',
        description: 'Manually posting content across multiple platforms',
        avgHoursPerWeek: 2,
        strataLevel: 1,
        automationTools: ['Buffer', 'Hootsuite', 'Later'],
        quickWin: 'Batch schedule a month of posts in one session using Buffer'
      },
      {
        id: 'mm-3',
        name: 'Lead data entry to CRM',
        description: 'Copying lead info from forms, events, or spreadsheets into your CRM',
        avgHoursPerWeek: 2,
        strataLevel: 1,
        automationTools: ['Zapier', 'Make', 'native CRM integrations'],
        quickWin: 'Connect your form tool directly to CRM with Zapier'
      },
      {
        id: 'mm-4',
        name: 'Content repurposing',
        description: 'Turning blog posts into social snippets, emails, or other formats',
        avgHoursPerWeek: 3,
        strataLevel: 2,
        automationTools: ['Claude', 'ChatGPT', 'Jasper'],
        quickWin: 'Create a prompt template that converts blog posts to 10 social snippets'
      },
      {
        id: 'mm-5',
        name: 'Email campaign setup',
        description: 'Building emails in your ESP, setting up sequences manually',
        avgHoursPerWeek: 3,
        strataLevel: 2,
        automationTools: ['Klaviyo', 'HubSpot workflows', 'Mailchimp'],
        quickWin: 'Build reusable email templates and snippet libraries'
      },
      {
        id: 'mm-6',
        name: 'Campaign strategy & planning',
        description: 'Deciding campaign themes, messaging, and target audiences',
        avgHoursPerWeek: 4,
        strataLevel: 3,
        automationTools: [],
        quickWin: 'Use AI to brainstorm ideas, but you make final decisions'
      }
    ]
  },
  {
    id: 'operations-manager',
    title: 'Operations Manager',
    aliases: ['ops manager', 'operations director', 'head of operations', 'business operations'],
    workflows: [
      {
        id: 'om-1',
        name: 'Status report compilation',
        description: 'Gathering updates from multiple sources into weekly/monthly reports',
        avgHoursPerWeek: 3,
        strataLevel: 1,
        automationTools: ['Notion', 'Monday.com', 'Asana'],
        quickWin: 'Set up a shared dashboard that auto-updates from project tools'
      },
      {
        id: 'om-2',
        name: 'Vendor invoice processing',
        description: 'Reviewing, categorizing, and routing invoices for approval',
        avgHoursPerWeek: 2,
        strataLevel: 1,
        automationTools: ['Bill.com', 'Tipalti', 'Zapier'],
        quickWin: 'Use Bill.com for automated invoice capture and routing'
      },
      {
        id: 'om-3',
        name: 'Employee onboarding tasks',
        description: 'Setting up accounts, sending welcome emails, scheduling orientation',
        avgHoursPerWeek: 2,
        strataLevel: 1,
        automationTools: ['Rippling', 'BambooHR', 'Process Street'],
        quickWin: 'Create an onboarding checklist in Process Street with auto-assignments'
      },
      {
        id: 'om-4',
        name: 'Data reconciliation',
        description: 'Comparing data between systems to find discrepancies',
        avgHoursPerWeek: 3,
        strataLevel: 2,
        automationTools: ['Parabola', 'Excel Power Query'],
        quickWin: 'Use Parabola to automate weekly data matching between systems'
      },
      {
        id: 'om-5',
        name: 'Process documentation',
        description: 'Writing and updating SOPs and process docs',
        avgHoursPerWeek: 2,
        strataLevel: 2,
        automationTools: ['Scribe', 'Tango', 'Loom'],
        quickWin: 'Use Scribe to auto-generate step-by-step guides as you work'
      },
      {
        id: 'om-6',
        name: 'Vendor relationship management',
        description: 'Negotiating contracts and managing vendor performance',
        avgHoursPerWeek: 3,
        strataLevel: 3,
        automationTools: [],
        quickWin: 'This requires your judgment - protect this time'
      }
    ]
  },
  {
    id: 'project-manager',
    title: 'Project Manager',
    aliases: ['pm', 'program manager', 'project lead', 'delivery manager', 'scrum master'],
    workflows: [
      {
        id: 'pm-1',
        name: 'Status update collection',
        description: 'Chasing team members for progress updates',
        avgHoursPerWeek: 3,
        strataLevel: 1,
        automationTools: ['Geekbot', 'Standuply', 'Range'],
        quickWin: 'Set up Geekbot for automated async standups in Slack'
      },
      {
        id: 'pm-2',
        name: 'Meeting notes and action items',
        description: 'Taking notes during meetings and tracking follow-ups',
        avgHoursPerWeek: 3,
        strataLevel: 2,
        automationTools: ['Otter.ai', 'Fathom', 'Fellow'],
        quickWin: 'Use Fellow to auto-capture action items and send reminders'
      },
      {
        id: 'pm-3',
        name: 'Project plan updates',
        description: 'Manually updating timelines and dependencies in PM tools',
        avgHoursPerWeek: 2,
        strataLevel: 2,
        automationTools: ['Monday.com automations', 'Asana rules'],
        quickWin: 'Set up automation rules to move tasks when status changes'
      },
      {
        id: 'pm-4',
        name: 'Client/stakeholder reporting',
        description: 'Creating status decks and reports for external stakeholders',
        avgHoursPerWeek: 3,
        strataLevel: 2,
        automationTools: ['Databox', 'Google Slides + Sheets'],
        quickWin: 'Create a template deck that pulls live data from your PM tool'
      },
      {
        id: 'pm-5',
        name: 'Risk assessment and mitigation',
        description: 'Identifying project risks and planning responses',
        avgHoursPerWeek: 2,
        strataLevel: 3,
        automationTools: [],
        quickWin: 'This requires your judgment - AI can help brainstorm but you decide'
      },
      {
        id: 'pm-6',
        name: 'Stakeholder communication',
        description: 'Managing expectations and navigating organizational dynamics',
        avgHoursPerWeek: 4,
        strataLevel: 3,
        automationTools: [],
        quickWin: 'Protect this time - it\'s where you add real value'
      }
    ]
  },
  {
    id: 'sales-manager',
    title: 'Sales / Account Manager',
    aliases: ['account executive', 'sales rep', 'bdm', 'business development', 'sales director'],
    workflows: [
      {
        id: 'sm-1',
        name: 'CRM data entry',
        description: 'Logging calls, meetings, and notes into CRM after interactions',
        avgHoursPerWeek: 4,
        strataLevel: 1,
        automationTools: ['Gong', 'Chorus', 'Salesforce automation'],
        quickWin: 'Use Gong to auto-log call summaries directly to CRM'
      },
      {
        id: 'sm-2',
        name: 'Prospect research',
        description: 'Researching companies and contacts before outreach',
        avgHoursPerWeek: 3,
        strataLevel: 2,
        automationTools: ['Apollo', 'ZoomInfo', 'LinkedIn Sales Navigator'],
        quickWin: 'Use Apollo to auto-enrich prospect data'
      },
      {
        id: 'sm-3',
        name: 'Email sequence follow-ups',
        description: 'Sending follow-up emails manually to prospects',
        avgHoursPerWeek: 3,
        strataLevel: 1,
        automationTools: ['Outreach', 'Salesloft', 'Apollo sequences'],
        quickWin: 'Build a 5-touch email sequence in your sales engagement tool'
      },
      {
        id: 'sm-4',
        name: 'Proposal/quote creation',
        description: 'Building custom proposals and quotes for prospects',
        avgHoursPerWeek: 3,
        strataLevel: 2,
        automationTools: ['PandaDoc', 'Proposify', 'Qwilr'],
        quickWin: 'Create reusable proposal templates in PandaDoc'
      },
      {
        id: 'sm-5',
        name: 'Deal negotiation',
        description: 'Negotiating terms and closing deals',
        avgHoursPerWeek: 4,
        strataLevel: 3,
        automationTools: [],
        quickWin: 'This is high-value human work - protect it'
      },
      {
        id: 'sm-6',
        name: 'Relationship building',
        description: 'Building trust and rapport with key accounts',
        avgHoursPerWeek: 5,
        strataLevel: 3,
        automationTools: [],
        quickWin: 'Your relationships are your competitive advantage'
      }
    ]
  },
  {
    id: 'hr-manager',
    title: 'HR / People Operations Manager',
    aliases: ['people ops', 'hr director', 'talent manager', 'hr business partner'],
    workflows: [
      {
        id: 'hr-1',
        name: 'Resume screening',
        description: 'Reviewing resumes to identify qualified candidates',
        avgHoursPerWeek: 4,
        strataLevel: 2,
        automationTools: ['Greenhouse AI', 'Lever', 'HireEZ'],
        quickWin: 'Use your ATS auto-screening features with knockout questions'
      },
      {
        id: 'hr-2',
        name: 'Interview scheduling',
        description: 'Coordinating interview times between candidates and interviewers',
        avgHoursPerWeek: 3,
        strataLevel: 1,
        automationTools: ['GoodTime', 'Calendly', 'ModernLoop'],
        quickWin: 'Use GoodTime for automated interview scheduling'
      },
      {
        id: 'hr-3',
        name: 'Onboarding paperwork',
        description: 'Collecting and processing new hire documents',
        avgHoursPerWeek: 2,
        strataLevel: 1,
        automationTools: ['Rippling', 'BambooHR', 'Gusto'],
        quickWin: 'Use Rippling for automated new hire document collection'
      },
      {
        id: 'hr-4',
        name: 'PTO tracking and approvals',
        description: 'Managing time-off requests and balances',
        avgHoursPerWeek: 2,
        strataLevel: 1,
        automationTools: ['BambooHR', 'Gusto', 'Rippling'],
        quickWin: 'Enable self-service PTO requests in your HRIS'
      },
      {
        id: 'hr-5',
        name: 'Employee relations',
        description: 'Handling sensitive employee issues and conflicts',
        avgHoursPerWeek: 4,
        strataLevel: 3,
        automationTools: [],
        quickWin: 'This requires human judgment and empathy'
      },
      {
        id: 'hr-6',
        name: 'Culture and engagement initiatives',
        description: 'Planning and executing programs to improve employee experience',
        avgHoursPerWeek: 3,
        strataLevel: 3,
        automationTools: [],
        quickWin: 'AI can help with ideas, but execution needs your human touch'
      }
    ]
  },
  {
    id: 'finance-accounting',
    title: 'Finance / Accounting Manager',
    aliases: ['accountant', 'controller', 'finance manager', 'bookkeeper', 'finance director'],
    workflows: [
      {
        id: 'fa-1',
        name: 'Invoice data entry',
        description: 'Manually entering invoice details into accounting software',
        avgHoursPerWeek: 4,
        strataLevel: 1,
        automationTools: ['Dext', 'Hubdoc', 'Bill.com'],
        quickWin: 'Use Dext to auto-capture and categorize invoices from email'
      },
      {
        id: 'fa-2',
        name: 'Bank reconciliation',
        description: 'Matching transactions between bank and accounting system',
        avgHoursPerWeek: 3,
        strataLevel: 1,
        automationTools: ['QuickBooks bank feeds', 'Xero'],
        quickWin: 'Set up bank rules to auto-categorize recurring transactions'
      },
      {
        id: 'fa-3',
        name: 'Expense categorization',
        description: 'Reviewing and categorizing employee expenses',
        avgHoursPerWeek: 2,
        strataLevel: 1,
        automationTools: ['Ramp', 'Brex', 'Expensify'],
        quickWin: 'Use Ramp for real-time expense categorization with AI'
      },
      {
        id: 'fa-4',
        name: 'Financial report generation',
        description: 'Creating monthly/quarterly financial reports',
        avgHoursPerWeek: 4,
        strataLevel: 2,
        automationTools: ['Mosaic', 'Jirav', 'Fathom'],
        quickWin: 'Build Excel templates with dynamic data connections'
      },
      {
        id: 'fa-5',
        name: 'Budget variance analysis',
        description: 'Comparing actuals to budget and investigating differences',
        avgHoursPerWeek: 3,
        strataLevel: 2,
        automationTools: ['Mosaic', 'Datarails', 'Cube'],
        quickWin: 'Set up automated variance alerts for significant deviations'
      },
      {
        id: 'fa-6',
        name: 'Strategic financial planning',
        description: 'Forecasting, scenario planning, and advising leadership',
        avgHoursPerWeek: 4,
        strataLevel: 3,
        automationTools: [],
        quickWin: 'This is where you add strategic value - protect it'
      }
    ]
  }
]

export function findRoleByTitle(title: string): RoleProfile | undefined {
  const normalizedTitle = title.toLowerCase().trim()
  
  return roleProfiles.find(role => 
    role.title.toLowerCase() === normalizedTitle ||
    role.aliases.some(alias => normalizedTitle.includes(alias))
  )
}

export function calculateRoleSavings(role: RoleProfile, hourlyRate: number = 50): number {
  const weeksPerYear = 50
  const totalHoursPerWeek = role.workflows
    .filter(w => w.strataLevel <= 2)
    .reduce((sum, w) => sum + w.avgHoursPerWeek, 0)
  
  return totalHoursPerWeek * hourlyRate * weeksPerYear
}
