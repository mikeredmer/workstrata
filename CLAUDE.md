# CLAUDE.md — WorkStrata Project Context

> AI context file for Claude sessions working on the WorkStrata codebase.

## What is WorkStrata?

WorkStrata is a self-serve SaaS tool that interviews knowledge workers about their actual work (not just job titles), classifies tasks by cognitive complexity using a "Work Strata" framework, and delivers personalized AI automation roadmaps. It shows users exactly what to automate, what to augment with AI, and what must stay human.

**Core value proposition:** "Find the 10+ hours you're losing to work AI should handle"

**Target user (ICP):**
- Mid-level managers / senior ICs
- Functions: Operations, Marketing, PM, Finance, Sales, HR
- Company size: 50-500 employees
- Pain: Knows AI can help, overwhelmed by options, no employer guidance
- Budget: Can expense $29/mo without approval

## Tech Stack

- **Framework:** Next.js 16 with App Router
- **React:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Auth:** Supabase SSR (magic link email, no OAuth)
- **Database:** Supabase PostgreSQL
- **AI:** Anthropic Claude API (claude-sonnet-4-20250514)
- **Deployment:** Vercel
- **Domain:** workstrata.ai (landing) / workstrata.vercel.app (app)

## URLs & Resources

| Resource | URL |
|----------|-----|
| Production | https://workstrata.ai |
| App | https://workstrata.vercel.app |
| GitHub | github.com/mikeredmer/workstrata |
| Supabase Project | koirfqomfjgetgjjavgn |

## Project Structure

