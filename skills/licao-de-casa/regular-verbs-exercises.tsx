import { useState } from "react";

type ExerciseType = "multiple-choice" | "fill-blank" | "reorder" | "true-false";

type Exercise =
  | {
      id: string;
      type: "multiple-choice";
      prompt: string;
      options: string[];
      answer: number;
    }
  | {
      id: string;
      type: "fill-blank";
      prompt: string;
      answer: string;
      accept?: string[];
    }
  | {
      id: string;
      type: "reorder";
      words: string[];
      answer: string;
    }
  | {
      id: string;
      type: "true-false";
      prompt: string;
      answer: boolean;
      explanation: string;
    };

export const grammarExercises: Exercise[] = [
  // ---------- SIMPLE PAST: REGULAR VERBS ----------
  {
    id: "rv-1",
    type: "fill-blank",
    prompt: "Yesterday I ______ (watch) a movie.",
    answer: "watched",
  },
  {
    id: "rv-2",
    type: "fill-blank",
    prompt: "She ______ (study) English in London.",
    answer: "studied",
  },
  {
    id: "rv-3",
    type: "multiple-choice",
    prompt: "They ______ their grandma last Sunday.",
    options: ["visited", "visiting", "visits"],
    answer: 0,
  },
  {
    id: "rv-4",
    type: "reorder",
    words: ["watched", "a", "I", "movie", "yesterday"],
    answer: "I watched a movie yesterday",
  },
  {
    id: "rv-5",
    type: "reorder",
    words: ["we", "visited", "grandma", "last", "Sunday"],
    answer: "We visited grandma last Sunday",
  },
  {
    id: "rv-6",
    type: "reorder",
    words: ["she", "decided", "to", "move", "to", "Portugal"],
    answer: "She decided to move to Portugal",
  },
  {
    id: "rv-7",
    type: "true-false",
    prompt: "Yesterday I work very hard.",
    answer: false,
    explanation: "Correct: Yesterday I worked very hard.",
  },
  {
    id: "rv-8",
    type: "true-false",
    prompt: "She studied English in London.",
    answer: true,
    explanation: "Correct! 'studied' is the simple past of 'study'.",
  },
  {
    id: "rv-9",
    type: "true-false",
    prompt: "We didn't needed help.",
    answer: false,
    explanation: "Correct: We didn't need help. (base verb after 'didn't')",
  },
  {
    id: "rv-10",
    type: "true-false",
    prompt: "He stoped the car in front of the house.",
    answer: false,
    explanation: "Correct: He stopped the car. (double the final consonant)",
  },
  {
    id: "rv-11",
    type: "multiple-choice",
    prompt: "She ______ the surprise.",
    options: ["loved", "loveed", "loveded"],
    answer: 0,
  },
  {
    id: "rv-12",
    type: "multiple-choice",
    prompt: "He ______ all night for the exam.",
    options: ["studyed", "studied", "study"],
    answer: 1,
  },
  {
    id: "rv-13",
    type: "fill-blank",
    prompt: "They ______ (cook) dinner together last night.",
    answer: "cooked",
  },
  {
    id: "rv-14",
    type: "fill-blank",
    prompt: "My brother ______ (clean) his room.",
    answer: "cleaned",
  },
  {
    id: "rv-15",
    type: "fill-blank",
    prompt: "I ______ (need) to talk to you.",
    answer: "needed",
  },
  {
    id: "rv-16",
    type: "multiple-choice",
    prompt: "We ______ with the plan.",
    options: ["agreed", "agreeed", "agree"],
    answer: 0,
  },
];

type Status = "correct" | "wrong" | "unanswered";

function isCorrect(ex: Exercise, user: unknown): Status {
  if (user === undefined || user === "" || user === null) return "unanswered";
  switch (ex.type) {
    case "multiple-choice":
      return user === ex.answer ? "correct" : "wrong";
    case "fill-blank": {
      const v = String(user).trim().toLowerCase();
      const accept = [ex.answer, ...(ex.accept ?? [])].map((a) =>
        a.trim().toLowerCase()
      );
      return accept.includes(v) ? "correct" : "wrong";
    }
    case "reorder":
      return String(user) === ex.answer ? "correct" : "wrong";
    case "true-false":
      return user === ex.answer ? "correct" : "wrong";
  }
}

