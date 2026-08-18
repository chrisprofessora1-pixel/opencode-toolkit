import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Copy, ExternalLink } from "lucide-react";
import { cn, copyToClipboard } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The OpenCode Library" },
      { name: "description", content: "Copy, paste, make them yours. The resource page for paid subscribers of OpenCode by Chris Castelli." },
      { property: "og:title", content: "The OpenCode Library" },
      { property: "og:description", content: "Copy, paste, make them yours. The resource page for paid subscribers of OpenCode by Chris Castelli." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OpenCodeLibraryPage,
});

type Tab = "prompts" | "skills";

type PromptCard = {
  id: string;
  category: string;
  title: string;
  description: string;
  body: string;
};

type SkillCard = {
  id: string;
  category: string;
  title: string;
  description: string;
  tag: string;
  githubUrl: string;
};

const prompts: PromptCard[] = [
  {
    id: "build-brain",
    category: "Setup",
    title: "Build my brain",
    description: "Give OpenCode a folder and a Notion page so your projects, preferences and useful stuff follow you around.",
    body: `You're going to help me set up what I call my brain. It has two pieces: a folder on my computer and a Notion page. We're doing this one step at a time, and you will not move on to the next step until I tell you we're done.

Step 1: Create the folder. Ask me where I want it and what I want to call it, then tell me exactly how to create it, or create it for me.

Step 2: Notion pages. Give me the structure to build: one main page called My Brain, with subpages called Projects, Skills, Brand and Important Links. Walk me through creating each one.

Step 3: Notion API. Walk me through creating an integration at notion.so/my-integrations, connecting it to the My Brain page, and getting the token. Go slowly, one click at a time, and ask me what I see on my screen before giving me the next instruction.

Step 4: Save the token somewhere secure and tell me where to keep it.

Explain everything like you're talking to a smart friend who just hasn't done this before. No jargon I'd have to google.`,
  },
  {
    id: "connect-app",
    category: "Integration",
    title: "Connect me to any app",
    description: "Wire OpenCode into the apps you actually use, one step at a time.",
    body: `Connect me to [APP NAME]. Walk me through it one step at a time: tell me what to click, where to go and what to paste, and wait for me to tell you what I see before you give me the next step. When it's done, tell me how to test that it's actually connected.

Swap [APP NAME] for what you need:
- "Connect me to Google Calendar."
- "Connect me to Gmail."
- "Connect me to Notion."
- "Connect me to my Google Drive."
- "Set up browser control for me."`,
  },
  {
    id: "lovable-handoff",
    category: "Integration",
    title: "Bring my Lovable project in",
    description: "Bring a Lovable project into OpenCode through GitHub, step by step.",
    body: `I have a project in Lovable. Walk me through connecting it to GitHub so I can bring it into OpenCode. Go slowly: tell me exactly what to click in Lovable, where the project link is, and what to do with it in OpenCode. Wait for me at every step.`,
  },
  {
    id: "github-login",
    category: "Authentication",
    title: "Log me in to GitHub",
    description: "Set up GitHub so you can bring Lovable projects into OpenCode.",
    body: `Help me set up GitHub. Walk me through creating an account if I don't have one, logging in, and creating a repository. One step at a time, plain language, wait for me at every step.`,
  },
  {
    id: "find-skill",
    category: "Discovery",
    title: "Find me a skill",
    description: "Search GitHub for the skill you need without pretending you know what you're looking at.",
    body: `Find me a GitHub skill for [MAKING INSTAGRAM CAROUSELS / BROWSER CONTROL / STUDENT WORKSHEETS / NOTION PAGES]. Give me the link and tell me what it does in one or two lines, in plain language, before I install anything.`,
  },
  {
    id: "make-skill",
    category: "Discovery",
    title: "Make me a custom skill",
    description: "Turn your own instructions into a skill you can load in any chat.",
    body: `I want to turn this into a skill: [DESCRIBE YOUR PROCESS, YOUR RULES AND ONE EXAMPLE]. Package it as a skill I can load in any chat, name it something I'll actually remember, and tell me how to use it.`,
  },
  {
    id: "work-project",
    category: "Execution",
    title: "Let's work on this project",
    description: "Open a project from your brain folder and pick up where you left off.",
    body: `Open the project [PROJECT NAME] from my brain folder. Read everything in it first, then tell me what the project is and what it currently does. Wait for my instructions before you change anything.`,
  },
  {
    id: "keep-improving",
    category: "Execution",
    title: "Keep improving one project",
    description: "Keep editing the same project instead of rebuilding it every time.",
    body: `Open my project [PROJECT NAME]. I want to keep working on the same project instead of starting over. Make this change: [DESCRIBE THE CHANGE]. Match the existing style, and tell me what you changed.`,
  },
  {
    id: "review-work",
    category: "Execution",
    title: "Review my work",
    description: "Get an honest read on your work before you change anything.",
    body: `Read [PROJECT OR FILE] carefully. Tell me what's working, what's broken, and the two changes that would improve it the most. Don't change anything yet. Wait for my approval.`,
  },
  {
    id: "schedule-task",
    category: "Automation",
    title: "Schedule a task",
    description: "Set a task to run later and know where to check on it.",
    body: `Schedule this task for me: [DESCRIBE THE TASK]. Tell me when it's set for, how to see it, and how to cancel it if I change my mind.`,
  },
  {
    id: "ask-stuck",
    category: "Troubleshooting",
    title: "Ask OpenCode when you're stuck",
    description: "Turn a blocker into a plain-language question and get a useful next move.",
    body: `I'm stuck on [WHAT YOU'RE TRYING TO DO]. Walk me through this one step at a time: tell me exactly what to click and where, and wait for me to tell you what I see before you give me the next step. Assume I know nothing about this and don't make me feel dumb about it.`,
  },
  {
    id: "read-screenshot",
    category: "Troubleshooting",
    title: "Read a screenshot",
    description: "Show OpenCode an image that lives on your computer, not in the chat.",
    body: `Read the image called [FILENAME] in my Downloads folder and tell me what it shows.

Or, for the Desktop:

Look at the screenshot on my Desktop called [FILENAME] and tell me what it shows.`,
  },
];

