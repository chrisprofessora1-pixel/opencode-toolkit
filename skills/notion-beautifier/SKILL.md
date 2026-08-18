---
name: biner
description: |
  BINER — Beautiful Intelligent Notion Enhancement & Reformatting. Create beautifully formatted Notion pages with professional visual hierarchy using callouts, columns, colored headings, toggles, tables, and layered layouts. MANDATORY TRIGGERS: Use this skill whenever the user says "create notion page", "make a notion page", "build a notion page", "beautify" (followed by a Notion URL or page reference), or any variation involving creating or formatting content in Notion. Also trigger when the user asks to format, structure, lay out, or redesign a Notion page, or wants to turn content into a well-designed Notion page. The "beautify" command specifically means: fetch the existing page, preserve all content, and reformat it using the design system. Also trigger when the user says "learn my Notion style", "train on these Notion pages", "learn my design style", or "forget my Notion style". Three modes: LEARN (extract design style from sample pages), CREATE (new page), and BEAUTIFY (reformat existing page). LEARN stores style profiles in persistent memory; CREATE and BEAUTIFY apply them.
---

# BINER — Notion Page Creator

You create visually polished, professionally structured Notion pages. Your job is to apply a consistent design system that makes pages scannable, beautiful, and information-dense without feeling cluttered.

This skill focuses on **formatting and structure**. The user will provide the content or topic separately — your role is to make it look great in Notion using the Notion-flavored Markdown format that the Notion MCP tools accept.

## Before You Start

Before creating any page, fetch the Notion enhanced markdown spec to ensure you have the latest syntax:
```
notion-fetch: id = "notion://docs/enhanced-markdown-spec"
```

If this fails, use the reference patterns documented below — they are extracted from real, working Notion pages.

## Page Creation Defaults

- **Privacy**: Pages are created as **private** (no parent specified) unless the user specifies a location. If the user provides a parent page or database, use that.
- **Icons**: Always give the page an emoji icon that reflects its topic. Use a relevant emoji, not a generic one.
- **Title**: Use the user's provided title. Don't add emoji to the title itself — that's what the icon is for.

## Style Profiles

This plugin supports personalized design styles. When a profile exists in the user's persistent memory, CREATE and BEAUTIFY commands use it instead of the default design system.

### "Learn my Notion style" — LEARN mode

When the user wants to train a design profile from sample pages:

1. **Collect page URLs.** The user provides 3-5 Notion page URLs they consider well-designed. Optional: a profile name ("Learn my Notion style as 'technical'"). If no name given, auto-generate one from observed patterns (e.g., "dense-technical", "minimal-clean", "colorful-structured").

2. **Fetch each page.** Use `notion-fetch` for each URL. Read the raw Notion markdown.

3. **Extract design dimensions.** Read `references/design-dimensions.md` for the full list of what to analyze. Key dimensions:
   - Which of the 12 design patterns appear (callouts, columns, tables, toggles, etc.)
   - Color palette: which `color="..."` values, frequency, semantic meaning
   - Callout density and structure (header+content pairs, standalone, stacked layers)
   - Section header style, column usage, table format, toggle patterns
   - Visual density, typography, content structure
   - 2-3 signature moves unique to these pages

4. **Read current memory.** Use `memory_get` to load persistent memory. Find or create the `## NOTION Design Profiles` section.

5. **Save the profile.** Use the schema in `references/profile-schema.md`. Keep profiles to 12-18 lines max. Write the complete updated memory back with `memory_update`.

6. **Confirm.** Show the user what was captured. Offer to refine if anything looks off.

### "Forget my Notion style" — Delete a profile

Remove the named profile (or the only profile) from `## NOTION Design Profiles` in persistent memory. Confirm before deleting.

### Profile-Aware Formatting

Before formatting in CREATE or BEAUTIFY mode:
1. Read persistent memory. Check for `## NOTION Design Profiles`.
2. If a profile exists, use it to guide pattern selection:
   - Apply **Patterns used** in order of preference
   - Skip **Patterns avoided**
   - Use the profile's **Color palette** instead of the default color coding
   - Match the profile's density, structure, and typography preferences
   - Apply the profile's **Signature moves** where appropriate
3. If multiple profiles exist, ask the user which to apply (or auto-select if the content type has an obvious match).
4. If no profile exists, use the default design system below.
5. **ALWAYS enforce Common Mistakes rules** regardless of profile — no nested callouts, no callouts in columns, no code in toggles.

## The Design System

These patterns come from real production pages and create a consistent, professional look. The key insight: Notion's callout blocks are the primary structural element — they create visual containment, color coding, and hierarchy that plain headings can't achieve.

### 1. Intro Callout (Every Page Gets One)

Every page opens with a plain callout that establishes context. This orients the reader immediately.

```markdown
::: callout
	**Owner:** <mention-user url="user://..."/>
	**Purpose:** Brief description of what this page is and why it exists.
	*Additional context or notes in italics if needed.*
:::
```

If no owner is relevant, use the callout for a brief executive summary or page purpose statement instead.

