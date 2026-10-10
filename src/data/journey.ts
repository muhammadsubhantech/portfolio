export type JourneyItem = {
  id: string;
  title: string;
  period: string;
  periodEditable?: boolean;
  body: string;
};

export const JOURNEY: JourneyItem[] = [
  {
    id: "education",
    title: "Education",
    period: "Ongoing",
    body: "ICS / Computer Science at Government National College, Karachi, alongside a 1-year Python with AI diploma at TechZone. Dates and additional credentials will be added only when they are confirmed.",
  },
  {
    id: "aiml",
    title: "AI / ML learning",
    period: "Ongoing",
    body: "Building a foundation in Artificial Intelligence and Machine Learning: how models learn, how they fail, and how to evaluate them honestly.",
  },
  {
    id: "python",
    title: "Python learning",
    period: "Ongoing",
    body: "Using Python as the main language for analysis, machine learning experiments, automation and practical development work.",
  },
  {
    id: "analysis",
    title: "Data Analysis",
    period: "Ongoing",
    body: "Practicing the craft of asking a clear question, preparing data, exploring it carefully and communicating what the numbers actually support.",
  },
  {
    id: "ml",
    title: "Machine Learning",
    period: "Ongoing",
    body: "Moving from concepts to hands-on model development: features, training, validation and the discipline of not over-claiming results.",
  },
  {
    id: "dl",
    title: "Deep Learning",
    period: "Exploring",
    body: "Studying neural networks, representations and the practical details that make deep learning models train reliably.",
  },
  {
    id: "agentic",
    title: "Agentic AI",
    period: "Learning",
    body: "Exploring agents that use tools, plan steps and complete tasks — with attention to guardrails, evaluation and failure cases.",
  },
  {
    id: "projects",
    title: "Projects",
    period: "In progress",
    body: "Publishing practical experiments on GitHub: machine learning notebooks, Python practice apps, CNN and transfer-learning labs, and a Keras income model. Case studies on this site map to those repositories.",
  },
  {
    id: "future",
    title: "Future goals",
    period: "Ahead",
    body: "Grow into AI/ML engineering, Agentic AI, Python development and data-focused roles through projects, internships and professional opportunities.",
  },
];

export const HEADED =
  "My goal is to continue developing strong practical skills in AI/ML, Agentic AI, Python and data engineering while gaining real-world experience through projects, internships and professional opportunities.";
