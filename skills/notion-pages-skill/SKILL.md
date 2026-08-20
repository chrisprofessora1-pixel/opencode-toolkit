---
name: notion-homework-pages
description: >
  Create beautiful, efficient Notion homework pages, worksheets, and lesson
  systems for language teachers. Use this skill whenever the user asks to build,
  design, or create anything in Notion — homework pages, weekly worksheets,
  lesson plans, dashboards, roadmaps, Life OS systems, kanban boards, PARA
  setups, design systems, project trackers, weekly planners, content calendars,
  second brains, OKR trackers, or any Notion page/template. Also trigger when
  the user mentions making Notion "look better", "more aesthetic", "more
  advanced", or asks for Notion formula/database/automation help, or asks to
  create a homework/worksheet/lição de casa page in Notion.
---

# Notion Pages, Homework & Worksheet Skill

Build beautiful, efficient, advanced Notion workspaces grounded in research-backed
design patterns — with a special focus on **homework pages for language
teachers**. This skill covers aesthetics, database architecture, formulas,
automations, the major template archetypes, and the exact block-level format
for homework pages (verified against a real page).

---

## CORE PHILOSOPHY

> **"Less is more" for databases. "Design intentionally" for layout.**
> **"Every homework page follows one fixed, proven format."**

Three rules govern everything:
1. One master database with filtered views beats many separate databases
2. Visual design follows a system (palette, icons, covers) — never ad hoc
3. Homework pages use the exact verified block recipe below — consistency builds trust with students

---

## 1. AESTHETIC FOUNDATIONS

### Color & Theme
- Pick **2–4 colors max** and use them everywhere: callouts, tag colors, covers, icons
- Popular theme systems:

| Theme | Font | Colors | Vibe |
|---|---|---|---|
| Minimalist | Default | Black / White / Gray | Clean, corporate |
| Dark Mode | Mono | Dark bg + pastel accents | Modern, eye-friendly |
| Vaporwave | Mono | Pink / Purple / Blue / Neon | Creative, bold |
| Nature | Serif | Green / Brown / Gray | Calm, organic |
| Dark Academia | Serif | Brown / Gray / Cream | Classic, artsy |

### Covers & Icons
- **Covers**: Treat like a "hero section". Make in Canva at ~1600px wide using brand colors. Reuse the same style family across sections (content, clients, personal) for visual unity.
- **Icons**: Every page gets one. Keep all icons the same style — all emojis, all minimal PNGs, or all native Notion icons. Never mix styles. Match the color palette.
- **Sources for icons**: Icons8, Flaticon, Noun Project, native Notion icon set

### Layout Principles
- **Multi-column layout** makes pages feel like systems, not notes. Typical dashboard layout:
  - Left column (narrow): tasks, quick links, priorities
  - Center column (wide): main database or content
  - Right column (narrow): widget, quote, image
- **Callout blocks** = visual cards/containers. Change background color, remove emoji for cleaner look, nest other blocks inside. Use for: Today's Focus, Quick Links, Weekly Goals, In Progress notes.
- **White space**: Group related blocks, add dividers between sections, tuck non-urgent links into Toggle blocks. Never stack 5+ callouts with no breathing room.
- **Breathe**: Add blank paragraph spaces between text; use `/divider` between sections; use Quote blocks as vertical dividers.

### Advanced Visual Tricks
- **LaTeX dividers**: Create a column, paste `$$\color{gray}\rule{3px}{400px}$$` in an inline equation block → vertical divider
- **Custom fonts**: Make a heading image in Canva with your brand font → embed as an image block. Looks like real custom fonts.
- **Fake text centering**: Add spaces to the left of headings until visually centered (Notion has no native center-align)
- **Clean up pages**: Turn off Backlinks and Top-level discussions via ⋯ → Customize Page

### Widgets (Use Strategically — Max 2 per page)
- **Indify / WidgetBox**: Weather, Pomodoro timer, countdown, clock, quotes, Spotify embed
- Don't add widgets just because you can. Each widget must earn its spot.

