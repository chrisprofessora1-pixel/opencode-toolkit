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
  // ---------- PREPOSITIONS OF PLACE & DIRECTIONS ----------
  {
    id: "pp-1",
    type: "fill-blank",
    prompt: "The bakery is ______ the corner of Main Street and Park Avenue.",
    answer: "on",
  },
  {
    id: "pp-2",
    type: "fill-blank",
    prompt: "The cat is sleeping ______ the sofa, so we can't see it.",
    answer: "under",
  },
  {
    id: "pp-3",
    type: "fill-blank",
    prompt: "There are dark clouds ______ the mountains, high in the sky.",
    answer: "above",
    accept: ["over"],
  },
  {
    id: "pp-4",
    type: "fill-blank",
    prompt: "The car is parked ______ the building, so I can't see it.",
    answer: "behind",
  },
  {
    id: "pp-5",
    type: "fill-blank",
    prompt: "The doctor's office is ______ from the school.",
    answer: "across",
  },
  {
    id: "pp-6",
    type: "fill-blank",
    prompt: "The bank is ______ the supermarket and the pharmacy.",
    answer: "between",
    accept: ["in between"],
  },
  {
    id: "pp-7",
    type: "fill-blank",
    prompt: "The pharmacy is ______ my house, only five minutes away.",
    answer: "near",
  },
  {
    id: "pp-8",
    type: "multiple-choice",
    prompt: "The plane flew ______ the mountains.",
    options: ["over", "beside", "under"],
    answer: 0,
  },
  {
    id: "pp-9",
    type: "multiple-choice",
    prompt: "The children are sitting ______ their mother in the park.",
    options: ["beside", "above", "under"],
    answer: 0,
  },
  {
    id: "pp-10",
    type: "multiple-choice",
    prompt: "Is there a bank ______?",
    options: ["nearby", "straight", "behind"],
    answer: 0,
  },
  {
    id: "pp-11",
    type: "multiple-choice",
    prompt: "The hotel is right ______ the beach.",
    options: ["in front of", "behind", "under"],
    answer: 0,
  },
  {
    id: "pp-12",
    type: "reorder",
    words: ["the", "bank", "is", "next", "to", "the", "supermarket"],
    answer: "The bank is next to the supermarket",
  },
  {
    id: "pp-13",
    type: "reorder",
    words: ["walk", "straight", "down", "this", "street"],
    answer: "Walk straight down this street",
  },
  {
    id: "pp-14",
    type: "reorder",
    words: ["the", "park", "is", "in", "front", "of", "the", "library"],
    answer: "The park is in front of the library",
  },
  {
    id: "pp-15",
    type: "reorder",
    words: ["the", "dog", "is", "in", "the", "garden"],
    answer: "The dog is in the garden",
  },
  {
    id: "pp-16",
    type: "true-false",
    prompt: "The bus stop is next to the bakery.",
    answer: true,
    explanation: "Correct! 'next to' = beside, very close to.",
  },
  {
    id: "pp-17",
    type: "true-false",
    prompt: "She put the cup under the table.",
    answer: true,
    explanation: "Correct! 'under' = below something.",
  },
  {
    id: "pp-18",
    type: "true-false",
    prompt: "The sun is above the clouds.",
    answer: true,
    explanation: "Correct! 'above' = higher than something else.",
  },
  {
    id: "pp-19",
    type: "true-false",
    prompt: "The meeting starts in 9 o'clock.",
    answer: false,
    explanation: "Use 'at' with clock time: The meeting starts at 9 o'clock.",
  },
  {
    id: "pp-20",
    type: "true-false",
    prompt: "The cinema is across to the park.",
    answer: false,
    explanation: "Correct: The cinema is across from the park.",
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
        Prepositions of place and directions: <b>on</b>, <b>in</b>, <b>at</b>,{" "}
        <b>over</b>, <b>above</b>, <b>beside</b>, <b>next to</b>, <b>near</b>,{" "}
        <b>nearby</b>, <b>behind</b>, <b>under</b>, <b>across from</b>,{" "}
        <b>in front of</b>, <b>straight</b>, <b>between</b>.
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