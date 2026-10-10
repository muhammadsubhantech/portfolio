export const NOTE_CATEGORIES = [
  "Artificial Intelligence",
  "Machine Learning",
  "Python",
  "Data Analysis",
  "SQL",
  "Agentic AI",
  "Data Engineering",
  "Learning Journey",
] as const;

export type NoteCategory = (typeof NOTE_CATEGORIES)[number];

export type NoteBlock =
  | { type: "p"; text: string }
  | { type: "h2"; id: string; text: string }
  | { type: "h3"; id: string; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string };

export type Note = {
  slug: string;
  title: string;
  excerpt: string;
  category: NoteCategory;
  date: string;
  readMinutes: number;
  image: string;
  imageAlt: string;
  description: string;
  related: string[];
  blocks: NoteBlock[];
};

export const NOTES: Note[] = [
  {
    slug: "what-is-agentic-ai",
    title: "What is Agentic AI? A clear primer",
    excerpt:
      "A practical explanation of agentic AI: tools, planning loops, evaluation, and why reliability matters more than demos.",
    category: "Agentic AI",
    date: "2026-09-28",
    readMinutes: 8,
    image: "/images/cover-agentic.jpg",
    imageAlt: "Abstract visual for an Agentic AI explainer by Muhammad Subhan",
    description:
      "Learn what Agentic AI is, how tool-using agents work, and how to evaluate them honestly. A clear primer by Muhammad Subhan.",
    related: ["python-for-machine-learning", "starting-in-data-engineering"],
    blocks: [
      {
        type: "p",
        text: "Agentic AI is the idea that a model can do more than answer a single prompt. It can plan a few steps, use tools, inspect results, and continue until a task is done or it should stop. The word “agent” is used loosely in marketing, so it helps to keep a strict definition.",
      },
      { type: "h2", id: "a-working-definition", text: "A working definition" },
      {
        type: "p",
        text: "An agent is a system that observes a goal, chooses actions, uses tools or APIs, and updates its state from the results. A chatbot that only replies in text is not automatically an agent. A script that calls a model once is not automatically an agent either. Agency appears when the system can take sequential actions toward a goal.",
      },
      {
        type: "quote",
        text: "A useful test: if you remove the loop, the tools, and the stopping rules, is anything still “agentic”? If not, those pieces were the product.",
      },
      { type: "h2", id: "the-loop", text: "The loop" },
      {
        type: "ol",
        items: [
          "Read the goal and the current context.",
          "Decide the next action — or decide to stop.",
          "Call a tool: search, code, database, calendar, file, or API.",
          "Observe the tool result, including errors.",
          "Update notes / memory and repeat.",
        ],
      },
      {
        type: "p",
        text: "Most failures live in that loop. The model may invent a tool argument. A tool may return noisy data. The loop may run too long. Good agent design is less about a clever prompt and more about tight tools, traces, and stop conditions.",
      },
      { type: "h2", id: "tools-are-the-product", text: "Tools are the product" },
      {
        type: "p",
        text: "A tool should do one thing, return structured output, and fail loudly. Vague tools produce vague agents. If a tool can send email, write files, and charge a card, the blast radius is too large. Narrow tools are easier to test and easier to trust.",
      },
      { type: "h3", id: "guardrails", text: "Guardrails" },
      {
        type: "ul",
        items: [
          "Allow-list tools instead of giving open computer control.",
          "Cap steps, time, and cost per run.",
          "Require confirmation for irreversible actions.",
          "Log every tool call so a person can audit the path.",
        ],
      },
      { type: "h2", id: "evaluation", text: "Evaluation before theatre" },
      {
        type: "p",
        text: "A polished demo is not evidence. Measure whether the agent completes a known set of tasks, how often it needs a retry, and where it harms data. Include tasks it should refuse. Reliability is the skill; spectacle is the side effect.",
      },
      {
        type: "p",
        text: "If you are starting out, build a tiny agent with two tools and ten evaluation tasks. That will teach more than a large multi-agent diagram.",
      },
      { type: "h2", id: "further-reading-on-this-site", text: "Continue on this site" },
      {
        type: "p",
        text: "Agentic systems still rest on Python, data quality, and honest machine learning habits. See the Python and data engineering notes, then look at the projects page for how case studies are structured.",
      },
    ],
  },
  {
    slug: "python-for-machine-learning",
    title: "Python for machine learning: a practical starting path",
    excerpt:
      "A focused path for learning Python in an ML context: data, models, evaluation, and the habits that keep experiments honest.",
    category: "Python",
    date: "2026-09-22",
    readMinutes: 9,
    image: "/images/cover-python.jpg",
    imageAlt: "Python and machine learning notes cover for Muhammad Subhan",
    description:
      "A practical starting path for using Python in machine learning, covering data work, model training and evaluation, by Muhammad Subhan.",
    related: ["sql-for-data-analysis", "what-is-agentic-ai"],
    blocks: [
      {
        type: "p",
        text: "Python is the common language of machine learning because it sits between data, libraries and experiments. You do not need every library. You need a small stack you can run end to end: load data, inspect it, train a model, evaluate it, and write down what happened.",
      },
      { type: "h2", id: "the-minimum-stack", text: "The minimum stack" },
      {
        type: "ul",
        items: [
          "Python itself: functions, lists, dictionaries, files, virtual environments.",
          "A table library such as pandas for cleaning and slicing data.",
          "A numeric library such as NumPy for arrays.",
          "A model library such as scikit-learn for classical machine learning.",
          "A plotting library so you can see distributions and errors.",
        ],
      },
      {
        type: "p",
        text: "Deep learning frameworks can wait until the classical loop is comfortable. If you cannot explain a train/test split, a larger model will not save the experiment.",
      },
      { type: "h2", id: "an-honest-experiment", text: "An honest experiment" },
      {
        type: "ol",
        items: [
          "Write the question in one sentence.",
          "Name the target variable and the leak risks.",
          "Split data before exploring too aggressively.",
          "Train a simple baseline first — often logistic regression or a tree.",
          "Report a metric that matches the problem, plus a confusion matrix or error plot.",
          "Record the seed, the date, and what you would try next.",
        ],
      },
      { type: "h3", id: "baselines", text: "Baselines beat vibes" },
      {
        type: "p",
        text: "A model that cannot beat a dummy classifier or a simple average is not a result. Baselines keep you honest when a notebook looks busy. They also make later deep learning work meaningful, because you will know the lift.",
      },
      { type: "h2", id: "python-habits", text: "Python habits that transfer" },
      {
        type: "ul",
        items: [
          "Keep raw data immutable; write cleaned copies.",
          "Prefer functions over a 400-line notebook cell.",
          "Do not hand-edit predictions to “make the chart nicer”.",
          "Print shapes after every major transform.",
          "Treat warnings as clues, not noise.",
        ],
      },
      {
        type: "quote",
        text: "The point of Python in ML is not syntax. It is a repeatable path from a question to a measured, limited answer.",
      },
      { type: "h2", id: "where-to-go-next", text: "Where to go next" },
      {
        type: "p",
        text: "After the baseline loop is familiar, add SQL so you can pull your own tables, then study evaluation more deeply — calibration, leakage, and class imbalance. Those topics matter more than collecting new model names.",
      },
    ],
  },
  {
    slug: "sql-for-data-analysis",
    title: "SQL for data analysis: the queries that actually matter",
    excerpt:
      "The SQL patterns that carry most analytical work: filters, joins, aggregations, window functions, and checks for bad data.",
    category: "SQL",
    date: "2026-09-12",
    readMinutes: 8,
    image: "/images/cover-sql.jpg",
    imageAlt: "SQL for data analysis notes by Muhammad Subhan",
    description:
      "Learn the SQL patterns that matter for data analysis: joins, aggregations, window functions and quality checks. Notes by Muhammad Subhan.",
    related: ["starting-in-data-engineering", "python-for-machine-learning"],
    blocks: [
      {
        type: "p",
        text: "Most analytical work is still SQL. If you can filter, join, aggregate and check grain, you can answer a surprising number of questions before a notebook is even open. The goal is not to memorise functions. The goal is to trust the table in front of you.",
      },
      { type: "h2", id: "start-with-grain", text: "Start with grain" },
      {
        type: "p",
        text: "Grain means “what does one row represent?” A row might be a customer, an order, a daily snapshot, or an event. If you aggregate without knowing grain, you will double-count. Ask this before writing SELECT *.",
      },
      { type: "h2", id: "the-core-patterns", text: "The core patterns" },
      {
        type: "ul",
        items: [
          "Filter early with WHERE so you are not analysing the whole history by accident.",
          "Join on stable keys and inspect the row count before and after.",
          "GROUP BY only the columns that define the question.",
          "Use COUNT, SUM, AVG, MIN, MAX with a clear denominator.",
          "Window functions for running totals, ranks and “previous row” comparisons.",
        ],
      },
      { type: "h3", id: "joins", text: "Joins without fiction" },
      {
        type: "p",
        text: "An inner join drops rows that do not match. A left join keeps the left table and fills gaps with nulls. Both are correct in different questions. The mistake is not the join type — it is failing to look at how many rows appeared or disappeared.",
      },
      { type: "h2", id: "quality-checks", text: "Quality checks belong in SQL" },
      {
        type: "ol",
        items: [
          "Count nulls in key columns.",
          "Count duplicates on the supposed unique key.",
          "Check min/max dates for unexpected gaps.",
          "Compare totals to a known source, even a rough one.",
        ],
      },
      {
        type: "quote",
        text: "A beautiful dashboard on unclean joins is still a wrong dashboard.",
      },
      { type: "h2", id: "sql-and-python", text: "SQL and Python together" },
      {
        type: "p",
        text: "Use SQL to get a table with the right grain. Use Python to model, plot, or automate. Pulling an entire warehouse into a laptop is not analysis — it is a transfer of mess. Push the heavy filters to the database; keep the experiment notebook focused.",
      },
      {
        type: "p",
        text: "When you are ready, the data engineering note covers how these queries become pipelines instead of one-off extracts.",
      },
    ],
  },
  {
    slug: "starting-in-data-engineering",
    title: "Starting in data engineering without the theatre",
    excerpt:
      "A beginner-friendly map of data engineering: sources, transforms, storage, quality, and why boring reliability beats novelty.",
    category: "Data Engineering",
    date: "2026-10-02",
    readMinutes: 7,
    image: "/images/cover-engineering.jpg",
    imageAlt: "Data engineering notes cover for Muhammad Subhan",
    description:
      "A clear introduction to data engineering for beginners: pipelines, quality checks and reliability. Written by Muhammad Subhan.",
    related: ["sql-for-data-analysis", "what-is-agentic-ai"],
    blocks: [
      {
        type: "p",
        text: "Data engineering is the work of making data usable on time. It is less glamorous than model demos and more decisive. If the table is late, duplicated, or silently wrong, every dashboard and model downstream inherits that error.",
      },
      { type: "h2", id: "the-shape-of-a-pipeline", text: "The shape of a pipeline" },
      {
        type: "ol",
        items: [
          "Ingest: collect from files, APIs, databases or events.",
          "Transform: clean types, rename fields, join, aggregate.",
          "Store: write to a warehouse, lake, or well-named tables.",
          "Test: check row counts, nulls, uniqueness, freshness.",
          "Serve: expose tables to analysts, apps, or models.",
        ],
      },
      {
        type: "p",
        text: "You can learn this shape with CSV files and Python. A cloud logo is not a prerequisite. The discipline is the same: raw in, trusted out, with a log of what changed.",
      },
      { type: "h2", id: "reliability", text: "Reliability is the skill" },
      {
        type: "ul",
        items: [
          "Idempotency: running the job twice should not duplicate rows.",
          "Freshness: you should know the last successful run.",
          "Schema: a new column should not silently break the next step.",
          "Documentation: a table without grain and owner becomes folklore.",
        ],
      },
      { type: "h3", id: "small-projects", text: "Small projects that teach" },
      {
        type: "p",
        text: "Take a public CSV, write a script that validates it, writes a clean table, and prints a quality report. Schedule it. Break it on purpose — missing file, extra column, duplicate id — and make the script fail clearly. That is data engineering.",
      },
      {
        type: "quote",
        text: "A pipeline that fails loudly is more valuable than a pipeline that is quietly wrong.",
      },
      { type: "h2", id: "how-it-connects", text: "How it connects to AI" },
      {
        type: "p",
        text: "Machine learning and agentic systems consume data. If labels leak, timestamps are wrong, or features are stale, the model will look clever and still be useless. Learning data engineering is not a detour from AI. It is part of the same craft.",
      },
      {
        type: "p",
        text: "See also the SQL note for query patterns, and the projects page for how a data engineering case study can be documented.",
      },
    ],
  },
];

export function getNote(slug: string) {
  return NOTES.find((note) => note.slug === slug);
}

export function notesByCategory(category: NoteCategory | "All") {
  if (category === "All") return NOTES;
  return NOTES.filter((note) => note.category === category);
}