---

## 2. DATABASE ARCHITECTURE

### The Golden Rule: Single Source of Truth
❌ **Bad**: 12 separate "Events - January", "Events - February" databases  
✅ **Good**: 1 `Events` database with filtered views per month/quarter/type

One master database:
- Loads faster (fewer blocks for Notion to compute)
- Easy to maintain (change a property once, updates everywhere)
- Scales as you add data
- Powers multiple filtered views as "tabs"

### Core Database Views
| View | Best For |
|---|---|
| **Board (Kanban)** | Agile workflows, status tracking (Backlog → In Progress → Review → Done) |
| **Timeline** | Roadmaps, project planning, release scheduling |
| **Gallery** | Resources, content ideas, products, client libraries |
| **Calendar** | Deadlines, editorial calendars, event scheduling |
| **Table** | Data entry, detailed property editing |
| **List** | Simple task views, reading lists |

**Gallery tips**: Set card preview to "Page Cover", hide extra properties, delete empty default pages → instant Pinterest-style visual grid.

### Relations & Rollups
Connect core databases to each other using **Relations**:
```
Clients ←→ Projects ←→ Tasks
```
- **Relation**: Links records across databases (e.g., each Task belongs to a Project)
- **Rollup**: Aggregates related data (e.g., count of completed tasks → project progress %)
- Rollups can: Sum values, Count items, Calculate % complete, Find min/max dates

**Example**: Progress bar formula using a Rollup:
```
toNumber(prop("Tasks Done")) / toNumber(prop("Total Tasks"))
```

### Auto-Archiving Setup
Create an "Archive" filtered view with an advanced filter:
- Filter: `Start Date` is before `1 month ago` (relative date)
- Main view filter: `Start Date` is after `1 month ago`

Notion auto-moves items between views as dates pass — zero manual maintenance.

---

## 3. FORMULAS 2.0

### Key Concepts
```js
// Dot-notation (new in 2.0)
prop("Due Date").dateAdd(7, "days")

// Variables with let
let(score, prop("Impact") * prop("Confidence") / prop("Effort"),
  ifs(score > 8, "🔥 High", score > 4, "⚠️ Medium", "⬇️ Low")
)

// Multi-variable with lets
lets(
  impact, prop("Impact"),
  effort, prop("Effort"),
  impact / effort
)

// ifs() — replaces nested if()
ifs(
  prop("Score") > 90, "A",
  prop("Score") > 75, "B",
  prop("Score") > 60, "C",
  "F"
)

// List operations (arrays)
prop("Related Tasks").filter(current.prop("Status") == "Done").length()

// Styled output
style("🔴 Overdue", "red", "bold")
```

### Useful Formula Recipes
```js
// Priority Score (for roadmaps)
prop("Impact") * prop("Confidence") / prop("Effort")

// Schedule Risk indicator
ifs(
  prop("End Date") < now() and prop("Status") != "Done", "🔴 Late",
  dateBetween(prop("End Date"), now(), "days") < 3, "🟡 At Risk",
  "🟢 On Track"
)

// Days until due
dateBetween(prop("Due Date"), now(), "days")

// Task completion status (without rollup, using relation)
lets(
  tasks, prop("Tasks"),
  done, tasks.filter(current.prop("Status") == "Done").length(),
  total, tasks.length(),
  ifs(total == 0, "No tasks", done == total, "✅ Done",
      done > 0, "⚙️ " + format(round(done/total*100)) + "%", "⬜ Not started")
)
```

---

## 4. AUTOMATIONS

Access via the ⚡ lightning bolt icon in any database.

### Trigger types
- Property changed (e.g., Status → "Done")
- Page added to database
- Date arrives (e.g., Due Date = Today)
- Button clicked (page-level or database property)

### Action types
- Edit property in same or other database
- Add page to database
- Send Slack/email notification
- Send webhook (for Zapier/Make integrations)
- Define variables (reuse across multiple actions)

