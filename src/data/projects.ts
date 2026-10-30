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
    slug: "saess-smart-emergency-surveillance",
    title: "SAESS — Smart AI Emergency Surveillance",
    oneLiner: "An in-progress computer-vision concept for recognising road and public-safety incidents.",
    placeholder: false,
    categories: ["AI", "Machine Learning", "Python"],
    tags: ["Computer Vision", "YOLO", "OpenCV", "Road Safety"],
    image: "/images/project-saess.svg",
    imageAlt: "Concept illustration of an AI-powered road safety monitoring system",
    overview: "A project in development focused on using computer vision to help identify safety-related events in surveillance footage.",
    problem: "Road and public-space monitoring can involve multiple safety conditions that are difficult to review manually across long video streams.",
    approach: "The planned system explores visual detection for incidents and road-safety conditions, including vehicle crashes, fire, robbery, wrong-way traffic, helmet use and seat-belt use.",
    implementation: "The project direction centres on Python-based computer vision with models and tools such as YOLO and OpenCV. The public ROAD-SAFETY repository is currently empty, so implementation details and a code link will be added when the source is published.",
    result: "This is an in-progress project concept; it is not presented as a completed or deployed surveillance product.",
    learned: "Safety-focused AI needs careful evaluation, privacy safeguards and human review before any real-world use.",
    future: "Publish the implementation, document the dataset and evaluation protocol, and add safeguards for false detections and privacy.",
  },
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
    image: "/images/project-cifar10.svg",
    imageAlt: "CIFAR-10 computer vision classification illustration",
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
    image: "/images/project-cifar10.svg",
    imageAlt: "Computer vision illustration for transfer learning experiments",
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
  {
    slug: "indus-weave-hr-pipeline",
    title: "Indus Weave HR Data Pipeline",
    oneLiner: "End-to-end Python and SQL analytics pipeline for workforce, attendance and payroll data.",
    placeholder: false,
    categories: ["Data Engineering", "Data Analysis", "SQL", "Python"],
    tags: ["Python", "SQLite", "SQL", "Data Quality", "ETL"],
    image: "/images/project-hr-pipeline.svg",
    imageAlt: "Illustration of an HR data pipeline flowing into an analytics dashboard",
    overview: "A PeopleOps data engineering case study that rebuilds a small analytical warehouse from HR exports and produces validated business reporting.",
    problem: "HR exports arrive in different formats and need consistent employee, attendance, leave, overtime and payroll records before meaningful analysis can be trusted.",
    approach: "The pipeline ingests CSV and JSON sources, stages and standardises records, handles duplicate and rejected punches, builds warehouse tables, runs quality checks and generates analytical outputs.",
    implementation: "Python, SQLite and SQL. The repository includes run_pipeline.py, ingestion and transform modules, a warehouse star schema, quality checks, ten required SQL analyses plus a recruitment-funnel bonus query, a dashboard and a six-slide report.",
    result: "The repository contains reproducible query outputs, reconciliation and data-quality results, a dashboard and a CFO findings report. It is a case-study pipeline, not a live production feed.",
    learned: "Data engineering is not only moving rows: source-to-stage reconciliation, explicit rejection handling and trustworthy business rules are essential.",
    future: "Add orchestration, automated tests for more edge cases and a documented deployment path.",
    github: "https://github.com/muhammadsubhantech/Hackathon",
  },
  {
    slug: "mnist-digit-recognizer",
    title: "Handwritten Digit Recognition",
    oneLiner: "A CNN-based app that recognises handwritten digits and supports multi-digit input.",
    placeholder: false,
    categories: ["AI", "Machine Learning", "Python"],
    tags: ["Python", "TensorFlow", "CNN", "Streamlit", "Computer Vision"],
    image: "/images/project-digit-recognition.svg",
    imageAlt: "Glowing handwritten digits represented as a computer vision recognition interface",
    overview: "A computer-vision application built around a CNN for recognising handwritten digits, with a drawing canvas and image input workflow.",
    problem: "Handwritten digits vary in stroke, scale and placement, so a recogniser needs image preprocessing before predictions can be made consistently.",
    approach: "The app prepares digit images for the trained TensorFlow model and presents predictions through a Streamlit interface. Its documented workflow also supports multi-digit number handling through segmentation.",
    implementation: "Python, TensorFlow, NumPy, Pillow and Streamlit. The source is in CNN-Projects/mnist/app.py with notebooks and saved Keras model files in the same repository.",
    result: "A runnable learning application and saved CNN model are published in the repository; no unverified accuracy figure is claimed here.",
    learned: "Preprocessing and input normalisation are as important as the neural network when moving from notebook experiments to an interactive app.",
    future: "Add a small held-out test report and package the app with a clear requirements file.",
    github: "https://github.com/muhammadsubhantech/CNN-Projects/tree/main/mnist",
  },
  {
    slug: "cifar10-image-classifier",
    title: "CIFAR-10 Image Classifier",
    oneLiner: "A convolutional neural network experiment for classifying ten everyday image categories.",
    placeholder: false,
    categories: ["AI", "Machine Learning", "Python"],
    tags: ["Python", "TensorFlow", "CNN", "CIFAR-10"],
    image: "/images/project-cifar10.svg",
    imageAlt: "Abstract computer vision illustration with ten image classification categories",
    overview: "A CNN project using the CIFAR-10 dataset, with a teaching notebook, a trained Keras model and an app entry point.",
    problem: "Small colour images contain varied objects and backgrounds, making multi-class image classification a useful exercise in convolutional feature learning.",
    approach: "Train and inspect a CNN on the ten-class dataset, then keep the notebook, application code and saved model together in a dedicated project folder.",
    implementation: "Python and TensorFlow/Keras. The repository contains cifar-10/CIFAR10_CNN_From_Scratch_Teaching_Notebook.ipynb, app.py and a saved .keras model.",
    result: "The notebook, app code and model artifact are available in the public repository. Performance claims are left to the reproducible notebook.",
    learned: "A clear training workflow and saved model make an experiment easier to revisit and demonstrate.",
    future: "Publish class-wise evaluation, a confusion matrix and a short model card.",
    github: "https://github.com/muhammadsubhantech/CNN-Projects/tree/main/cifar-10",
  },
  {
    slug: "dry-bean-classifier",
    title: "Dry Bean Classification",
    oneLiner: "A neural-network app that classifies seven dry-bean varieties from shape measurements.",
    placeholder: false,
    categories: ["AI", "Machine Learning", "Python"],
    tags: ["Python", "TensorFlow", "Keras", "Streamlit", "Classification"],
    image: "/images/project-bean-classifier.svg",
    imageAlt: "Seven abstract bean silhouettes representing a multi-class classification project",
    overview: "A tabular classification application using geometric features from the Dry Bean dataset to predict one of seven bean varieties.",
    problem: "Different bean varieties can have similar appearances, so the model uses measurable shape descriptors rather than relying on a visual guess.",
    approach: "The app scales numeric features with a saved preprocessor, passes the values to a trained Keras model and displays a predicted class with supporting information.",
    implementation: "Python, TensorFlow, NumPy, pandas, joblib and Streamlit. The source and model artifacts are in RNN-Projects/bean.",
    result: "The repository includes the app, notebook, dataset reference files, trained model and preprocessing artifact. No unsupported accuracy figure is presented.",
    learned: "Keeping the preprocessing object alongside the model is necessary so new inputs are transformed in the same way as training data.",
    future: "Add a reproducible test split report and validate class ordering against the saved training labels.",
    github: "https://github.com/muhammadsubhantech/RNN-Projects/tree/main/bean",
  },
  {
    slug: "credit-risk-predictor",
    title: "Credit Risk Prediction App",
    oneLiner: "A Streamlit interface that uses a saved neural model and preprocessing pipeline for credit-risk classification.",
    placeholder: false,
    categories: ["AI", "Machine Learning", "Python"],
    tags: ["Python", "TensorFlow", "Keras", "Streamlit", "Preprocessing"],
    image: "/images/project-credit-risk.svg",
    imageAlt: "Abstract financial risk analytics dashboard with a neural prediction motif",
    overview: "An interactive credit-risk modelling project that brings a trained neural network and its preprocessing pipeline into a Streamlit application.",
    problem: "Credit application records combine numeric and categorical fields, which must be encoded and scaled consistently before model inference.",
    approach: "The app prepares application features using a saved ColumnTransformer and sends the transformed input to a trained Keras classifier. Reference data supports the app's input options and summaries.",
    implementation: "Python, pandas, NumPy, TensorFlow, joblib and Streamlit. Source code and model/preprocessor artifacts are stored in RNN-Projects/creadit.",
    result: "The repository includes the interactive app, trained model files and preprocessing artifact. Predictions are illustrative model outputs, not financial advice or a lending decision.",
    learned: "A model is only useful when its feature schema and preprocessing steps stay aligned between training and inference.",
    future: "Add model-card documentation, fairness checks and a transparent evaluation report.",
    github: "https://github.com/muhammadsubhantech/RNN-Projects/tree/main/creadit",
  },
  {
    slug: "student-placement-prediction",
    title: "Student Placement Intelligence",
    oneLiner: "A machine-learning dashboard exploring student placement prediction and career insights.",
    placeholder: false,
    categories: ["Machine Learning", "Data Analysis", "Python"],
    tags: ["Python", "Machine Learning", "Joblib", "Plotly", "Streamlit"],
    image: "/images/project-placement.svg",
    imageAlt: "Student placement analytics dashboard with a predictive model visual",
    overview: "A Streamlit dashboard that loads a saved machine-learning model and encoders to explore student placement predictions and related recommendations.",
    problem: "Student placement outcomes depend on multiple profile features, and a useful interface needs to present model output in a way that is understandable.",
    approach: "The app loads a saved model and encoders, accepts student information and presents prediction-oriented insights through a dashboard interface.",
    implementation: "Python, pandas, NumPy, joblib, Plotly and Streamlit. The application source is in ML-Projects/student_placement/app.py.",
    result: "The repository contains the dashboard source and references to the saved model artifacts. No placement guarantee or unsupported performance metric is claimed.",
    learned: "Predictive dashboards should communicate uncertainty and be treated as decision support rather than a guarantee of an individual's outcome.",
    future: "Document the training dataset and feature definitions, add model evaluation and explainability views.",
    github: "https://github.com/muhammadsubhantech/ML-Projects/tree/main/student_placement",
  },

];

export function getProject(slug: string) {
  return PROJECTS.find((project) => project.slug === slug);
}
