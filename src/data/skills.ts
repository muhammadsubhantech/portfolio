export type SkillLevel = "Learning" | "Hands-on" | "Working Knowledge" | "Exploring";

export type Skill = {
  name: string;
  level: SkillLevel;
  note: string;
};

export type SkillGroup = {
  id: string;
  title: string;
  items: Skill[];
};

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: "ai",
    title: "AI & Machine Learning",
    items: [
      {
        name: "Artificial Intelligence",
        level: "Learning",
        note: "Foundations, practical applications and system thinking.",
      },
      {
        name: "Machine Learning",
        level: "Hands-on",
        note: "Building understanding through models, evaluation and experiments.",
      },
      {
        name: "Deep Learning",
        level: "Exploring",
        note: "Neural networks, representations and training fundamentals.",
      },
      {
        name: "Agentic AI",
        level: "Learning",
        note: "Tool-using agents, planning loops and reliable evaluation.",
      },
    ],
  },
  {
    id: "programming",
    title: "Programming",
    items: [
      {
        name: "Python",
        level: "Hands-on",
        note: "Primary language for AI, data work, scripting and automation.",
      },
      {
        name: "SQL",
        level: "Working Knowledge",
        note: "Querying, joining and aggregating structured data.",
      },
    ],
  },
  {
    id: "data",
    title: "Data",
    items: [
      {
        name: "Data Analysis",
        level: "Hands-on",
        note: "Cleaning, exploring and communicating findings from datasets.",
      },
      {
        name: "Data Processing",
        level: "Learning",
        note: "Transforming raw inputs into analysis-ready tables.",
      },
      {
        name: "Data Engineering",
        level: "Exploring",
        note: "Pipelines, quality checks and reliable data movement.",
      },
    ],
  },
  {
    id: "development",
    title: "Development",
    items: [
      {
        name: "Automation",
        level: "Hands-on",
        note: "Python scripts that reduce repetitive work with clear safeguards.",
      },
      {
        name: "Model Development",
        level: "Learning",
        note: "Training, validating and iterating on machine learning models.",
      },
      {
        name: "Deployment fundamentals",
        level: "Exploring",
        note: "Packaging, serving and documenting models and scripts.",
      },
    ],
  },
];

export const STACK = [
  { name: "Python", mark: "Py" },
  { name: "SQL", mark: "SQL" },
  { name: "Machine Learning", mark: "ML" },
  { name: "Deep Learning", mark: "DL" },
  { name: "Agentic AI", mark: "AA" },
  { name: "Data Analysis", mark: "DA" },
  { name: "Data Engineering", mark: "DE" },
  { name: "Automation", mark: "Au" },
] as const;

/** Editable list — update as learning focus changes. */
export const CURRENTLY_LEARNING = [
  "Machine Learning model evaluation",
  "CNN and computer vision",
  "Transfer learning",
  "Keras model persistence",
  "Agentic AI workflows",
  "SQL for analytical work",
];