### Key Automation Recipes
```
WHEN Status → "Done"
  → Set Completed Date = Now()
  → Send Slack notification to #team-updates

WHEN new page added to Inbox
  → Set Status = "To Review"

WHEN Due Date = Today
  → Send email to owner
```

---

## 5. TEMPLATE ARCHETYPES

### A. Dashboard (Home Page)
**Purpose**: Nudge attention toward urgent tasks + portal to workspaces

**Layout**:
```
[Cover Image - branded hero banner]
[Icon + Page Title]

[Column 1 - narrow]          [Column 2 - wide]           [Column 3 - narrow]
Callout: Today's Focus       Linked DB: Active Projects   Widget: Clock/Pomodoro
Callout: Quick Links         Filtered view: This Week     Widget: Quote of day
Toggle: Resources            ──────────────────────       Image: Inspiration
```

**Key elements**:
- Linked databases with filters (not raw databases)
- 1-2 widgets max
- Persistent synced block side-menu for navigation across all pages

---

### B. Roadmap
**Purpose**: Visualize product/project progress over time

**Database properties**:
- Name (title)
- Status (select: Backlog / In Progress / Review / Done / Shipped)
- Priority (formula: Impact × Confidence ÷ Effort)
- Phase/Epic (relation → Epics database)
- Owner (person)
- Start Date / End Date (date range)
- Schedule Risk (formula — see above)
- RACI (multi-select: Responsible / Accountable / Consulted / Informed)

**Views to create**:
- Timeline (grouped by Epic) — drag to adjust dates
- Board (grouped by Status) — kanban flow
- Table (full edit mode)
- Calendar (deadlines)
- Filtered: "My Tasks", "This Sprint", "Shipped"

---

### C. Kanban Board
**Purpose**: Agile workflow management

**Columns (Status options)**:
`Backlog → Ready → In Progress → Review → Done`

**WIP limit formula** (add as database description or callout):
```
Max 3 items In Progress per person at any time
```

**Scrum variant**: Add a `Sprints` relation database + sprint goals + burndown chart (via Blocky widget)

**Kanban variant**: Set WIP limits per column, track cycle time with date formula:
```
dateBetween(prop("Done Date"), prop("Start Date"), "days")
```

---

### D. Life OS (PARA Method)
**Purpose**: All-in-one personal productivity system

**Four core databases**:
1. **Projects** — short-term efforts with a goal + deadline
2. **Areas** — ongoing responsibilities (Health, Finance, Career, Relationships)
3. **Resources** — reference material, interests, notes
4. **Archives** — inactive items moved out of active view

**Key pages**:
- **Home Dashboard**: Today's priorities, active projects, quick capture inbox
- **Weekly Review**: Template page linked to all 4 PARA databases
- **Quick Capture Inbox**: Dump ideas here → sort into PARA weekly
- **Persistent Side Menu** (synced block): Navigation present on every page

**PARA Tips**:
- Areas have standards to maintain (not goals to achieve)
- Resources are shareable; Areas are private
- Archive aggressively — it's not deleting, just moving

---

### E. Design System
**Purpose**: Single source of truth for brand/product visual identity

**6-section structure**:
1. **🖼 Brand** — Logo files, mission statement, value prop, guiding principles
2. **🎨 Visual Design** — Gallery DB of: typography guidelines, color tokens, grid system, iconography, spacing rules
3. **📝 Content** — Tone of voice, UX writing guidelines, brand vocabulary
4. **🧰 Components** — Atomic UI elements (buttons, banners, tables, forms) + embedded Figma prototypes + developer code snippets
5. **💼 Resources** — Tools, links, onboarding docs
6. **📱 Prototypes** — High-fidelity mockups (embedded Figma frames)

**Components section tip**: Use a Kanban-style board view with Status + Tags + Assignee so teams can track component build progress.

---

### F. Content Calendar
**Database properties**: Title, Type (video/blog/social), Platform, Status, Publish Date, Owner, Related Project (relation)

