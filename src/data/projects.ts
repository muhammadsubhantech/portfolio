export const PROJECT_FILTERS = [
  "All",
  "Python",
  "Machine Learning",
  "AI",
  "Data Analysis",
  "SQL",
  "Automation",
  "Data Engineering",
] as const;

export type ProjectFilter = (typeof PROJECT_FILTERS)[number];

export type Project = {
  slug: string;
  title: string;
  oneLiner: string;
  placeholder: boolean;
  categories: Exclude<ProjectFilter, "All">[];
  tags: string[];
  image: string;
  imageAlt: string;
  problem: string;
  approach: string;
  result: string;
  overview: string;
  implementation: string;
  learned: string;
  future: string;
  github?: string;
  live?: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "machine-learning-lab",
    title: "Machine Learning Lab",
    oneLiner: "Notebook experiments on passenger satisfaction, bookings, F1 data and student placement.",
    placeholder: false,
    categories: ["Machine Learning", "Python", "AI"],
    tags: ["Python", "Machine Learning", "Jupyter"],
    image: "/images/cover-ml.jpg",
    imageAlt: "Machine learning project visual for Muhammad Subhan portfolio",
    overview:
      "A public GitHub collection of supervised learning notebooks. The repo currently includes Airline Passenger Satisfaction, Booking, F1, and a student-placement folder, with matching CSV files checked in beside the notebooks.",
    problem:
      "Tabular datasets need a repeatable path from raw rows to a trained model: cleaning, a clear target, a simple baseline, and an evaluation that can be inspected — not a one-off accuracy claim.",
    approach:
      "Each notebook is treated as a self-contained experiment. The data file lives next to the notebook so the work can be re-run. The emphasis is on reading the table, defining the question, and training classical models before anything more complex.",
    implementation:
      "Work is in Jupyter on Python. Files in the repo include Airline_passenger_satisfaction.ipynb, Booking.ipynb, f1.ipynb, the related CSV files, and a student_placement folder.",
    result:
      "The lab is published as working notebooks rather than a production service. No accuracy, ranking or client outcome is claimed beyond what you can re-run from the repository.",
    learned:
      "Keeping data and notebooks together makes experiments honest. Naming the target and checking the grain of each table matters more than swapping model names.",
    future:
      "Add a short README, a shared evaluation helper, and a single baseline comparison across the datasets.",
    github: "https://github.com/muhammadsubhantech/ML-Projects",
  },
  {
    slug: "data-analysis-studio",
    title: "Airline & Booking Analysis",
    oneLiner: "Exploratory analysis of airline passenger satisfaction and booking tables.",
    placeholder: false,
    categories: ["Data Analysis", "Python", "Machine Learning"],
    tags: ["Python", "Data Analysis", "CSV"],
    image: "/images/cover-data.jpg",
    imageAlt: "Data analysis project visual by Muhammad Subhan",
    overview:
      "A data-analysis pass over the airline passenger satisfaction and booking CSVs published in the ML-Projects repository. The work sits in Airline_passenger_satisfaction.ipynb and Booking.ipynb.",
    problem:
      "Satisfaction and booking tables are easy to misread: mixed types, missing values, and questions that are not the same as a model score. The first job is to understand the table, not to fit a network.",
    approach:
      "Load the CSV, inspect shape and columns, clean obvious issues, then explore distributions and relationships that could explain satisfaction or booking behaviour. Modelling, if used, stays secondary to the analysis.",
    implementation:
      "Python notebooks with pandas-style tabular work. Source files: airline_passenger_satisfaction.csv, booking.csv, Airline_passenger_satisfaction.ipynb and Booking.ipynb.",
    result:
      "The notebooks are the result. Insights should be read from the committed analysis rather than summarised as invented percentages here.",
    learned:
      "A clean question and a trustworthy table beat a busy chart. Publishing the CSV next to the notebook makes the analysis reviewable.",
    future:
      "Document the grain of each table, add quality checks (nulls, duplicates, date ranges) and a one-page findings note.",
    github: "https://github.com/muhammadsubhantech/ML-Projects",
  },
  {
    slug: "python-practice-lab",
    title: "Python Practice Lab",
    oneLiner: "Small Python apps: todo list, quiz, expense tracker, contact book and more.",
    placeholder: false,
    categories: ["Python", "Automation"],
    tags: ["Python", "Automation", "Practice"],
    image: "/images/cover-python.jpg",
    imageAlt: "Python automation project by Muhammad Subhan",
    overview:
      "A set of beginner-to-intermediate Python programs used to practise structure, input handling and small product logic. The repository is organised as numbered folders.",
    problem:
      "Language fluency comes from finishing small programs, not from reading syntax alone. Each app is a bounded problem with user input and a clear outcome.",
    approach:
      "Build one program at a time, keep folders separate, and prefer readable Python over frameworks. The collection covers utilities, simple games and record-keeping tools.",
    implementation:
      "Folders in Py-Projects include 01_todo_list, 02_password_generator, 03_quiz_app, 04_expense_tracker, 05_student_marks, 06_contact_book, 07_number_guessing, 08_bank_system and 09_rock_paper_scissors, plus pycommand.py.",
    result:
      "A public practice repo of completed mini-apps. These are learning programs, not deployed products.",
    learned:
      "Clear folder names and one-responsibility scripts make a practice repo usable later. Handling bad input is part of finishing, not a later extra.",
    future:
      "Add a root README that lists each app in one sentence, plus tests for the trackers and the quiz.",
    github: "https://github.com/muhammadsubhantech/Py-Projects",
  },
  {
    slug: "cnn-projects",
    title: "CNN Projects",
    oneLiner: "Convolutional neural network experiments for computer vision learning.",
    placeholder: false,
    categories: ["AI", "Machine Learning"],
    tags: ["Deep Learning", "CNN", "Computer Vision"],
    image: "/images/cover-agentic.jpg",
    imageAlt: "Deep learning CNN project visual by Muhammad Subhan",
    overview:
      "A GitHub repository dedicated to convolutional neural network practice. It is the vision-focused counterpart to the tabular ML lab and the transfer-learning notebooks.",
    problem:
      "Image models need a different pipeline from CSV work: tensors, spatial structure, and an evaluation loop that is easy to overfit if the split is careless.",
    approach:
      "Keep CNN experiments in their own repo so vision work does not mix with tabular notebooks. Iterate on architecture and training in Jupyter, and publish the code rather than a hosted demo.",
    implementation:
      "Published at github.com/muhammadsubhantech/CNN-Projects as Jupyter-based deep learning work. Open the repository for the current notebooks and assets.",
    result:
      "A public CNN learning repo. No production accuracy, benchmark win or client deployment is claimed on this page.",
    learned:
      "Separating vision experiments from tabular ML keeps the story of each repo honest and easier to navigate.",
    future:
      "Add a README with dataset names, training setup and a short note on what still fails.",
    github: "https://github.com/muhammadsubhantech/CNN-Projects",
  },
  {
    slug: "keras-income-model",
    title: "Keras Income Model",
    oneLiner: "Adult income modelling with a saved Keras model and preprocessor.",
    placeholder: false,
    categories: ["Machine Learning", "Python", "AI"],
    tags: ["Keras", "Python", "Deep Learning"],
    image: "/images/cover-engineering.jpg",
    imageAlt: "Keras model project visual by Muhammad Subhan",
    overview:
      "Work published under RNN-Projects around the Adult income dataset. The repo includes Adult.ipynb, adult.csv, a saved income_model.keras file, income_preprocessor.pkl, app.py and requirements.txt, plus bean and credit folders.",
    problem:
      "Income prediction from census-style tabular features is a classic teaching task. The challenge is to preprocess mixed columns, train a neural model, and persist both the model and the preprocessor so the notebook is not a dead end.",
    approach:
      "Train in a notebook, store the Keras model and the preprocessor on disk, and keep a small app.py plus requirements.txt so the experiment can be reloaded. Additional folders (bean, credit) sit alongside the Adult work.",
    implementation:
      "Python, Keras (.keras artifact), a pickle preprocessor, and a notebook named Adult.ipynb. The dataset file is adult.csv.",
    result:
      "A saved model and preprocessor are in the repo, which means the experiment went past a single notebook cell. Metrics are not restated here; they belong in the notebook.",
    learned:
      "Persisting the preprocessor with the model is as important as persisting weights. Tabular neural nets still start with careful columns.",
    future:
      "Document how to load income_model.keras, and clarify what the bean and credit folders contain.",
    github: "https://github.com/muhammadsubhantech/RNN-Projects",
  },
  {
    slug: "transfer-learning-lab",
    title: "Transfer Learning Lab",
    oneLiner: "Feature extraction, fine-tuning and a comparison notebook.",
    placeholder: false,
    categories: ["AI", "Machine Learning"],
    tags: ["Transfer Learning", "Deep Learning", "Jupyter"],
    image: "/images/cover-sql.jpg",
    imageAlt: "Transfer learning project visual for Muhammad Subhan portfolio",
    overview:
      "Three numbered notebooks that walk through transfer learning: feature extraction, fine-tuning, then a comparison report. The repo exists to practise reusing a pretrained network instead of training from scratch.",
    problem:
      "Training a large vision model from random weights is slow and data-hungry. Transfer learning asks what you can freeze, what you should fine-tune, and how to compare the two fairly.",
    approach:
      "Split the work into three notebooks so each stage stays readable. First extract features from a pretrained backbone, then fine-tune, then compare the two setups in a dedicated report notebook.",
    implementation:
      "Notebooks: 01_feature_extraction.ipynb, 02_fine_tuning.ipynb and 03_comparison_report.ipynb in the Transfer-Learning-Projects repository.",
    result:
      "A structured learning sequence on GitHub. Comparison details live in 03_comparison_report.ipynb — they are not invented as headline metrics here.",
    learned:
      "Numbered notebooks make a study path obvious. Feature extraction versus fine-tuning is easier to understand when each has its own file.",
    future:
      "Add a README that names the backbone and dataset, and export a short table from the comparison notebook.",
    github: "https://github.com/muhammadsubhantech/Transfer-Learning-Projects",
  },
];

export function getProject(slug: string) {
  return PROJECTS.find((project) => project.slug === slug);
}
