# Experiment Library

A collection of 42 applied experiments to build your AI skills using real work tasks. Each experiment takes 10-15 minutes and uses tasks you're already doing.

---

## Skill 1: Context Assembly
*Knowing what information to provide AI and why*

### Experiment 1.1: The Before/After Email (Beginner)
**Time:** 10 minutes  
**What you'll do:** Take a recent AI prompt that gave mediocre results. Apply the context formula.

**Steps:**
1. Find a prompt you sent to AI in the last week that required multiple follow-ups
2. Write down what was missing: Background? Constraints? Examples? Audience?
3. Rewrite the prompt adding: WHO this is for, WHAT you need, WHY it matters, and HOW you want it formatted
4. Run both prompts and compare outputs side-by-side

**Success looks like:** The second output requires zero or one follow-up instead of three+

**Reflection:** Which piece of context made the biggest difference? (Usually it's audience or constraints)

---

### Experiment 1.2: The Stakeholder Translator (Beginner)
**Time:** 10 minutes  
**What you'll do:** Write the same message for two different audiences using context switching.

**Steps:**
1. Pick a work update you need to share (project status, decision, announcement)
2. Prompt AI: "Write this update for [Audience A]" with minimal context
3. Note what's wrong or generic about the output
4. Reprompt with: "[Audience A] cares about X, uses terminology Y, prefers Z format, and needs to know this because..."
5. Repeat for Audience B (e.g., executives vs. technical team)

**Success looks like:** Each version sounds like it was written BY that audience, not just TO them

**Reflection:** What did you know about each audience that you hadn't thought to include?

---

### Experiment 1.3: The Example Injection (Beginner)
**Time:** 10 minutes  
**What you'll do:** Transform vague output into on-brand output using examples.

**Steps:**
1. Find a piece of writing you love from your company (email, doc, Slack message)
2. Ask AI to write something new in that same category WITHOUT the example
3. Now include the example with: "Match this style and tone: [paste example]"
4. Compare the two outputs

**Success looks like:** The second output sounds like it came from your organization

**Reflection:** What specific elements did the AI pick up from your example? (Sentence length? Vocabulary? Structure?)

---

### Experiment 1.4: The Constraint Stack (Intermediate)
**Time:** 12 minutes  
**What you'll do:** Discover how adding constraints improves output quality.

**Steps:**
1. Ask AI to write a one-paragraph summary of a project or topic
2. Note what's wrong (too long, too formal, missing key points, etc.)
3. Add constraints one at a time, regenerating after each:
   - Word limit (e.g., "under 75 words")
   - Tone (e.g., "conversational but professional")
   - Must-include (e.g., "must mention the deadline and budget impact")
   - Must-exclude (e.g., "no jargon, no acronyms")
4. Track which constraint caused the biggest improvement

**Success looks like:** You identify your "power constraints" — the 2-3 that always make output better

**Reflection:** Which constraints do you now want to include by default in similar prompts?

---

### Experiment 1.5: The Expertise Transfer (Intermediate)
**Time:** 15 minutes  
**What you'll do:** Teach AI your domain expertise to get expert-level output.

**Steps:**
1. Identify something you know deeply that AI probably doesn't (your industry's nuances, your company's approach, your team's preferences)
2. Ask AI a question in this domain and note where it's wrong or generic
3. Write a "briefing" paragraph: key terms, common misconceptions, what matters in your context
4. Prepend this briefing to your question and regenerate
5. Evaluate: Does it now sound like a knowledgeable colleague?

**Success looks like:** Output reflects understanding you had to explicitly teach

**Reflection:** What expertise do you have that you've been assuming AI already knows?

---

### Experiment 1.6: The Context Archaeology (Advanced)
**Time:** 15 minutes  
**What you'll do:** Reverse-engineer what context would have prevented a past AI failure.

**Steps:**
1. Find an AI output you had to heavily edit or completely rewrite
2. List every change you made
3. For each change, identify what context would have prevented it:
   - Wrong tone → needed audience description
   - Missing info → needed background
   - Wrong format → needed example or template
   - Incorrect assumption → needed explicit constraint