### 2. Section Headers as Colored Callouts

Major sections use colored callout blocks as headers rather than plain headings. This creates strong visual separation between sections.

**Red callout headers** for primary sections (executive summaries, major topic areas):
```markdown
::: callout {color="red_bg"}
	### **Section Title**
:::
```

**Green callout headers** for positive/success sections (next steps, achievements, results):
```markdown
::: callout {color="green_bg"}
	### **Section Title**
:::
```

The content for each section goes in a **separate plain callout** immediately below the header callout. This creates a "header bar + content block" pattern:
```markdown
::: callout {color="red_bg"}
	### **The Problem**
:::
::: callout
	Description of the problem goes here in the content callout...
:::
```

### 3. Color Coding System

Colors have consistent semantic meaning:

| Color | Use For |
|-------|---------|
| `red_bg` | Section headers, critical warnings, key evidence |
| `blue_bg` | Key commitments, objectives, highlighted statements |
| `green_bg` | Success metrics, next steps, positive outcomes, download links |
| `yellow_bg` | Caution areas, security/governance, priority 2 items, table header rows |
| `orange_bg` | Priority 1 headings, phased labels |
| `purple_bg` | Innovation sections, advanced features, architecture layers |
| `gray_bg` | Reference tables, notes, context sections |

### 4. Colored Background Headings for Priority/Category Labels

When you need inline section markers (like priority levels), use headings with background colors:
```markdown
## Priority 1 Goals {color="orange_bg"}
## Priority 2 Goals {color="yellow_bg"}
```

### 5. Blue Blockquotes for Key Objectives

Inside callouts, use blockquotes with blue backgrounds to highlight the core objective or key statement:
```markdown
::: callout
	## **Section Title**
	> **Objective:** The main goal stated clearly and concisely. {color="blue_bg"}
:::
```

### 6. Columns for Side-by-Side Content

Use columns when you have parallel content — pillars, comparisons, paired sections (like Security + Next Steps, or Notes + To-Do).

**CRITICAL: Do NOT put callout blocks inside columns.** Callouts inside `<column>` tags render broken — the callout content falls outside the column container, creating empty blocks and stray `:::` artifacts. Instead, use plain content (bold text, bullets, paragraphs) directly inside columns:

```markdown
<columns>
	<column>
		## **Left Section**
		Content here...
	</column>
	<column>
		## **Right Section**
		Content here...
	</column>
</columns>
```

If you need colored side-by-side sections, place the columns INSIDE a callout (not the other way around):
```markdown
::: callout {color="gray_bg"}
	<columns>
		<column>
			**Left Section**
			Content here...
		</column>
		<column>
			**Right Section**
			Content here...
		</column>
	</columns>
:::
```

Two columns is the sweet spot. Three works for brief items. Don't exceed three.

### 7. Architecture/Layer Callouts

When showing layers, phases, or stacked concepts, use sequential flat callouts to create a visual stack. **Do NOT nest callouts inside callouts** — nesting generates extra `:::` closers that create empty broken blocks.

```markdown
::: callout {color="red_bg"}
	### **Architecture**
:::
::: callout {color="yellow_bg"}
	**Layer 1** - Description of first layer.
:::
::: callout {color="green_bg"}
	**Layer 2** - Description of second layer.
:::
::: callout {color="purple_bg"}
	**Layer 3** - Description of third layer.
:::
::: callout {color="red_bg"}
	**Layer 4** - Description of fourth layer.
:::
```

### 8. Toggle Sections for Detail-Heavy Content

For content that's important but shouldn't dominate the page (goals with metrics, Jira tickets, reference data), use toggle/details blocks inside colored callouts:

```markdown
::: callout {color="gray_bg"}
	<details>
	<summary>**Goal 1: Descriptive Title** </summary>
		Explanation of the goal.
		- **Signal:** What indicates progress.
			- **Metric:** How you measure it specifically.
			- **Metric:** Another measurement.
	</details>
:::
```

For top-level collapsible sections, use toggle headings:
```markdown
## Section That Can Collapse {toggle="true"}
```

### 9. Tables

Wrap tables in gray callouts for visual containment. Use colored header rows:

```markdown
::: callout {color="gray_bg"}
	<table header-row="true">
	<tr color="yellow_bg">
	<td>**Column 1**</td>
	<td>**Column 2**</td>
	<td>**Column 3**</td>
	</tr>
	<tr>
	<td>Data</td>
	<td>Data</td>
	<td>Data</td>
	</tr>
	</table>
:::
```

### 10. Colored Text for Inline Emphasis

Use colored spans for labels and inline emphasis:
```markdown
<span color="brown">**Label:**</span> Description follows the label.
<span color="blue">*Italic blue for vision/aspiration statements.*</span>
<span color="red">*Red italic for important warnings or notes.*</span>
<span color="gray">*Gray italic for subtitles and supplementary context.*</span>
<span color="green">Green for positive status indicators.</span>
```

### 11. Labeled Steps with Background Colors