\`\`\`
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Landing/home page
│   ├── auth/
│   │   ├── login/         # Login page
│   │   └── signup/        # Signup page
│   ├── dashboard/
│   │   ├── page.tsx       # Dashboard home (list assessments)
│   │   ├── layout.tsx     # Dashboard layout with nav
│   │   ├── interview/     # AI interview flow
│   │   │   └── page.tsx   # Interview page with ChatInterface
│   │   └── results/
│   │       └── [id]/      # Assessment results page
│   ├── capture/           # Quick capture flow
│   ├── error.tsx          # Error boundary
│   └── global-error.tsx   # Global error boundary
│
├── api/                    # API routes
│   ├── interview/         # Claude streaming interview
│   │   └── route.ts       # POST handler for interview
│   └── classify/          # Classification endpoint
│       └── route.ts       # Task classification
│
├── components/
│   ├── ChatInterface.tsx  # AI interview chat component
│   └── ...
│
├── contexts/
│   └── AuthContext.tsx    # Auth state management (useAuth hook)
│
├── lib/
│   ├── supabase-browser.ts  # Client-side Supabase
│   ├── supabase-server.ts   # Server-side Supabase
│   ├── classification.ts    # Classification helpers
│   │   └── getHumanLabel()  # Converts S1/S2/S3 → user labels
│   │   └── calculateDollarValue()  # ROI calculations
│   ├── role-workflows.ts    # Role-based workflow library
│   └── tools.ts             # Tool recommendation database
│
├── types/
│   └── assessment.ts        # TypeScript interfaces
│
└── data/
    └── role-workflows.ts    # Workflow definitions by role
\`\`\`

## Key Concepts

### Work Strata (Complexity Levels)

The core framework classifies work by cognitive complexity:

| Internal | User-Facing Label | Meaning |
|----------|------------------|---------|
| Stratum I | 🤖 "AI Handles It" | Routine, fully automatable |
| Stratum II | 🤝 "AI + You" | AI assists, human reviews |
| Stratum III+ | 🧠 "You Decide" | Requires human judgment |

**Never expose "Stratum" jargon to users** — use the human-readable labels.

### Progressive Value Model

Three levels of assessment depth:
1. **Level 1** (30 sec): Job title only → role-based workflows → instant value
2. **Level 2** (2 min): + Tools selected → specific integration recommendations  
3. **Level 3** (5 min): + Custom workflow description → step-by-step implementation

Each level delivers complete value AND teases the next level.

## Database Schema

Key tables in Supabase:

\`\`\`sql
-- User work profiles (assessments)
work_profiles (
  id uuid PRIMARY KEY,
  user_id uuid REFERENCES auth.users,
  job_title text,
  org_name text,
  status text,  -- 'in_progress' | 'complete'
  created_at timestamp
)

-- Interview messages
interview_messages (
  id uuid PRIMARY KEY,
  profile_id uuid REFERENCES work_profiles,
  role text,  -- 'user' | 'assistant'
  content text,
  created_at timestamp
)

-- Classified tasks
tasks (
  id uuid PRIMARY KEY,
  profile_id uuid REFERENCES work_profiles,
  name text,
  description text,
  hours_per_week decimal,
  stratum text,  -- 'stratum_i' | 'stratum_ii' | 'stratum_iii_plus'
  automation_recommendation text,
  suggested_tools text[],
  created_at timestamp
)

-- Waitlist (landing page)
waitlist (
  id uuid PRIMARY KEY,
  email text UNIQUE,
  created_at timestamp
)
\`\`\`

## How to Make Common Changes

### Add a New Role to role-workflows.ts

The role-workflows file contains pre-defined workflows for each role. To add a new role:

\`\`\`typescript
// In src/lib/role-workflows.ts or src/data/role-workflows.ts

export const roleWorkflows: Record<string, RoleWorkflow[]> = {
  // Existing roles: marketing, operations, pm, finance, sales, hr
  
  // Add new role:
  "customer_success": [
    {
      name: "Customer Onboarding",
      description: "Guide new customers through product setup",
      hours_per_week: 8,
      stratum: "stratum_ii",
      automation_category: "ai_assisted",
      suggested_tools: ["Intercom", "Loom", "Notion"],
      quick_wins: ["Automated onboarding email sequences", "Self-serve knowledge base"]
    },
    // ... more workflows
  ]
};
\`\`\`

Each workflow needs:
- \`name\`: Short workflow name
- \`description\`: What this workflow involves
- \`hours_per_week\`: Typical time spent
- \`stratum\`: Complexity level (\`stratum_i\`, \`stratum_ii\`, \`stratum_iii_plus\`)
- \`automation_category\`: How automatable (\`fully_automatable\`, \`ai_assisted\`, \`human_required\`)
- \`suggested_tools\`: Array of specific tool names
- \`quick_wins\`: Array of actionable automation suggestions

### Add a New Tool to the Tool Library

\`\`\`typescript
// In src/lib/tools.ts

export const toolLibrary: Tool[] = [
  {
    name: "Notion",
    category: "documentation",
    integrations: ["Slack", "Zapier", "Make"],
    native_ai: true,
    pricing: "Free - $10/user/mo",
    url: "https://notion.so"
  },
  // Add new tool:
  {
    name: "Linear",
    category: "project_management", 
    integrations: ["Slack", "GitHub", "Figma"],
    native_ai: true,
    pricing: "Free - $8/user/mo",
    url: "https://linear.app"
  }
];
\`\`\`

### Modify the Interview Flow

The interview uses Claude API streaming. Key file: \`src/api/interview/route.ts\`

The interview follows phases:
1. Context Setting (role, org, responsibilities)
2. Responsibility Mapping (major work buckets)
3. Task-Level Extraction (specific tasks per bucket)
4. Tool & System Inventory
5. Confirmation & Refinement
6. Aspiration & Priorities

To modify interview prompts, edit the system prompt in the route handler.

### Update Classification Logic

Classification happens in \`src/api/classify/route.ts\` and \`src/lib/classification.ts\`.

The \`ClassificationResult\` interface (in \`src/types/assessment.ts\`) should have this structure:

\`\`\`typescript
export interface ClassificationResult {
  functions: Array<{
    name: string;
    description: string;
    tasks: Array<{
      name: string;
      description: string;
      hours_per_week: number;
      stratum: WorkStratum;
      automation_recommendation: AutomationRecommendation;
      ai_role_recommendation: string;
      automation_category: string;
      suggested_tools: string[];
      rationale: string;
    }>;
  }>;
  summary: {
    stratum_distribution: {
      stratum_i_hours: number;
      stratum_ii_hours: number;
      stratum_iii_plus_hours: number;
    };
    automation_potential: {
      fully_automatable_hours: number;
      ai_assisted_hours: number;
      human_required_hours: number;
    };
    total_weekly_hours: number;
    top_quick_wins: Array<{
      task: string;
      hours_saved: number;
      implementation_effort: 'low' | 'medium' | 'high';
    }>;
  };
}
\`\`\`

### Add Dollar Value Calculations

Use the helper in \`src/lib/classification.ts\`:

\`\`\`typescript
import { calculateDollarValue } from '@/lib/classification';

// Calculate annual savings from automated hours
const annualSavings = calculateDollarValue(hoursPerWeek, hourlyRate);
\`\`\`

### Update Auth Flow

Auth uses Supabase with the \`useAuth\` hook from \`AuthContext\`:

\`\`\`typescript
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { user, loading, signOut } = useAuth();
  
  // user is null if not logged in
  // loading is true during auth check
}
\`\`\`

For sign out, call:
\`\`\`typescript
await signOut();
router.push('/auth/login');
\`\`\`

## Environment Variables

Required in \`.env.local\`:

\`\`\`bash
ANTHROPIC_API_KEY=sk-ant-...
NEXT_PUBLIC_SUPABASE_URL=https://koirfqomfjgetgjjavgn.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
\`\`\`

## Build & Deploy

\`\`\`bash
# Install dependencies
npm install

# Run locally
npm run dev

# Build for production
npm run build

# Deploy to Vercel
npx vercel --prod --yes
\`\`\`

## Common Issues

### "Load failed" on login (Safari)
Network timeout issue. Handled by error boundaries in \`error.tsx\` and \`global-error.tsx\`.

### Dashboard infinite spinner
Check try/catch/finally in data fetching. Ensure \`setLoading(false)\` runs even on error.

### Type mismatch in ClassificationResult
The API returns \`functions\` containing \`tasks\`, not top-level \`tasks\`. Ensure types match.

### Sign Out doesn't work
Make sure the button calls \`signOut()\` from useAuth:
\`\`\`tsx
<button onClick={async () => { await signOut(); router.push('/auth/login') }}>
  Sign Out
</button>
\`\`\`

## Design Principles

1. **Empowering, not anxious**: Never frame as "will AI take your job?" Instead: "Find where AI saves you time."
2. **Specific, not generic**: Give exact tool names, pricing, setup steps.
3. **Progressive value**: Each interaction level delivers complete value.
4. **User-facing labels**: No jargon. "AI Handles It" not "Stratum I".
5. **Screenshot-worthy outputs**: Results should be shareable on LinkedIn.

## Mike's Preferences

- Drive the project — Mike helps but AI owns execution
- Do full QA before handoff — test all flows before asking for review
- Never ask Mike to do something AI can do itself
- Commit frequently, push before ending sessions
- Project docs live in: \`~/Obsidian/Workshop/2. Areas/W-WorkStrata/\`

---

*Last updated: January 2026*