**Views**: Calendar (by Publish Date), Board (by Status), Gallery (visual preview), Filtered: "This Week", "My Content"

---

### G. Project Tracker
**Links to**: Tasks database, Clients database, Team database

**Progress formula** (requires Rollup "Tasks Done %"):
```
style(
  format(round(prop("Tasks Done %") * 100)) + "% Complete",
  ifs(prop("Tasks Done %") > 0.8, "green",
      prop("Tasks Done %") > 0.4, "yellow", "red")
)
```

---

### H. Homework Page (Teacher Lesson Format) ★ verified real page

**Purpose**: Weekly homework/worksheet pages for language students, stored in a
`Homework` database. Based on the real "August 7 - Homework" page.

**Database**: `Homework` — only 2 properties: `Name` (title, e.g. "August 7 - Homework ") and `Date` (date, e.g. 2026-08-07).

**Page icon**: 📝 (or theme emoji)

**Exact block recipe (top to bottom)**:

```
[Callout 📝] "<Date> — <Theme>"        e.g. "August 7 — Vocabulary & Grammar Practice"
[Divider]

[Heading 1] "<N>. <Exercise Title> <emoji>"   e.g. "1. Complete the Gaps — Verbs 🧩"
[Callout 📦] "WORD BOX"
    └─ [Paragraph] words separated by " · "   e.g. "owe · miss · leave · let · allow · forbid · take place · worth"
[Paragraph] Instruction sentence, e.g. "Complete each sentence with the correct verb or expression. Change the form when necessary."
[Numbered list] 8–10 sentences, blanks as ____________ (12 underscores)

[Divider]
... repeat for each exercise ...
```

**Exercise-type emojis** (used in Heading 1):
| Type | Emoji |
|---|---|
| Gap fill — verbs | 🧩 |
| Gap fill — vocabulary | ✏️ |
| Gap fill — connectors | 🔗 |
| True or False | ✅❌ |
| Mixed review | 🔁 |

**Special blocks**:
- **True or False section**: instruction callout with 🔎 emoji ("Write T if the statement is true or F if it is false. If it is false, rewrite it correctly."), numbered items ending with "T / F", and **each item has a nested paragraph** "Correction: ____________" so students rewrite false statements right under the item.
- **Grammar tip**: callout with 💡 emoji, text "Remember:", nested paragraphs with the rules (e.g. "although / even though + subject + verb", "despite / in spite of + noun, noun phrase, pronoun, or verb + -ing", "though can also appear at the end of a sentence.").
- **Final exercise — Mixed Gap Review 🔁**: one long paragraph (cloze) reusing ALL the lesson vocabulary/grammar, with blanks; its WORD BOX contains every word from the lesson (e.g. "absent · allow · besides · competitive · debt · even though · forbid · knowledgeable · miss · owe · take place · worth").
- Word box words always separated by " · " (spaced dot), never commas or newlines.
- Page ends with a trailing Divider.

**Exercise naming conventions**: numbered, dash-separated, type-first: "1. Complete the Gaps — Verbs 🧩", "2. Complete the Gaps — Vocabulary ✏️", "3. Complete the Gaps — Contrast Connectors 🔗", "4. True or False? Correct the False Meanings ✅❌", "5. Mixed Gap Review 🔁".

---

## 6. HOMEWORK CONTENT RULES (language worksheets)

These rules govern the CONTENT inside homework pages. They come from the
teacher's brain (Notion "Cérebro Lição de Casa") and apply to every worksheet.

### Selection & progression
- **5 to 8 exercises per homework**; never repeat the same exercise type twice in one page.
- Progress pedagogically: recognition → controlled practice → grammatical/precision accuracy → transformation → categorization → reading & interpretation → guided writing. Follow this order within the page, from most mechanical to most productive.
- Level bands:
  - **A1**: recognition + controlled practice only (Match, Sort, Multiple Choice, Fill). No True/False, no critical reading.
  - **A2**: add True/False, dialogues to complete, light reading, short guided writing.
  - **B1**: sentence transformation, error correction, sentence combining, reading with interpretation, more demanding writing.
  - **B2+**: word formation, key word transformation, collocations, long texts, summary, denser role-play/debate.
  - **C1**: sophisticated transformation, idiomaticity, formal/informal genre writing, deep opinion discussions.
