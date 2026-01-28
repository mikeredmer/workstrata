# WorkStrata - AI-Powered Work Mapping Tool

WorkStrata is a self-serve SaaS platform that conducts AI-powered interviews with knowledge workers to map their actual work functions, classify tasks by cognitive complexity using the Work Stratum framework, and deliver personalized AI automation roadmaps.

## Features

- **AI-Powered Interview**: Conversational interface that extracts specific work functions and tasks
- **Work Stratum Classification**: Categorizes work by complexity (Stratum I, II, III+)
- **Automation Recommendations**: Specific suggestions for what to automate, AI-assist, or keep human
- **Visual Work Profile**: Shareable one-page summary of work complexity and automation potential
- **Implementation Roadmap**: Prioritized list of automation opportunities

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **AI**: Claude API (Anthropic)
- **Auth**: Supabase Auth
- **Deployment**: Vercel

## Setup

1. **Clone and Install**:
   ```bash
   git clone <repository>
   cd workstrata
   npm install
   ```

2. **Environment Variables**:
   ```bash
   cp .env.example .env.local
   ```
   Fill in:
   - `ANTHROPIC_API_KEY`: Your Anthropic API key for Claude
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key

3. **Database Setup**:
   Create tables in Supabase:
   ```sql
   -- Users table (handled by Supabase Auth)
   
   -- Work profiles
   CREATE TABLE work_profiles (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
     version INTEGER DEFAULT 1,
     job_title TEXT,
     org_name TEXT,
     org_size TEXT,
     reporting_level TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
     raw_interview_transcript JSONB,
     status TEXT CHECK (status IN ('in_progress', 'complete')) DEFAULT 'in_progress'
   );
   
   -- Functions (responsibility areas)
   CREATE TABLE functions (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     work_profile_id UUID REFERENCES work_profiles(id) ON DELETE CASCADE,
     name TEXT NOT NULL,
     description TEXT,
     estimated_hours_per_week NUMERIC DEFAULT 0,
     sort_order INTEGER DEFAULT 0
   );
   
   -- Tasks
   CREATE TABLE tasks (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     function_id UUID REFERENCES functions(id) ON DELETE CASCADE,
     name TEXT NOT NULL,
     description TEXT,
     estimated_hours_per_week NUMERIC DEFAULT 0,
     stratum TEXT CHECK (stratum IN ('I', 'II', 'III', 'IV')),
     automation_recommendation TEXT CHECK (automation_recommendation IN ('automate', 'assist', 'human')),
     suggested_tools JSONB DEFAULT '[]',
     implementation_effort TEXT CHECK (implementation_effort IN ('low', 'medium', 'high')),
     risk_level TEXT CHECK (risk_level IN ('low', 'medium', 'high')),
     oversight_required TEXT CHECK (oversight_required IN ('none', 'spot_check', 'review_all', 'human_in_loop')),
     time_horizon TEXT CHECK (time_horizon IN ('days', 'weeks', 'months', 'years')),
     judgment_level TEXT CHECK (judgment_level IN ('low', 'moderate', 'high')),
     consequence_severity TEXT CHECK (consequence_severity IN ('low', 'moderate', 'high')),
     sort_order INTEGER DEFAULT 0
   );
   
   -- Interview sessions
   CREATE TABLE interview_sessions (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     work_profile_id UUID REFERENCES work_profiles(id) ON DELETE CASCADE,
     messages JSONB DEFAULT '[]',
     current_phase INTEGER DEFAULT 1,
     started_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
     completed_at TIMESTAMP WITH TIME ZONE
   );
   
   -- Row Level Security
   ALTER TABLE work_profiles ENABLE ROW LEVEL SECURITY;
   ALTER TABLE functions ENABLE ROW LEVEL SECURITY;
   ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
   ALTER TABLE interview_sessions ENABLE ROW LEVEL SECURITY;
   
   -- Policies
   CREATE POLICY "Users can view own work profiles" ON work_profiles FOR SELECT USING (auth.uid() = user_id);
   CREATE POLICY "Users can insert own work profiles" ON work_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
   CREATE POLICY "Users can update own work profiles" ON work_profiles FOR UPDATE USING (auth.uid() = user_id);
   
   CREATE POLICY "Users can view own functions" ON functions FOR SELECT USING (
     EXISTS (SELECT 1 FROM work_profiles WHERE id = work_profile_id AND user_id = auth.uid())
   );
   CREATE POLICY "Users can insert own functions" ON functions FOR INSERT WITH CHECK (
     EXISTS (SELECT 1 FROM work_profiles WHERE id = work_profile_id AND user_id = auth.uid())
   );
   
   CREATE POLICY "Users can view own tasks" ON tasks FOR SELECT USING (
     EXISTS (
       SELECT 1 FROM functions f 
       JOIN work_profiles wp ON f.work_profile_id = wp.id 
       WHERE f.id = function_id AND wp.user_id = auth.uid()
     )
   );
   CREATE POLICY "Users can insert own tasks" ON tasks FOR INSERT WITH CHECK (
     EXISTS (
       SELECT 1 FROM functions f 
       JOIN work_profiles wp ON f.work_profile_id = wp.id 
       WHERE f.id = function_id AND wp.user_id = auth.uid()
     )
   );
   ```

4. **Run Development Server**:
   ```bash
   npm run dev
   ```

## Usage

1. **Sign Up/Login**: Create an account or sign in
2. **Start Interview**: Begin the AI-powered work mapping interview
3. **Complete Interview**: Answer questions about your role, responsibilities, and tasks
4. **View Results**: See your Work Complexity Profile and automation recommendations
5. **Export/Share**: Download or share your results

## Interview Flow

The AI interview follows these phases:
1. **Context Setting**: Role, organization, reporting structure
2. **Responsibility Mapping**: Major areas of responsibility
3. **Task Extraction**: Specific tasks and their characteristics
4. **Tool Inventory**: Current tools and systems used
5. **Confirmation**: Review and validate extracted data
6. **Aspiration**: Goals and preferences for automation

## Work Stratum Framework

- **Stratum I**: Routine/procedural work (days-weeks horizon, minimal judgment) - Usually automatable
- **Stratum II**: Diagnostic/analytical work (weeks-months horizon, moderate judgment) - AI-assisted
- **Stratum III+**: Strategic/integrative work (months-years horizon, high judgment) - Human-required

## API Endpoints

- `POST /api/interview` - Streaming AI interview conversation
- `POST /api/classify` - Classify interview results into structured work data

## Environment Variables

- `ANTHROPIC_API_KEY` - Required for AI interviews
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.