4. Write the "perfect prompt" that would have gotten it right the first time
5. Test your perfect prompt on a similar task

**Success looks like:** You create a reusable prompt template for this task type

**Reflection:** What's the ratio of context-to-request in your "perfect prompt"? (Often 3:1 or higher)

---

### Experiment 1.7: The Living Brief (Advanced)
**Time:** 15 minutes  
**What you'll do:** Create a reusable context document for a recurring task.

**Steps:**
1. Identify a task you do weekly (status updates, meeting summaries, client emails)
2. Write a comprehensive context brief including:
   - Your role and the task's purpose
   - Audience and their needs
   - Style examples (paste 2-3 good ones)
   - Common constraints and requirements
   - Typical mistakes to avoid
3. Test the brief with this week's instance of the task
4. Refine based on what's missing
5. Save as a template for future use

**Success looks like:** The brief produces 80%+ usable output on first try for this recurring task

**Reflection:** How much time will this template save you over the next month?

---

## Skill 2: Quality Judgment
*Knowing when to trust AI output vs. verify*

### Experiment 2.1: The Fact Check (Beginner)
**Time:** 10 minutes  
**What you'll do:** Verify AI-generated facts in a real work context.

**Steps:**
1. Ask AI to provide 5 facts about something relevant to your work (industry stats, historical context, technical specs)
2. Before accepting ANY fact, predict: "How confident am I this is accurate?" (High/Medium/Low)
3. Verify each fact using an authoritative source
4. Compare your predictions to reality

**Success looks like:** Your confidence predictions start matching actual accuracy

**Reflection:** What patterns do you notice? (e.g., recent stats are often wrong, definitions are usually right)

---

### Experiment 2.2: The Tone Audit (Beginner)
**Time:** 10 minutes  
**What you'll do:** Evaluate whether AI-written communication matches your intended tone.

**Steps:**
1. Have AI write a message for a real situation (email, Slack, etc.)
2. Before reading it fully, write down the tone you NEED (urgent? friendly? formal? apologetic?)
3. Read the AI output and highlight phrases that don't match your intended tone
4. Count: what percentage of sentences are "off"?
5. Decide: Edit, regenerate, or use as-is?

**Success looks like:** You develop quick intuition for when tone needs fixing

**Reflection:** What tone mistakes does AI make most often in your work context?

---

### Experiment 2.3: The Completeness Check (Beginner)
**Time:** 10 minutes  
**What you'll do:** Catch what AI leaves out.

**Steps:**
1. Give AI a real task: summarize a document, draft an email, outline a plan
2. Before reviewing output, list the 3-5 things that MUST be included
3. Check the output against your list
4. Note what's missing
5. Decide: Is this a critical omission or minor gap?

**Success looks like:** You automatically create a mental checklist before accepting output

**Reflection:** Does AI tend to miss the same types of things? (Usually: nuance, exceptions, your specific context)

---

### Experiment 2.4: The Hallucination Hunt (Intermediate)
**Time:** 15 minutes  
**What you'll do:** Intentionally probe AI's boundaries to understand where it fabricates.

**Steps:**
1. Ask AI about something specific to your work that has a verifiable answer (a process, a policy, a past event)
2. Note how confidently AI responds
3. Ask increasingly specific follow-up questions
4. Identify the point where AI starts making things up vs. admitting uncertainty
5. Verify at least one confident-sounding claim

**Success looks like:** You learn to recognize AI's "confident but wrong" voice

**Reflection:** What question types push AI into hallucination territory in your domain?

---

### Experiment 2.5: The Edit-Time Test (Intermediate)
**Time:** 12 minutes  
**What you'll do:** Measure the true cost of AI output by tracking edit time.

**Steps:**
1. Have AI generate something you'd normally write yourself (email, doc section, analysis)
2. Start a timer and edit the output until it's truly ready to use
3. Record the time
4. Estimate: How long would writing from scratch have taken?
5. Calculate: Net time saved (or lost)

