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
  number: string;
  title: string;
  description: string;
  body: string;
};

type SkillCard = {
  id: string;
  title: string;
  description: string;
  tag: string;
  githubUrl: string;
};

const prompts: PromptCard[] = [
  {
    id: "build-brain",
    category: "Setup",
    number: "01 / 06",
    title: "Build my brain",
    description: "Give OpenCode a structured memory of your stack, style, and preferences.",
    body: "[PASTE PROMPT HERE]",
  },
  {
    id: "connect-app",
    category: "Integration",
    number: "02 / 06",
    title: "Connect me to any app",
    description: "Wire OpenCode into an external API or service using the details you provide.",
    body: "[PASTE PROMPT HERE]",
  },
  {
    id: "find-skill",
    category: "Discovery",
    number: "03 / 06",
    title: "Find me a skill",
    description: "Search the skill registry for the right tool to solve your current task.",
    body: "[PASTE PROMPT HERE]",
  },
  {
    id: "github-login",
    category: "Authentication",
    number: "04 / 06",
    title: "Log me in to GitHub",
    description: "Set up a secure GitHub connection so OpenCode can push and pull for you.",
    body: "[PASTE PROMPT HERE]",
  },
  {
    id: "work-project",
    category: "Execution",
    number: "05 / 06",
    title: "Let's work on this project",
    description: "Hand OpenCode a project brief and let it plan the first steps.",
    body: "[PASTE PROMPT HERE]",
  },
  {
    id: "ask-stuck",
    category: "Troubleshooting",
    number: "06 / 06",
    title: "Ask OpenCode when you're stuck",
    description: "Turn a blocker into a clear question and get a useful next move.",
    body: "[PASTE PROMPT HERE]",
  },
];

const skills: SkillCard[] = [
  {
    id: "skill-1",
    title: "Skill title one",
    description: "A one-line description of what this skill does for the reader.",
    tag: "Does something useful",
    githubUrl: "https://github.com/example/repo-one",
  },
  {
    id: "skill-2",
    title: "Skill title two",
    description: "A one-line description of what this skill does for the reader.",
    tag: "Does something useful",
    githubUrl: "https://github.com/example/repo-two",
  },
  {
    id: "skill-3",
    title: "Skill title three",
    description: "A one-line description of what this skill does for the reader.",
    tag: "Does something useful",
    githubUrl: "https://github.com/example/repo-three",
  },
  {
    id: "skill-4",
    title: "Skill title four",
    description: "A one-line description of what this skill does for the reader.",
    tag: "Does something useful",
    githubUrl: "https://github.com/example/repo-four",
  },
];

function OpenCodeLibraryPage() {
  const [activeTab, setActiveTab] = useState<Tab>("prompts");

  return (
    <div className="min-h-screen bg-background pb-24">
      <TopBar activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="mx-auto max-w-[900px] px-4 pt-6 md:pt-10">
        <HeroCard promptCount={prompts.length} skillCount={skills.length} />
        <HowToUseCard />

        <section aria-label={activeTab === "prompts" ? "Prompts" : "Skills"} className="mt-8">
          {activeTab === "prompts" ? (
            <div className="flex flex-col gap-6">
              {prompts.map((prompt) => (
                <PromptCard key={prompt.id} prompt={prompt} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {skills.map((skill) => (
                <SkillCardComponent key={skill.id} skill={skill} />
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

function HeroCard({ promptCount, skillCount }: { promptCount: number; skillCount: number }) {
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

      <div className="mt-6 flex flex-wrap gap-3">
        <StatPill label={`${promptCount} prompts`} />
        <StatPill label={`${skillCount} skills`} />
      </div>
    </article>
  );
}

function StatPill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-cream px-4 py-2 text-sm font-semibold text-foreground">
      {label}
    </span>
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
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
          {prompt.category}
        </span>
        <span className="text-xs font-semibold text-muted-foreground">{prompt.number}</span>
      </div>

      <h3 className="mt-3 font-display text-[28px] font-bold text-foreground">{prompt.title}</h3>
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