const skills: SkillCard[] = [
  {
    id: "brand-kit",
    category: "Brand",
    title: "Brand kit",
    description: "My colors, fonts and voice, so everything you make looks like me.",
    tag: "brand",
    githubUrl: "https://github.com/chrisprofessora1-pixel/opencode-toolkit/tree/main/skills/brand-kit",
  },
  {
    id: "voice-check",
    category: "Brand",
    title: "Voice check",
    description: "Removes the AI tells from your writing so it sounds like you, not a robot.",
    tag: "voice",
    githubUrl: "https://github.com/chrisprofessora1-pixel/opencode-toolkit/tree/main/skills/sem-cara-de-ia",
  },
  {
    id: "create-your-voice",
    category: "Brand",
    title: "Create your own voice",
    description: "Captures your writing voice and turns it into a guide you can reuse.",
    tag: "voice",
    githubUrl: "https://github.com/chrisprofessora1-pixel/opencode-toolkit/tree/main/skills/voice-analysis",
  },
  {
    id: "design-taste",
    category: "Design",
    title: "Design like Claude",
    description: "Anti-slop frontend design: distinctive interfaces that don't look templated.",
    tag: "design",
    githubUrl: "https://github.com/chrisprofessora1-pixel/opencode-toolkit/tree/main/skills/design-taste-frontend",
  },
  {
    id: "landing-pages",
    category: "Design",
    title: "Landing pages",
    description: "Builds landing pages that convert: layout, hero section, CTA psychology.",
    tag: "pages",
    githubUrl: "https://github.com/chrisprofessora1-pixel/opencode-toolkit/tree/main/skills/landing-page-design",
  },
  {
    id: "carousels",
    category: "Content",
    title: "Instagram carousels",
    description: "Builds your carousels in your style, slide by slide.",
    tag: "carousels",
    githubUrl: "https://github.com/chrisprofessora1-pixel/opencode-toolkit/tree/main/skills/squad-carrossel-fera",
  },
  {
    id: "video-editor",
    category: "Content",
    title: "Video editor",
    description: "Edits your videos: removes the filler and silence, adds captions.",
    tag: "video",
    githubUrl: "https://github.com/chrisprofessora1-pixel/opencode-toolkit/tree/main/skills/video-editor",
  },
  {
    id: "copywriting",
    category: "Marketing",
    title: "Copywriting",
    description: "Writes and rewrites marketing copy that persuades and converts.",
    tag: "copy",
    githubUrl: "https://github.com/chrisprofessora1-pixel/opencode-toolkit/tree/main/skills/copywriting",
  },
  {
    id: "seo-audit",
    category: "Marketing",
    title: "SEO audit",
    description: "Audits your site and finds out why you're not ranking.",
    tag: "seo",
    githubUrl: "https://github.com/chrisprofessora1-pixel/opencode-toolkit/tree/main/skills/seo-audit",
  },
  {
    id: "browser-control",
    category: "Tools",
    title: "Browser control",
    description: "Controls the browser and does things on the web for you.",
    tag: "browser",
    githubUrl: "https://github.com/chrisprofessora1-pixel/opencode-toolkit/tree/main/skills/browser-control",
  },
  {
    id: "notion-pages",
    category: "Tools",
    title: "Notion pages",
    description: "Builds properly designed Notion pages, not a wall of text.",
    tag: "notion",
    githubUrl: "https://github.com/chrisprofessora1-pixel/opencode-toolkit/tree/main/skills/notion-beautifier",
  },
  {
    id: "find-skills",
    category: "Tools",
    title: "Find skills",
    description: "Finds and installs skills for you, so you don't hunt repositories.",
    tag: "meta",
    githubUrl: "https://github.com/chrisprofessora1-pixel/opencode-toolkit/tree/main/skills/find-skills",
  },
];