- **Coherence**: every exercise uses the SAME vocabulary/grammar, from recognition to production.
- Always end with open discussion questions (💬) using the lesson vocabulary, to generate real conversation in class.

### Formatting rules (critical)
- **Target language only**: every instruction and every piece of content is in the target language (English, French, Italian). Never Portuguese inside the worksheet, even when the teacher sends translations. Portuguese only in chat with the teacher.
- **Placeholders**: only the content the student solves is `[PLACEHOLDER]`. Instructions and titles come filled in.
- **Answer key**: never at the end of the student's exercise page; never delivered by default. Only when the teacher asks, and then delivered in chat (outside Notion), together with a reading text using the vocabulary with comprehension questions.
- **Arrow ➡**: the answer comes right after the arrow, with no blank line after it. The arrow ends the sentence. Only used when the answer is written separately after the sentence (Choose the Option, True or False, Transform, Find the Mistake).
- **Blanks inside the sentence** (______) get NO arrow: the student types directly in the gap. Never add `➡ ______` at the end of a sentence that already has a mid-sentence gap.
- **Dialogues**: one line per speaker, one below the other, name in bold + colon before the speech, blank line between lines. Example:
  - **Ana:** Hey! Do you want ______ tonight?
  - (blank line)
  - **Ben:** Sorry, I can't. I'm ______ study for my English test.
- **Forbidden: letter unscramble** (desembaralhar letras). Use categorization, word order, or another varied format instead.
- **True or False**: only for A2+. When the statement is true, the vocabulary is used correctly; when false, it's used incorrectly and the student corrects the word.
- **Reading**: vocabulary appears in bold inside the text itself, no word list at the end. Ends with comprehension questions and always opens discussion questions.
- **No em dash (—)** in content. Use colon, comma, or rewrite. (Applies to worksheet content too.)
- **Notion formatting required**: markdown compatible with Notion, neat appearance (emoji headings, dividers between exercises, clean tables, word box highlighted, callout for instructions). Ready to paste into Notion with zero rework.

### Exercise type catalog (63 formats, grouped)
Pick varied types from these families:
- 🟢 **Vocabulary**: Match the Words (always shuffle right column; definitions in target language, never translations), Sort the Words, Odd One Out, Word Families, Synonyms & Antonyms, Collocations, Complete the Word, Word Search, Crossword, Vocabulary Maze, Image Labeling.
- 🔵 **Grammar**: Fill the Gap (cloze), Choose the Correct Option, Transform the Sentence, Find the Mistake, Put the Words in Order, Question Formation, Negative/Interrogative, Combine the Sentences, Match Sentence Halves, Complete the Dialogue, Conjugation Table, Spot the Correct Form.
- 🟣 **Reading**: Reading Comprehension, True or False / Not Given, Read and Retell, Find the Meanings, Order the Events, Complete the Text (gapped), True or False on Vocabulary Use.
- 🟡 **Writing**: Short Writing Prompt, Finish the Story, Write the Questions, Correct the Paragraph, Sentence Completion (production), Word Bank Writing, Email/Message Writing.
- 🟠 **Listening**: Gap-Fill Listening (blanks always ______ 6 underscores, never numbered, never the word; full text delivered separately for the teacher/ElevenLabs; key separate), Dictation, Listen and Circle, Listen and Order, Question-Answer, Song/Video Gap-Fill.
- 🟤 **Conversation**: Discussion Questions, Opinion Corner, Would You Rather, Prepare a Mini-Speech, Role-Play Script, Describe the Scene, Interview Preparation.
- 🔴 **Games**: Bingo, Taboo/Say it Another Way, Memory Match, Word Chain, Categories (Stop!), Story Dice, Letter Soup Sprint.
- ⚪ **Extras**: Quiz Show/Rapid Fire, True or False Mini Quiz, One-Word Answer Recap, Peer-Check/Self-Check Table, Sentence of the Day, Correct the Translation (Portuguese MAY appear as the base here, teacher decides).