**Success looks like:** You learn which task types actually save time with AI

**Reflection:** At what edit-time threshold does AI help become a hindrance?

---

### Experiment 2.6: The Second Opinion (Advanced)
**Time:** 15 minutes  
**What you'll do:** Use AI to check AI.

**Steps:**
1. Generate a substantive piece of work content (analysis, recommendation, summary)
2. In a new conversation, paste the output and ask: "What's wrong with this? What's missing? What claims should be verified?"
3. Compare AI's self-critique to your own assessment
4. Check: Did the second AI catch real issues? Miss obvious ones? Raise false concerns?
5. Develop your calibration: When is AI self-review useful?

**Success looks like:** You know when AI review adds value vs. just adding noise

**Reflection:** Is AI better at catching certain types of errors than others?

---

### Experiment 2.7: The Confidence Calibration (Advanced)
**Time:** 15 minutes  
**What you'll do:** Explicitly request and test AI's self-assessed confidence.

**Steps:**
1. Ask AI to complete a task AND rate its confidence in each part (1-10)
2. Review the output yourself, adding your own confidence ratings
3. Compare: Where does AI overestimate? Underestimate?
4. For low-confidence items (from either rater), verify or improve
5. Track: Is AI's self-assessment useful as a quality signal?

**Success looks like:** You learn to use AI's hedging language ("might," "could," "typically") as quality signals

**Reflection:** What patterns in AI confidence ratings actually predict accuracy?

---

## Skill 3: Task Decomposition
*Breaking work into AI-appropriate chunks*

### Experiment 3.1: The Single-Step Test (Beginner)
**Time:** 10 minutes  
**What you'll do:** Experience the difference between a compound task and a single task.

**Steps:**
1. Think of a work task that has multiple parts (e.g., "Write a proposal")
2. Ask AI to do the whole thing at once
3. Note what's wrong with the output
4. Now break it into single steps and do just the first one (e.g., "List the 5 key points this proposal needs to address")
5. Compare the quality of the single-step output

**Success looks like:** Single-step output is immediately usable; compound output needs major revision

**Reflection:** What's the maximum complexity a single prompt can handle well?

---

### Experiment 3.2: The Sequence Map (Beginner)
**Time:** 10 minutes  
**What you'll do:** Map a real task into an AI-friendly sequence.

**Steps:**
1. Pick a task you're working on this week
2. Write it as one big request (how you might naturally ask)
3. Now decompose it into 3-5 sequential steps
4. For each step, note: Does this need previous step's output? Can AI do this alone?
5. Identify which steps are "AI-ready" and which need human input first

**Success looks like:** You have a clear sequence where each step has defined inputs and outputs

**Reflection:** How many tasks that feel like "one thing" are actually 3-5 things?

---

### Experiment 3.3: The Parallel vs. Serial Test (Beginner)
**Time:** 10 minutes  
**What you'll do:** Identify which subtasks can run simultaneously.

**Steps:**
1. Take your decomposed task from 3.2 (or decompose a new one)
2. Draw dependencies: Which steps need which other steps' outputs?
3. Identify steps that have no dependencies on each other (can run in parallel)
4. Run parallel steps in separate AI conversations simultaneously
5. Combine the outputs

**Success looks like:** You complete a multi-part task faster by parallelizing

**Reflection:** What percentage of your task's steps were actually independent?

---

### Experiment 3.4: The Right-Size Test (Intermediate)
**Time:** 12 minutes  
**What you'll do:** Find the optimal chunk size for a specific task type.

**Steps:**
1. Take a meaty task (writing something 500+ words)
2. Try three approaches:
   - One big prompt for the whole thing
   - Break into 3 chunks
   - Break into 7+ small chunks
3. Complete the task all three ways (yes, this takes more than one experiment—do one approach now)
4. Compare: quality, edit time, coherence

**Success looks like:** You identify the "Goldilocks zone" for this task type