const teacherPrompts: PromptCard[] = [
  {
    id: "t-worksheet",
    category: "For teachers",
    title: "Make a worksheet",
    description: "A ready worksheet for your class, with space to fill in.",
    body: `Make a worksheet about [TOPIC] for [AGE OR LEVEL]. Mix exercise types and leave space for students to fill in their answers.`,
  },
  {
    id: "t-exam",
    category: "For teachers",
    title: "Build an exam",
    description: "An English exam in the school format, ready to use.",
    body: `Build an exam about [TOPIC] for [LEVEL]. Use multiple choice questions, numbered tasks with values, and a reading section.`,
  },
  {
    id: "t-discussion",
    category: "For teachers",
    title: "Discussion questions",
    description: "Questions that make the next class actually talk.",
    body: `Based on [MATERIAL], give me questions to discuss in the next class. They should get students talking, not answering yes or no.`,
  },
  {
    id: "t-lesson",
    category: "For teachers",
    title: "Plan a lesson",
    description: "A structured lesson, from topic to activity to assessment.",
    body: `Turn [TOPIC] into a lesson plan for [AGE OR LEVEL] with timing, activities and a quick assessment.`,
  },
  {
    id: "t-retrieval",
    category: "For teachers",
    title: "Retrieval opener",
    description: "A quick quiz to start the lesson and see what stuck.",
    body: `Make a quick retrieval quiz on [TOPIC] with easy, medium and harder questions to start the lesson.`,
  },
  {
    id: "t-game",
    category: "For teachers",
    title: "Build me a game",
    description: "Make a simple game, for whatever you need it for.",
    body: `Make a game for me. Keep it simple and fun, and tell me how to open it. I'll tell you what I want it for. When I send you new ideas, add them to the same game instead of starting over.`,
  },
];

