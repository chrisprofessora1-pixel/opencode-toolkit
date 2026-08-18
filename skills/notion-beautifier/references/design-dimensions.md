# Design Dimensions

Use these dimensions when analyzing Notion pages during LEARN mode.
Extract what is *characteristic* across the sample set — not every page
will show every dimension, but patterns across pages reveal the style.

---

## Pattern Usage

Check for each of the 12 design patterns by their markdown signatures.
Record which are present, how frequently, and how they're used.

### Callout Blocks
- `::: callout` — How many? Plain vs colored (`{color="..."}`)?
- Are they used as **section headers** (short title inside) or **content containers** (paragraphs inside)?
- **Header + content pairs**: Does the page use a colored header callout immediately followed by a plain content callout?
- Are callouts used for other purposes (warnings, highlights, notes)?

### Columns
- `<columns>` / `<column>` — Present? How many columns (2 vs 3)?
- What content goes in columns? (parallel sections, comparisons, side-by-side notes)
- Are columns ever wrapped inside a callout for color?

### Tables
- `<table>` blocks — How many? What content type (data, comparisons, reference)?
- Are tables wrapped in gray callouts or bare?
- Do header rows use colored backgrounds (`<tr color="yellow_bg">`)?
- Are column widths specified?

### Toggles / Details
- `<details>` / `<summary>` — Present? What content is inside?
- Used for supplementary content (metrics, tickets) or main content?
- Never used? That's a strong signal too.

### Headings
- Plain `##` headings vs headings with `{color="..._bg"}` backgrounds?
- Toggle headings (`{toggle="true"}`)?
- What heading levels are used (H1, H2, H3)?

### Blockquotes
- `>` blockquotes — Present? With color (`{color="blue_bg"}`)?
- Used for objectives, key statements, or emphasis?

### Colored Text
- `<span color="...">` — Present? Which colors, for what purpose?
- Used for labels, status indicators, or emphasis?

### Other Patterns
- Labeled steps with background colors (`Step 1: ... {color="green_bg"}`)
- Bottom navigation / link blocks
- Dividers (`---`)
- Emoji in content or as callout icons

---

## Color Analysis

Inventory every `color="..."` value found across the sample pages.

- **Which colors appear?** Count frequency of each (red_bg, blue_bg, green_bg, yellow_bg, orange_bg, purple_bg, gray_bg, and foreground colors)
- **Semantic meaning**: Map what each color is used for:
  - Is `red_bg` used for section headers? Warnings? Layer diagrams?
  - Is `blue_bg` used for objectives? Links? Key statements?
  - Is `green_bg` used for next steps? Success? Downloads?
- **Palette size**: Does the user stick to 3-4 colors or use 6+?
- **Colors never used**: These go in "Colors avoided"

To determine semantic meaning, look at the content inside each colored element:
- `### **Title**` inside a colored callout → section header use
- A single sentence or statement → emphasis/highlight use
- A table or reference data → containment use

---

## Structural Patterns

### Callout Density
- Ratio of `::: callout` blocks to total content sections
- **High**: Nearly every section wrapped in callouts (5+ per page)
- **Moderate**: Key sections use callouts, others don't (2-4 per page)
- **Low**: Callouts used sparingly for emphasis only (0-1 per page)

### Section Header Style
Which approach dominates?
- **Colored callout headers**: `::: callout {color="red_bg"}\n### **Title**\n:::`
- **Background headings**: `## Title {color="orange_bg"}`
- **Plain headings**: `## Title`
- **Mixed**: Combination of approaches

### Callout Pairing
Does the page use the "header bar + content block" pattern?
```
::: callout {color="red_bg"}
	### **Header**
:::
::: callout
	Content goes here...
:::
```
If yes, which colors for headers? Is there a consistent color per section type?

### Layer / Stack Patterns
Are sequential colored callouts used to show layers, phases, or stacked concepts?
If yes, which colors in what order?

---

## Visual Density & Typography

### Content Density
- **Dense**: Long sections, information-rich, minimal whitespace
- **Moderate**: Balanced sections with clear breaks
- **Sparse**: Short sections, lots of whitespace, content-focused

### Bold Usage
- `**text**` — How frequent? Used for what? (labels, emphasis, headers within callouts)

### Colored Text
- `<span color="...">` — Frequency and purpose
- Brown for labels? Blue for aspirational? Red for warnings? Gray for subtitles?

### Background Headings
- `{color="..._bg"}` on `##` or `###` headings — frequency and which colors

### Italic Usage
- `*text*` — Used for subtitles, notes, context, or not at all?

---

## Content Structure

### Overall Approach
- **Bullet-heavy**: Most content in bullet lists
- **Prose-heavy**: Paragraphs dominate
- **Table-heavy**: Tables carry the main content
- **Mixed**: Varies by section type

### Intro Pattern
What appears at the top of the page?
- Owner + purpose callout (with mention, dates, context)
- Executive summary callout
- Context note in italics
- Nothing — jumps into content

### Bottom Pattern
What appears at the end?
- Quick links in colored callout
- Next steps section
- Related pages
- Nothing

### List Style
- Plain bullets, emoji bullets, or numbered lists?
- Nesting depth (flat or deep)
- Checkboxes present?

---

## Signature Moves

Identify 2-3 distinctive formatting choices that are unique to this user's
pages and wouldn't appear in a generic template.

Examples of signature moves:
- Always opens with an italic gray context line before the intro callout
- Uses purple exclusively for innovation/architecture sections
- Wraps every table in gray with yellow header rows
- Uses blue blockquotes for every section's key objective
- Phase labels always use green → yellow → blue color progression
- Bottom of every page has a blue quick links callout

These are the most important dimension — they're what make the profile
feel personal rather than generic.