**Reflection:** What signals tell you a chunk is too big? Too small?

---

### Experiment 3.5: The Human-AI Handoff (Intermediate)
**Time:** 15 minutes  
**What you'll do:** Design a workflow with intentional handoff points.

**Steps:**
1. Take a complex task you're facing
2. Decompose into steps, then label each: "AI can do alone" / "Human decides" / "Human + AI together"
3. For "Human decides" steps, specify exactly what decision is needed
4. For "Human + AI" steps, specify what human provides vs. what AI provides
5. Execute the first two steps according to your design

**Success looks like:** You never ask AI to make decisions that require your judgment

**Reflection:** What decisions were you accidentally delegating to AI before?

---

### Experiment 3.6: The Recursive Decomposition (Advanced)
**Time:** 15 minutes  
**What you'll do:** Use AI to help decompose a complex task.

**Steps:**
1. Describe a large, complex task to AI (but don't ask it to DO the task)
2. Ask: "Break this into steps. For each step, tell me: input needed, output produced, whether AI or human should do it"
3. Review the decomposition—what did AI miss? What's out of order?
4. Refine the decomposition yourself
5. Use the refined plan to start the actual task

**Success looks like:** AI helps you think about the task, not just execute it

**Reflection:** Is AI better at decomposing certain types of tasks?

---

### Experiment 3.7: The Checkpoint Pattern (Advanced)
**Time:** 15 minutes  
**What you'll do:** Design built-in review points for a multi-step task.

**Steps:**
1. Take a task you'll complete over multiple prompts
2. Identify "checkpoint" moments—where you should review before continuing
3. Design what "good enough to continue" looks like at each checkpoint
4. Execute steps 1-2, apply your checkpoint criteria
5. Decide: continue, revise, or restart?

**Success looks like:** You catch problems early instead of at the end

**Reflection:** How much rework did the checkpoint system prevent?

---

## Skill 4: Iterative Refinement
*Moving from 70% to 95% through structured passes*

### Experiment 4.1: The Three-Pass Edit (Beginner)
**Time:** 10 minutes  
**What you'll do:** Apply a structured editing sequence to AI output.

**Steps:**
1. Generate a draft of something (email, doc, summary)
2. Pass 1 - Structure: Is the flow logical? Move things around if needed.
3. Pass 2 - Content: Is anything missing? Wrong? Add or fix.
4. Pass 3 - Polish: Is the language right? Tighten, clarify, adjust tone.
5. Compare your starting draft to final version

**Success looks like:** Each pass addresses a different layer without getting distracted

**Reflection:** Which pass found the most issues?

---

### Experiment 4.2: The Targeted Revision (Beginner)
**Time:** 10 minutes  
**What you'll do:** Request specific, focused improvements instead of general "make it better."

**Steps:**
1. Generate a first draft with AI
2. Identify the ONE thing most wrong with it
3. Ask for a revision targeting only that: "Revise this to be more [specific thing]. Keep everything else the same."
4. Repeat for the next most important issue
5. Compare: Draft 1 → Draft 2 → Draft 3

**Success looks like:** Each revision makes one thing clearly better without breaking other things

**Reflection:** What's the maximum number of changes you can request at once before quality suffers?

---

### Experiment 4.3: The Comparison Test (Beginner)
**Time:** 10 minutes  
**What you'll do:** Generate alternatives and pick the best.

**Steps:**
1. Request the same thing three different ways:
   - Standard prompt
   - Same prompt + "Give me 3 options"
   - Same prompt with a different angle/approach
2. Compare all outputs (likely 5-7 total versions)
3. Pick the best version (or best parts of each)
4. Note what made the winner better

**Success looks like:** You find a version significantly better than your first output

**Reflection:** Is generating alternatives faster than iterating on one version?

---

### Experiment 4.4: The Critique-Then-Revise Loop (Intermediate)
**Time:** 12 minutes  
**What you'll do:** Use explicit critique as a bridge between drafts.

**Steps:**
1. Generate a first draft
2. Ask AI: "What are the three biggest weaknesses of this draft?"
3. Ask AI: "Now revise the draft to address those three weaknesses"
4. Evaluate: Did the revision actually fix the issues?
5. If needed, add your own critique and request another revision

**Success looks like:** Explicit critique produces better revisions than "make it better"

**Reflection:** Are AI self-critiques usually accurate? Too harsh? Too gentle?

---

### Experiment 4.5: The Reference Comparison (Intermediate)
**Time:** 15 minutes  
**What you'll do:** Use a gold-standard example to guide improvement.

**Steps:**
1. Generate a first draft
2. Find an excellent example of what you're creating (your own past work, or a model you admire)
3. Ask AI: "Compare my draft to this example. What specific changes would make my draft as good?"
4. Apply the suggested changes (via AI or manually)
5. Evaluate: How close is your output to the reference quality?

**Success looks like:** Reference comparison produces more specific, actionable feedback than generic critique

**Reflection:** What examples should you keep handy for different content types?

---

### Experiment 4.6: The Constraint Tightening (Advanced)
**Time:** 15 minutes  
**What you'll do:** Improve output by progressively adding constraints.

**Steps:**
1. Generate a first draft with minimal constraints
2. Evaluate what's wrong
3. Add constraints that would fix the issues (word limit, required elements, forbidden phrases, etc.)
4. Regenerate
5. Repeat: evaluate → constrain → regenerate until satisfied
6. Document the final constraint set for future use

**Success looks like:** You develop a reusable "constraint recipe" for this content type

**Reflection:** At what point do additional constraints stop helping?

---

### Experiment 4.7: The Hybrid Merge (Advanced)
**Time:** 15 minutes  
**What you'll do:** Combine AI iteration with human intervention at key moments.

**Steps:**
1. Generate a first draft
2. Make 2-3 key changes yourself (the things only you can improve)
3. Ask AI to improve everything EXCEPT the parts you edited: "Improve this draft, but don't change [specific sections]"
4. Review the AI improvements to your unchanged sections
5. Make final human pass

**Success looks like:** AI and human improvements complement each other without conflict

**Reflection:** What types of improvements are you better at? What types is AI better at?

---

## Skill 5: Workflow Integration
*Embedding AI into how work actually gets done*

### Experiment 5.1: The Daily Touch Point (Beginner)
**Time:** 10 minutes  
**What you'll do:** Identify one daily task that could involve AI.

**Steps:**
1. List 5 things you do every work day
2. Pick the one that's most repetitive and time-consuming
3. Try using AI for today's instance of that task
4. Time yourself: AI-assisted vs. your typical time
5. Evaluate: Is this worth doing regularly?

**Success looks like:** You find one task worth making an AI habit

**Reflection:** What made this work (or not work) for daily use?

---

### Experiment 5.2: The Template Automation (Beginner)
**Time:** 12 minutes  
**What you'll do:** Create a reusable AI prompt template for a recurring task.

**Steps:**
1. Identify a task you do at least weekly (status updates, meeting notes, emails to specific groups)
2. Create a prompt template with blanks: "Given [CONTEXT], write [OUTPUT TYPE] that includes [REQUIREMENTS]"
3. Fill in the template for this week's instance
4. Save the template somewhere you'll find it (notes, doc, email draft)
5. Use it again next time this task comes up

**Success looks like:** Template saves you from starting from scratch each time

**Reflection:** How many of your regular tasks could have templates?

---

### Experiment 5.3: The Pre-Meeting Prep (Beginner)
**Time:** 10 minutes  
**What you'll do:** Use AI to prepare for a real upcoming meeting.

**Steps:**
1. Pick a meeting on your calendar for today or tomorrow
2. Give AI the context: meeting topic, attendees, your goals
3. Ask for: likely questions you'll face, points you should raise, potential objections
4. Review and add your own items
5. After the meeting: What did the prep help with? What did it miss?

**Success looks like:** You feel more prepared and the prep was faster than doing it yourself

**Reflection:** What meeting types benefit most from AI prep?

---

### Experiment 5.4: The Intake Processor (Intermediate)
**Time:** 15 minutes  
**What you'll do:** Use AI to process incoming information faster.

**Steps:**
1. Find a piece of incoming content you need to process (email thread, document, Slack discussion)
2. Define what you need to extract: key points, action items, decisions, questions
3. Paste content and request your specific extraction
4. Verify accuracy of the extraction
5. Use the processed version for whatever you needed the content for

**Success looks like:** You get through the content faster without missing important things

**Reflection:** What types of incoming content are best suited for AI processing?

---

### Experiment 5.5: The Handoff Document (Intermediate)
**Time:** 15 minutes  
**What you'll do:** Create a mid-task handoff to AI for continuation.

**Steps:**
1. Take a task you've partially completed
2. Document its current state for AI: what's done, what's next, relevant context
3. Ask AI to continue from where you left off
4. Evaluate: Did AI pick up the thread accurately?
5. What additional context would have helped the handoff?

**Success looks like:** You can "pause and hand off" work mid-stream without losing momentum

**Reflection:** What makes a good "state save" for AI continuation?

---

### Experiment 5.6: The Workflow Audit (Advanced)
**Time:** 15 minutes  
**What you'll do:** Map an entire workflow to find AI integration points.

**Steps:**
1. Pick a workflow you do regularly (client onboarding, project kickoff, report creation)
2. Map every step, including small ones
3. For each step, categorize: AI does alone / AI assists human / Human only
4. Identify the 3 highest-impact steps to AI-enable
5. Create a brief plan: How will you integrate AI into those 3 steps?

**Success looks like:** You have a concrete plan to transform a workflow, not just individual tasks

**Reflection:** What percentage of your workflow steps could involve AI?

---

### Experiment 5.7: The Trigger System (Advanced)
**Time:** 15 minutes  
**What you'll do:** Define specific triggers for when to use AI.

**Steps:**
1. List 5 situations where you SHOULD use AI (but often forget)
2. Define a clear trigger for each: "When X happens, I will use AI for Y"
3. Write these down somewhere visible
4. Over the next day, notice when triggers occur
5. Track: Did you actually use AI when triggered?

**Success looks like:** AI use becomes automatic at the right moments, not just when you remember

**Reflection:** What stops you from using AI even when you know it would help?

---

## Skill 6: Frontier Recognition
*Knowing what AI can and can't do today*

### Experiment 6.1: The Capability Probe (Beginner)
**Time:** 10 minutes  
**What you'll do:** Test AI boundaries in a low-stakes way.

**Steps:**
1. Think of something you assume AI CAN'T do well in your work
2. Actually try it—give AI a real example of that task
3. Evaluate the output honestly: Was it as bad as you expected? Worse? Better?
4. Think of something you assume AI CAN do well
5. Test that assumption too

**Success looks like:** At least one assumption is proven wrong

**Reflection:** Are you over- or underestimating AI in your domain?

---

### Experiment 6.2: The Edge Case Collection (Beginner)
**Time:** 10 minutes  
**What you'll do:** Document where AI failed in your real work.

**Steps:**
1. Recall 3 times AI disappointed you at work
2. For each, categorize the failure:
   - Factual error (wrong information)
   - Context miss (didn't understand situation)
   - Creativity gap (boring, generic)
   - Format failure (wrong structure)
   - Judgment lapse (inappropriate choice)
3. Look for patterns: What type of failure is most common for you?
4. Write 2-3 "never use AI for X" rules based on your failures

**Success looks like:** You have concrete, experience-based boundaries

**Reflection:** Could better prompting have fixed any of these failures?

---

### Experiment 6.3: The Human Advantage Map (Beginner)
**Time:** 10 minutes  
**What you'll do:** Identify what you bring that AI can't.

**Steps:**
1. Pick a recent piece of work you're proud of
2. List 5 specific choices you made in that work
3. For each, ask: Could AI have made this choice as well?
4. Identify the choices that required:
   - Relationships/trust
   - Institutional knowledge
   - Judgment calls with incomplete info
   - Political awareness
   - Real-world consequences
5. These are your "moat"—the value you add beyond AI

**Success looks like:** Clear articulation of your unique human contribution

**Reflection:** How do you spend more time on your "moat" activities?

---

### Experiment 6.4: The Recency Test (Intermediate)
**Time:** 12 minutes  
**What you'll do:** Explore AI's knowledge cutoff in your domain.

**Steps:**
1. Identify something that changed recently in your field (last 3-6 months)
2. Ask AI about it without mentioning the recency
3. Evaluate: Does AI know about the change?
4. Ask about something that changed 1-2 years ago
5. Map: Where is AI's knowledge current vs. outdated in your domain?

**Success looks like:** You know which topics require feeding AI current information

**Reflection:** How do you reliably get current information into AI conversations?

---

### Experiment 6.5: The Judgment Boundary (Intermediate)
**Time:** 15 minutes  
**What you'll do:** Identify where AI judgment isn't good enough.

**Steps:**
1. Find a decision you made recently that had real stakes
2. Present the same decision context to AI (without revealing what you chose)
3. Compare AI's recommendation to your actual choice
4. Evaluate: Was AI's reasoning sound? Did it consider the right factors?
5. Identify what judgment elements were missing from AI's analysis

**Success looks like:** Clear criteria for "decisions I shouldn't delegate to AI"

**Reflection:** What invisible factors influenced your decision that AI couldn't see?

---

### Experiment 6.6: The Capability Timeline (Advanced)
**Time:** 15 minutes  
**What you'll do:** Assess what AI can do NOW vs. 6 months ago.

**Steps:**
1. Think of an AI task you tried 6+ months ago that disappointed you
2. Try the exact same task today
3. Evaluate: Has capability improved?
4. List 3 tasks you don't bother trying with AI
5. For each, predict: When will AI be good enough? (1 year, 3 years, never?)

**Success looks like:** A calibrated view of AI improvement rate in your domain

**Reflection:** Are you retrying things at the right pace as AI improves?

---

### Experiment 6.7: The Failure Mode Catalog (Advanced)
**Time:** 15 minutes  
**What you'll do:** Build a systematic understanding of HOW AI fails.

**Steps:**
1. Push AI to fail intentionally: ask for things you're confident it can't do well
2. Document 5 distinct failure modes (not just "it was wrong")
3. For each failure mode, note:
   - Warning signs that predict this failure
   - Can better prompting prevent it?
   - Should you avoid this task type entirely?
4. Create a personal "failure mode cheat sheet"
5. Reference it before your next complex AI task

**Success looks like:** You can predict failure before it happens and adjust approach

**Reflection:** Which failure modes are fundamental limits vs. fixable with skill?

---

# Quick Reference: Skill Levels

## Beginner Experiments (21 total)
1.1, 1.2, 1.3, 2.1, 2.2, 2.3, 3.1, 3.2, 3.3, 4.1, 4.2, 4.3, 5.1, 5.2, 5.3, 6.1, 6.2, 6.3

## Intermediate Experiments (14 total)
1.4, 1.5, 2.4, 2.5, 3.4, 3.5, 4.4, 4.5, 5.4, 5.5, 6.4, 6.5

## Advanced Experiments (7 total)
1.6, 1.7, 2.6, 2.7, 3.6, 3.7, 4.6, 4.7, 5.6, 5.7, 6.6, 6.7

---

# How to Use This Library

1. **Start with your weakest skill** — Take the assessment first to identify gaps
2. **Begin with beginner experiments** — Build foundation before advancing
3. **Use real work** — Every experiment uses tasks you're already doing
4. **Track reflections** — Your insights build meta-skill over time
5. **Repeat experiments** — Your second attempt will be better than your first
6. **Share what works** — Tell colleagues about experiments that helped you