---

## 7. QUICK REFERENCE: BUILDING A NEW PAGE

**Step-by-step checklist**:
- [ ] Choose cover image (Canva 1600px, brand colors)
- [ ] Set page icon (match style to rest of workspace)
- [ ] Turn off Backlinks + Top-level discussions (⋯ → Customize Page)
- [ ] Set full-width layout (⋯ → Full width ON)
- [ ] Define color palette (2–4 colors, note them in a callout at top)
- [ ] Build structure with columns (3 columns for dashboard layout)
- [ ] Add callout blocks as visual containers
- [ ] Use dividers + toggles to organize depth
- [ ] Place only 1–2 widgets max
- [ ] Connect databases with Relations before adding Rollups
- [ ] Set up filtered views before embedding on dashboard
- [ ] Add automations for repetitive status changes
- [ ] For homework pages: follow the verified block recipe (section 5.H) + content rules (section 6)

---

## 8. NOTION MCP INTEGRATION (Creating Pages via API)

When using the Notion MCP to create pages programmatically:

```
Tool: notion-create-pages
- Always set a page icon (emoji or external URL)
- Set cover via external image URL
- Use rich_text arrays for formatted content
- Build databases with proper property schemas before adding pages
- Use relation properties to link databases at creation time
```

**Property type reference**:
- `title` — page name
- `rich_text` — formatted text content
- `select` / `multi_select` — fixed option lists
- `status` — built-in status with Done group
- `date` — single date or date range
- `person` — workspace member assignment
- `relation` — link to another database
- `rollup` — aggregate from related database
- `formula` — computed property
- `number` — numeric value
- `checkbox` — boolean toggle
- `url` / `email` / `phone_number` — contact/link fields
- `files & media` — attachments
- `created_time` / `last_edited_time` — auto-filled timestamps

**Homework page creation recipe (via API)** — when creating a page in the
`Homework` database (properties: `Name` title + `Date` date), build blocks in
this exact order:

```
1. callout (emoji 📝)   "August 7 — Vocabulary & Grammar Practice"   ← no children
2. divider
3. heading_1            "1. Complete the Gaps — Verbs 🧩"
4. callout (emoji 📦)   "WORD BOX"  ← children: [paragraph "owe · miss · leave · let · allow · forbid · take place · worth"]
5. paragraph            instruction sentence
6. numbered_list_item × N   sentences with ____________ blanks
7. divider
8. ... repeat per exercise ...
```

API specifics:
- Word box callout content lives in **nested children blocks** (a paragraph), not in the callout's own rich_text.
- True/False items are `numbered_list_item` blocks with **children**: a paragraph "Correction: ____________".
- Blanks are exactly 12 underscores: `____________`.
- Word separators in boxes: ` · ` (space-dot-space).

---

## SOURCES
Research grounded in 50 web sources covering:
- Aesthetic Notion setup guides (Gridfiti, Studio Brittany, Simple.ink)
- Official Notion templates (Marketplace: roadmap, design system, PARA, Life OS)
- Formulas 2.0 documentation (Notion Help, Noxen Studio, Notion Mastery)
- PARA Method (Forte Labs, Tiago Forte's Building a Second Brain)
- Project management patterns (Kanban, Scrum, OKR, Agile in Notion)
- Relations & Rollups deep-dives (Notion VIP)
- Automation guides (Zapier, Make, native Notion automations)
- Verified homework page format: "August 7 - Homework" (Notion, Homework database)
- Teacher's homework brain: "Cérebro Lição de Casa" (63-exercise catalog, level bands, formatting rules)