function Card({
  ex,
  index,
  value,
  onChange,
}: {
  ex: Exercise;
  index: number;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  return (
    <div
      style={{
        border: "1px solid #E0D5C5",
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        background: "#fff",
      }}
    >
      <div style={{ fontWeight: 700, marginBottom: 8 }}>
        {index + 1}. {ex.prompt}
      </div>

      {ex.type === "multiple-choice" && (
        <div>
          {ex.options.map((opt, i) => (
            <label
              key={i}
              style={{ display: "block", margin: "4px 0", cursor: "pointer" }}
            >
              <input
                type="radio"
                name={ex.id}
                checked={value === i}
                onChange={() => onChange(i)}
              />{" "}
              {opt}
            </label>
          ))}
        </div>
      )}

      {ex.type === "fill-blank" && (
        <input
          type="text"
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Type your answer..."
          style={{
            width: "100%",
            padding: 8,
            borderRadius: 8,
            border: "1px solid #CCC",
            boxSizing: "border-box",
          }}
        />
      )}

      {ex.type === "true-false" && (
        <div>
          <label style={{ display: "block", cursor: "pointer" }}>
            <input
              type="radio"
              name={ex.id}
              checked={value === true}
              onChange={() => onChange(true)}
            />{" "}
            True
          </label>
          <label style={{ display: "block", cursor: "pointer" }}>
            <input
              type="radio"
              name={ex.id}
              checked={value === false}
              onChange={() => onChange(false)}
            />{" "}
            False
          </label>
        </div>
      )}

      {ex.type === "reorder" && (
        <div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8 }}>
            {ex.words.map((w, i) => (
              <button
                key={i}
                onClick={() => {
                  const parts = (value as string[] | undefined) ?? [];
                  if (!parts.includes(w)) onChange([...parts, w]);
                }}
                style={{
                  padding: "4px 10px",
                  borderRadius: 6,
                  border: "1px solid #CCC",
                  background: partsOf(value).includes(w) ? "#F2E8D8" : "#fff",
                  cursor: "pointer",
                }}
              >
                {w}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap", minHeight: 24 }}>
            {(value as string[] | undefined)?.map((w, i) => (
              <span
                key={i}
                onClick={() =>
                  onChange((value as string[]).filter((_, j) => j !== i))
                }
                style={{
                  background: "#F2E8D8",
                  borderRadius: 6,
                  padding: "2px 8px",
                  cursor: "pointer",
                }}
              >
                {w}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function partsOf(value: unknown): string[] {
  return Array.isArray(value) ? value : [];
}

export default function GrammarQuizApp() {
  const [answers, setAnswers] = useState<Record<string, unknown>>({});
  const [showResult, setShowResult] = useState(false);

  const statuses = grammarExercises.map((ex) => isCorrect(ex, answers[ex.id]));
  const correctCount = statuses.filter((s) => s === "correct").length;

  return (
    <div
      style={{
        fontFamily: "system-ui, sans-serif",
        maxWidth: 640,
        margin: "0 auto",
        padding: 24,
        background: "#FBF2E6",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ fontSize: 28, fontWeight: 700, color: "#1C1610" }}>
        Grammar Review
      </h1>
      <p>
        Simple past with <b>regular verbs</b>.
      </p>

      {grammarExercises.map((ex, i) => (
        <Card
          key={ex.id}
          ex={ex}
          index={i}
          value={answers[ex.id]}
          onChange={(v) =>
            setAnswers((prev) => ({ ...prev, [ex.id]: v }))
          }
        />
      ))}

      <button
        onClick={() => setShowResult(true)}
        style={{
          marginTop: 20,
          padding: "12px 20px",
          fontSize: 16,
          cursor: "pointer",
          borderRadius: 8,
          border: "none",
          background: "#1C1610",
          color: "#FBF2E6",
        }}
      >
        Check my answers
      </button>

      {showResult && (
        <div
          style={{
            marginTop: 24,
            padding: 16,
            borderRadius: 8,
            background: "#F2E8D8",
          }}
        >
          You got <b>{correctCount}</b> of <b>{grammarExercises.length}</b>{" "}
          correct.
        </div>
      )}
    </div>
  );
}