const teacherSkills: SkillCard[] = [
  {
    id: "t-exam-skill",
    category: "For teachers",
    title: "Exam builder",
    description: "Builds English exams in the school format, ready to use.",
    tag: "tests",
    githubUrl: "https://github.com/chrisprofessora1-pixel/opencode-toolkit/tree/main/skills/murilo-prova",
  },
  {
    id: "t-discussion-skill",
    category: "For teachers",
    title: "Discussion questions",
    description: "Generates discussion questions for your next class.",
    tag: "class",
    githubUrl: "https://github.com/chrisprofessora1-pixel/opencode-toolkit/tree/main/skills/perguntas-para-aula",
  },
  {
    id: "t-lesson-skill",
    category: "For teachers",
    title: "Lesson plans",
    description: "Turns a topic into a structured lesson plan with timing and activities.",
    tag: "lessons",
    githubUrl: "https://github.com/chrisprofessora1-pixel/opencode-toolkit/tree/main/skills/teaching-lesson-plan",
  },
  {
    id: "t-retrieval-skill",
    category: "For teachers",
    title: "Retrieval practice",
    description: "Quick revision quizzes at different difficulties.",
    tag: "revision",
    githubUrl: "https://github.com/chrisprofessora1-pixel/opencode-toolkit/tree/main/skills/retrieval-practice-generator",
  },
  {
    id: "t-vocab-skill",
    category: "For teachers",
    title: "Vocabulary tiers",
    description: "Sorts the words in a text into everyday, academic and technical, so you know what to teach first.",
    tag: "vocabulary",
    githubUrl: "https://github.com/chrisprofessora1-pixel/opencode-toolkit/tree/main/skills/vocabulary-tiering-tool",
  },
  {
    id: "t-worksheet-skill",
    category: "For teachers",
    title: "Worksheets",
    description: "Student worksheets and vocabulary homework, ready to fill in.",
    tag: "worksheets",
    githubUrl: "https://github.com/chrisprofessora1-pixel/opencode-toolkit/tree/main/skills/licao-de-casa",
  },
];

const PROMPT_GROUP_ORDER = [
  "Setup",
  "Integration",
  "Authentication",
  "Discovery",
  "Execution",
  "Automation",
  "Troubleshooting",
  "For teachers",
];

const SKILL_GROUP_ORDER = ["Brand", "Design", "Content", "Marketing", "Tools", "For teachers"];

function groupByCategory<T extends { category: string }>(items: T[], order: string[]) {
  return order
    .map((category) => ({ category, items: items.filter((item) => item.category === category) }))
    .filter((group) => group.items.length > 0);
}

function OpenCodeLibraryPage() {
  const [activeTab, setActiveTab] = useState<Tab>("prompts");

  const promptGroups = groupByCategory([...prompts, ...teacherPrompts], PROMPT_GROUP_ORDER);
  const skillGroups = groupByCategory([...skills, ...teacherSkills], SKILL_GROUP_ORDER);

  return (
    <div className="min-h-screen bg-background pb-24">
      <TopBar activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="mx-auto max-w-[900px] px-4 pt-6 md:pt-10">
        <HeroCard />
        <HowToUseCard />

        <section aria-label={activeTab === "prompts" ? "Prompts" : "Skills"} className="mt-8">
          {activeTab === "prompts" ? (
            <div className="flex flex-col gap-8">
              {promptGroups.map((group) => (
                <CategoryBlock key={group.category} label={group.category}>
                  {group.items.map((prompt) => (
                    <PromptCard key={prompt.id} prompt={prompt} />
                  ))}
                </CategoryBlock>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-8">
              {skillGroups.map((group) => (
                <CategoryBlock key={group.category} label={group.category}>
                  {group.items.map((skill) => (
                    <SkillCardComponent key={skill.id} skill={skill} />
                  ))}
                </CategoryBlock>
              ))}
            </div>
          )}
        </section>

        <FinalCTA />
      </main>
    </div>
  );
}

function TopBar({ activeTab, onTabChange }: { activeTab: Tab; onTabChange: (tab: Tab) => void }) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[900px] flex-col items-start justify-between gap-4 px-4 py-4 md:flex-row md:items-center">
        <span className="font-display text-lg font-bold text-foreground">The OpenCode Library</span>

        <nav
          role="tablist"
          aria-label="Resource sections"
          className="flex w-full gap-2 md:w-auto"
        >
          <TabButton active={activeTab === "prompts"} onClick={() => onTabChange("prompts")}>
            Prompts
          </TabButton>
          <TabButton active={activeTab === "skills"} onClick={() => onTabChange("skills")}>
            Skills
          </TabButton>
        </nav>
      </div>
    </header>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
        active
          ? "bg-primary text-primary-foreground"
          : "border border-input bg-transparent text-foreground hover:bg-secondary"
      )}
    >
      {children}
    </button>
  );
}

function CategoryBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">{label}</h3>
      <div className="mt-3 flex flex-col gap-6">{children}</div>
    </div>
  );
}

