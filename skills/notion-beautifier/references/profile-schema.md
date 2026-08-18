# Profile Schema

This is the canonical schema for a design profile stored in memory.
Each profile gets its own section under `## NOTION Design Profiles`.

---

## Required Fields

Every profile must have these:

```markdown
### [profile-name]
*Last updated: [YYYY-MM-DD]*
*Pages analyzed: [n]*

- **Patterns used**: [ordered list of patterns from the 12, by frequency]
- **Patterns avoided**: [patterns that never appear across samples]
- **Color palette**: [colors used with semantic mapping, e.g., "red_bg=section headers, blue_bg=objectives"]
- **Colors avoided**: [colors that never appear]
- **Callout density**: [high / moderate / low]
- **Section header style**: [colored callout headers / background headings / plain headings / mixed]
- **Column usage**: [frequent / occasional / never] — [typical column count]
- **Table style**: [in gray callouts with yellow headers / bare / never]
- **Toggle usage**: [for supplementary content / never / for everything]
- **Visual density**: [dense / moderate / sparse]
- **Intro pattern**: [owner+purpose callout / summary / context note / none]
- **Content structure**: [bullets / prose / mixed / table-heavy]
- **Signature moves**: [2-3 distinctive formatting choices unique to this user]
```

---

## Optional Fields

Add these when samples reveal clear, distinctive patterns:

```markdown
- **Bottom navigation**: [colored link callouts / plain links / none]
- **Typography**: [bold labels + descriptions / colored inline text / minimal]
- **Layer pattern**: [sequential colored callouts with specific color order / not used]
- **Emoji usage**: [in bullets / as callout icons / never]
- **List style**: [plain bullets / emoji bullets / numbered / checkboxes]
```

---

## Full Example Profile

```markdown
### technical-structured
*Last updated: 2026-03-10*
*Pages analyzed: 4*

- **Patterns used**: section header callouts, intro callout, tables in gray callouts, architecture layers, columns, blue blockquotes, bottom navigation
- **Patterns avoided**: labeled steps with background colors, colored inline text
- **Color palette**: red_bg=section headers, blue_bg=objectives/key statements, green_bg=next steps/success, yellow_bg=table headers/caution, purple_bg=architecture/innovation, gray_bg=tables/reference
- **Colors avoided**: orange_bg rarely used
- **Callout density**: high — nearly every section wrapped in callouts
- **Section header style**: colored callout headers (red_bg primary, green_bg for positive sections)
- **Column usage**: occasional — 2-column for paired content
- **Table style**: in gray callouts with yellow_bg header rows
- **Toggle usage**: for supplementary content only (metrics, ticket lists)
- **Visual density**: dense — information-rich sections, minimal whitespace
- **Intro pattern**: owner+purpose callout with italic context note
- **Content structure**: mixed — bullets for lists, prose for explanations, tables for structured data
- **Signature moves**: owner/purpose/date callout on every page; "Why It Matters" comparison tables; phased implementation with owners and blocking flags
```

---

## Memory Structure

The full memory block should look like this:

```markdown
## NOTION Design Profiles

### technical-structured
[profile]

### minimal-clean
[profile]
```

---

## Profile Naming

Use freeform descriptive names that capture the aesthetic:
- `technical-structured` — dense, callout-heavy, table-rich
- `minimal-clean` — sparse, content-focused, few callouts
- `colorful-layered` — heavy color use, architecture layers, stacked callouts
- `proposal-formal` — red section headers, phased plans, comparison tables

If the user provides a name ("Learn my Notion style as 'technical'"), use it.
If not, auto-generate from the dominant patterns observed.

---

## Keeping Profiles Compact

Memory space is shared with other tools. Aim for 12-18 lines per profile
using required fields. Only add optional fields when they carry real signal.

Three profiles at 15 lines each ≈ 450 words. That's well within budget.

---

## Profile Updates

When updating a profile with new sample pages:
- Increment `Pages analyzed` count
- Update `Last updated` date
- Merge new patterns into existing profile
- If patterns conflict, note the variance:
  `- **Callout density**: high (moderate on shorter docs)`
- Never silently overwrite — confirm changes with the user
