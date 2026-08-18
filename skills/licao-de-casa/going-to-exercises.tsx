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
  // ---------- GOING TO ----------
  {
    id: "gt-1",
    type: "fill-blank",
    prompt: "Next Saturday I ______ (visit) my cousin.",
    answer: "am going to visit",
    accept: ["i'm going to visit"],
  },
  {
    id: "gt-2",
    type: "fill-blank",
    prompt: "Look at those clouds! It ______ (rain).",
    answer: "is going to rain",
  },
  {
    id: "gt-3",
    type: "multiple-choice",
    prompt:
      "She ______ to Japan next month (she already bought the tickets).",
    options: ["will travel", "is going to travel", "travels"],
    answer: 1,
  },
  {
    id: "gt-4",
    type: "reorder",
    words: ["going", "visit", "I'm", "my", "to", "grandma"],
    answer: "I'm going to visit my grandma",
  },
  {
    id: "gt-5",
    type: "true-false",
    prompt: "They are go to play football.",
    answer: false,
    explanation: "Correct: They are going to play football.",
  },
  {
    id: "gt-6",
    type: "true-false",
    prompt: "We're going to meet at 5:00.",
    answer: true,
    explanation: "Correct! 'are going to' + base verb.",
  },

  // ---------- WILL / WON'T ----------
  {
    id: "wl-1",
    type: "multiple-choice",
    prompt: "I promise I ______ call you tomorrow.",
    options: ["will", "going to", "am"],
    answer: 0,
  },
  {
    id: "wl-2",
    type: "fill-blank",
    prompt: "Don't worry, I ______ (not / forget) your birthday.",
    answer: "won't forget",
    accept: ["will not forget"],
  },
  {
    id: "wl-3",
    type: "true-false",
    prompt: "She will helps you with the homework.",
    answer: false,
    explanation: "Correct: She will help you. (base verb after will)",
  },
  {
    id: "wl-4",
    type: "reorder",
    words: ["help", "they", "will", "us"],
    answer: "They will help us",
  },

  // ---------- IF + PRESENT + WILL (first conditional) ----------
  {
    id: "if-1",
    type: "fill-blank",
    prompt: "If I ______ (study) more, I ______ (pass) the exam.",
    answer: "study / will pass",
  },
  {
    id: "if-2",
    type: "multiple-choice",
    prompt: "If it rains tomorrow, we ______ at home.",
    options: ["stay", "will stay", "stayed"],
    answer: 1,
  },
  {
    id: "if-3",
    type: "reorder",
    words: ["If", "you", "hurry", "you", "will", "be", "on", "time"],
    answer: "If you hurry, you will be on time",
  },
  {
    id: "if-4",
    type: "true-false",
    prompt: "If she comes early, she will help us.",
    answer: true,
    explanation: "Correct: if + present, will + base verb.",
  },
  {
    id: "if-5",
    type: "true-false",
    prompt: "If I will have time, I will call you.",
    answer: false,
    explanation: "Use present after 'if': If I have time, I will call you.",
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
        Future with <b>going to</b>, <b>will / won't</b> and the{" "}
        <b>first conditional</b>.
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