For phased plans or numbered steps, use background-colored labels inline:
```markdown
::: callout
	Step 1: Adopt the Technology {color="green_bg"}
	Description of step 1...

	Step 2: Build the Partnership {color="yellow_bg"}
	Description of step 2...

	Step 3: Define the Value Proposition {color="blue_bg"}
	Description of step 3...
:::
```

### 12. Bottom Navigation / Link Blocks

For linking to related pages, use colored callouts sequentially (do NOT put callouts inside columns):
```markdown
::: callout {color="blue_bg"}
	**Quick Links**
	- <page url="https://...">Key Evidence</page>
	- <page url="https://...">Strategic Plan</page>
:::
```

## Page Type Templates

Choose the template that best fits the user's content, then adapt as needed.

### Vision / Strategy Document
1. Intro callout (owner, purpose)
2. Colored callout headers for each pillar (blue_bg, purple_bg)
3. Balance/synthesis callout (yellow_bg header)
4. Summary callout (blue_bg header with icon)
5. Quick links callout at bottom

### Proposal Document
1. Title heading + gray subtitle
2. Red callout section headers: Executive Summary → Problem → Solution → Rationale → Resource Plan → Next Steps
3. Each section: colored header callout + content callout below it
4. Steps within solution use green_bg/yellow_bg/blue_bg labels
5. Phased plan callouts

### Goals / Metrics Document
1. Two main columns (e.g., "Download Stats" vs "Activation Stats")
2. Green callout column headers
3. Priority headings with orange_bg / yellow_bg
4. Toggle/details blocks for each goal inside colored callouts
5. Bottom section: columns with Notes + To-Do (checkboxes)
6. Collapsible Jira/ticket sections

### Workspace / Plan Document
1. Intro callout with owner, purpose, and colored italic note
2. Goal callout with blue blockquote
3. Principles callout with emoji bullets
4. Gray callout wrapping a reference table
5. Architecture section with sequential flat colored callouts (no nesting)
6. Scope/privacy controls as sequential callouts per platform
7. Footer: Security + Next Steps as sequential callouts

## Commands

### "Create notion page" — Build a new page from scratch
1. **Check for a style profile** — read persistent memory for `## NOTION Design Profiles`. If found, use it to guide pattern and color choices throughout formatting. If not, use the default design system.
2. **Read the user's content instructions** — they'll tell you what the page is about.
3. **Pick the closest template** from the Page Type Templates section and adapt it.
4. **Use `notion-create-pages`** to create the page. Set no parent (private) unless told otherwise.
5. **Apply the design system consistently** — every section should use the callout patterns, not bare markdown headings. If a style profile is loaded, prefer the user's patterns and colors over the defaults.
6. **Don't over-format** — if a section is short, a simple callout is fine. The patterns above are tools, not mandates. A page with 3 well-chosen patterns beats one that uses all 12 for no reason.

### "Beautify" — Reformat an existing Notion page
When the user says "beautify" followed by a Notion URL or page reference:
1. **Check for a style profile** — read persistent memory for `## NOTION Design Profiles`. If found, use it to guide formatting decisions. If not, use the default design system.
2. **Fetch the page** using `notion-fetch` to get the current content.
3. **Preserve all content exactly** — don't add, remove, or rewrite any text, code, or data. This is a formatting operation, not an editing one.
4. **Apply the design system** — restructure the page using callout patterns, colored section headers, tables in gray callouts, columns where parallel content exists, and the full visual hierarchy. If a style profile is loaded, apply the user's preferred patterns, colors, and signature moves.
5. **Use `notion-update-page` with `replace_content`** to apply the new formatting.
6. **Understand the content type** — an architecture doc with code should show code inline (not hidden in toggles). A strategy doc should use pillars and columns. Match the formatting to what the content actually is.

## Common Mistakes to Avoid

- **NEVER nest callouts inside callouts**: This is the #1 rendering bug. Nested callouts generate extra `:::` closers that create empty broken blocks. Always keep callouts flat — use sequential callouts instead of nesting them.
- **NEVER put callouts inside `<column>` tags**: Callouts inside columns render broken — the callout content falls outside the column, creating empty blocks and `:::::: columns` artifacts. Use plain content (bold, bullets, paragraphs) inside columns, or wrap columns inside a callout instead.
- **Bare headings without callouts**: Plain `## Heading` looks weak in Notion. Wrap sections in callouts or use colored heading backgrounds.
- **Inconsistent colors**: Pick 3-4 colors per page and use them consistently. Don't rainbow every section.
- **Forgetting the intro callout**: Every page needs one. It's the first thing readers see.
- **Giant walls of text in callouts**: Break up long content with toggles, tables, or columns.
- **NEVER put code blocks inside `<details>` toggles**: Notion strips code from inside `<details><summary>` blocks — the toggle renders but the code disappears. Instead, use a blue_bg heading above a gray callout containing the code block directly.
- **Don't hide important content in toggles**: Toggles are useful for truly supplementary info, but if the content is the point of the page (like code in an architecture doc), show it inline.
