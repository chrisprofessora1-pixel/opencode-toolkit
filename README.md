# OpenCode Toolkit

BUILD ME A RESOURCE PAGE: "The OpenCode Library".

This is the resource page for my paid Substack post about OpenCode. Readers
are paid subscribers who want to copy the exact prompts and skill links I
mention. It must feel like my personal brand, warm and sharp, and be dead
simple: land, click a tab, copy a card, leave. One language only: English.

BRAND
- Site name: "The OpenCode Library"
- Tagline: "Copy, paste, make them yours."
- Byline: Chris Castelli, @profchriscastelli

COLORS (use exactly these)
- Page background: #FEFCF8 (warm beige)
- Ink for headings and text: #1C1610 (warm black)
- Secondary cream blocks: #F2E8D8
- Card surface: #FFFFFF
- Espresso for primary CTAs and the active tab: #4C3D37
- Chá rosa accent (on dark boxes, italic words, small badges): #D8A490
- Muted text: a soft brown at about 70% of #4C3D37
- Never use cold grays, blues, gold, or burgundy.

FONTS (Google Fonts)
- Headings: Sora, weights 700 and 800
- Body: DM Sans, weights 400, 600, 700
- Editorial accent: Lora italic for single words
- Scale: H1 ~64px, H2 ~40px, card titles ~28px, body 17px,
  eyebrow labels 12px uppercase with 0.15em letter spacing.

SHAPES
- Cards: 24px radius, 1px hairline border in rgba(28,22,16,0.10),
  soft shadow, white background.
- Prompt boxes: dark #1C1610, 20px radius, white text.
- Buttons and pills: fully rounded (999px).

STRUCTURE (single column, max width ~900px, centered)
1. Sticky top bar: "The OpenCode Library" in Sora 700 on the left.
   On the right, a two-tab switcher: "Prompts" and "Skills".
   Active tab is a filled espresso pill; inactive is outlined.
   On mobile, the tabs sit under the logo and stay reachable.
2. Hero (white card): eyebrow "THE RESOURCE PAGE · PAID SUBSCRIBERS",
   H1 "The OpenCode Library" with the word "Library" in Lora italic
   colored chá rosa, subtitle "copy, paste, make them yours.",
   a short intro line, and two stat pills showing the prompt count
   and the skill count.
3. "How to use" cream card (#F2E8D8): three numbered steps:
   01 Open the right tab, 02 Copy the card you need, 03 Paste it into
   OpenCode and watch it work.
4. TAB SWITCHING: clicking Prompts or Skills swaps the content below
   without reloading the page.
5. PROMPTS TAB: a vertical stack of prompt cards. Each card has:
   - a meta row: category label (small, uppercase, letter-spaced) and
     a counter like "01 / 06"
   - a title in Sora 700
   - a one-line description in DM Sans, muted
   - a dark prompt box (#1C1610) with white text and a "Copy prompt"
     pill button at the top right. Clicking copies the prompt text
     and the button switches to "Copied" with a checkmark for about
     2 seconds.
   - Any [PLACEHOLDER] in the prompt text highlighted in chá rosa
     #D8A490 on the dark background.
6. SKILLS TAB: the same card shell but lighter. Each skill card has a
   title, a one-line description, a tag pill saying what it does, and
   a "Copy" button plus an "Open link" action pointing to GitHub.
7. Final CTA (dark card #1C1610): eyebrow "ONE MATCHA", H2 "Copy,
   paste, make them yours." with "make them yours" in Lora italic
   chá rosa, a short closing line, and the brand lockup "Chris
   Castelli · @profchriscastelli".

MOBILE: single column, cards full width, large touch targets,
tabs easy to reach.

PLACEHOLDER CONTENT (I will replace all of this right after you
build it, so dummy text is fine):
- Seed 6 prompt cards with these titles and [PASTE PROMPT HERE]
  inside the dark boxes:
  "Build my brain", "Connect me to any app", "Find me a skill",
  "Log me in to GitHub", "Let's work on this project",
  "Ask OpenCode when you're stuck".
- Seed 4 skill cards with dummy titles and a dummy GitHub link each.

DO NOT use em dashes anywhere in visible copy. Keep the voice warm,
direct, no hype.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/db8a6c16-bdf2-4ae1-aef1-55ae74a29daa).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