function HeroCard() {
  return (
    <article className="rounded-[24px] border border-border bg-card p-6 shadow-sm md:p-10">
      <span className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
        The resource page · paid subscribers
      </span>
      <h1 className="mt-4 font-display text-[48px] font-extrabold leading-[1.05] text-foreground md:text-[64px]">
        The OpenCode{" "}
        <span className="font-editorial text-chai">Library</span>
      </h1>
      <p className="mt-3 text-[17px] font-semibold text-foreground">copy, paste, make them yours.</p>
      <p className="mt-4 max-w-[620px] text-[17px] leading-relaxed text-muted-foreground">
        This is where paid subscribers grab the exact prompts and skill links I use with OpenCode.
        No fluff. Just open the right tab, copy what you need, and paste it in.
      </p>
    </article>
  );
}

function HowToUseCard() {
  return (
    <article className="mt-6 rounded-[24px] bg-cream p-6 md:p-8">
      <h2 className="font-display text-2xl font-bold text-foreground">How to use</h2>
      <ol className="mt-5 grid list-none gap-5 sm:grid-cols-3">
        <Step number="01" text="Open the right tab" />
        <Step number="02" text="Copy the card you need" />
        <Step number="03" text="Paste it into OpenCode and watch it work" />
      </ol>
    </article>
  );
}

function Step({ number, text }: { number: string; text: string }) {
  return (
    <li className="flex items-start gap-4">
      <span className="font-display text-[28px] font-bold text-chai">{number}</span>
      <p className="mt-1 text-[17px] font-semibold leading-snug text-foreground">{text}</p>
    </li>
  );
}

function PromptCard({ prompt }: { prompt: PromptCard }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const ok = await copyToClipboard(prompt.body);
    if (!ok) return;
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article className="rounded-[24px] border border-border bg-card p-6 shadow-sm md:p-8">
      <h3 className="font-display text-[28px] font-bold text-foreground">{prompt.title}</h3>
      <p className="mt-1 text-[17px] text-muted-foreground">{prompt.description}</p>

      <div className="relative mt-5 rounded-[20px] bg-ink p-5 md:p-6">
        <button
          onClick={handleCopy}
          className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-card px-3 py-1.5 text-xs font-semibold text-ink transition-colors hover:bg-cream"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              Copy prompt
            </>
          )}
        </button>
        <div className="pr-2 pt-8 md:pt-0 md:pr-28">
          <p className="whitespace-pre-wrap text-[17px] leading-relaxed text-white">
            <PromptText text={prompt.body} />
          </p>
        </div>
      </div>
    </article>
  );
}

function PromptText({ text }: { text: string }) {
  const parts = text.split(/(\[.*?\])/g);
  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith("[") && part.endsWith("]")) {
          return (
            <span key={index} className="text-chai">
              {part}
            </span>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
}

function SkillCardComponent({ skill }: { skill: SkillCard }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const ok = await copyToClipboard(skill.githubUrl);
    if (!ok) return;
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article className="rounded-[24px] border border-border bg-card p-6 shadow-sm md:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex-1">
          <h3 className="font-display text-[28px] font-bold text-foreground">{skill.title}</h3>
          <p className="mt-1 text-[17px] text-muted-foreground">{skill.description}</p>
          <span className="mt-3 inline-flex items-center rounded-full bg-cream px-3 py-1 text-xs font-semibold text-foreground">
            {skill.tag}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleCopy}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
              copied
                ? "bg-espresso text-warm-beige"
                : "border border-input bg-transparent text-foreground hover:bg-secondary"
            )}
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copied" : "Copy"}
          </button>
          <a
            href={skill.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Open link
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </article>
  );
}

function FinalCTA() {
  return (
    <article className="mt-10 rounded-[24px] bg-ink p-6 text-warm-beige md:p-10">
      <span className="text-xs font-bold uppercase tracking-[0.15em] text-chai">One matcha</span>
      <h2 className="mt-4 font-display text-[32px] font-bold leading-[1.1] md:text-[40px]">
        Copy, paste,{" "}
        <span className="font-editorial text-chai">make them yours</span>.
      </h2>
      <p className="mt-4 max-w-[620px] text-[17px] leading-relaxed text-warm-beige/80">
        Take what works. Ignore what doesn't. Build your own OpenCode workflow, one copy at a time.
      </p>
      <div className="mt-8 border-t border-warm-beige/10 pt-6">
        <p className="text-sm font-semibold text-warm-beige/90">Chris Castelli · @profchriscastelli</p>
      </div>
    </article>
  );
}