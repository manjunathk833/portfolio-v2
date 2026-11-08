export const ROUTE_BUBBLES = {
  '/': "Hey! I'm Manjunath 👋 Hold & drag me around or tap me — ask about my work or paste a JD!",
  '/projects':
    'Checking out my builds? Ask me how I architected Mosaic (1,500+ airline tests) or my Copilot AI agents!',
  '/automation':
    'Curious how my automation patterns fit your stack? Paste your Job Description right here!',
  '/blog':
    'Reading my technical notes? Ask me about my AI-driven Azure DevOps defect pipeline or microservices QA!',
  '/videos':
    'Want a walkthrough of my test architectures? Tap me and ask anything!',
  '/resume':
    'Need my quick numbers? ~7 YOE, 60-day notice, Bengaluru / Remote — tap me to ask anything!',
  '/contact':
    'Ready to connect? Ask me about my availability or reach me at manjunathhk833@gmail.com!',
}

export const QUICK_CHIPS = [
  { id: 'hire', label: '🏆 Why hire me?' },
  { id: 'mosaic', label: '✈️ 1,500+ Tests (-90%)' },
  { id: 'ai', label: '🤖 My AI Agents' },
  { id: 'stack', label: '⚡ Tech Stack' },
  { id: 'logistics', label: '📋 Notice & Location' },
  { id: 'jd_sdet', label: '🎯 Sample JD Match' },
]

export const SAMPLE_JDS = {
  jd_sdet:
    'We are hiring a Senior SDET / Lead QA Automation Engineer (6+ years experience) in Bengaluru or Remote. Must have strong expertise in Java, Python, REST Assured API automation, Selenium WebDriver, Cucumber BDD, microservices testing, Docker, Kubernetes, Kibana, and CI/CD pipelines (Harness, Jenkins, or GitHub Actions). Experience with AI-driven test automation and GitHub Copilot is a huge plus.',
  jd_ai:
    'Looking for an AI-Augmented Senior SDET to build Agentic AI test workflows, GitHub Copilot STLC agents, LLM-driven defect triage pipelines in Azure DevOps, Python & Ollama quality insights tools, and REST Assured / Selenium / Playwright automation for distributed microservices.',
}

export const KNOWLEDGE_INTENTS = [
  {
    id: 'hire',
    category: 'Core Pitch',
    title: '🏆 Why should you hire me?',
    prompt: 'Why should we hire you for our engineering team?',
    keywords: [
      'hire',
      'why',
      'pitch',
      'summary',
      'about',
      'who are you',
      'introduce',
      'strengths',
      'value',
      'yourself',
      'background',
    ],
    answer: `I'm a **Senior SDET with ~7 years of experience (6.8+ YOE)** building API, UI, and Mobile automation frameworks across **Airline (ValueLabs), Quick-Commerce (Dunzo), and OTT (Tata Elxsi)** platforms on microservice architectures.\n\n• **Enterprise Scale & Speed:** I architected the **Mosaic UI & API automation framework** (Java, REST Assured, Selenium POM, Cucumber BDD) across **6+ airline programs (1,500+ tests)**, cutting regression effort from **1,125 to 125 man-hours (90%)**.\n• **QA Leadership & Code Quality:** I drive automation standards across a **10+ member QA team**, review **95% of pull requests**, and have authored **500+ commits**.\n• **AI-Driven QE Systems:** Built an **AI-driven Azure DevOps defect pipeline (>95% confidence, -70% triage effort)**, a **Python/Ollama EQE best-practices tracker (-80% manual monitoring)**, and **Copilot STLC agents (-60% delivery time)**.`,
    metrics: ['~7 YOE', '1,500+ Tests (-90% Effort)', '95% PRs Reviewed', 'ACE Certified'],
  },
  {
    id: 'mosaic',
    category: 'Flagship Impact (ValueLabs)',
    title: '✈️ How I cut regression by 90% (Mosaic / Airlines)',
    prompt: 'Tell me how you cut regression effort by 90% across 1,500+ tests.',
    keywords: [
      'mosaic',
      '90%',
      '1500',
      '1,500',
      'airline',
      'airlines',
      'valuelabs',
      'regression',
      'framework',
      'architecture',
      'lsy',
      'ssr',
      'pnr',
    ],
    answer: `At **ValueLabs (Senior Engineer - QE, Jun 2023–Present, Remote)**, I architected the **Mosaic UI and API automation framework** across **6+ airline programs** (including **LSY**, **SSR**, and **PNR Linking**):\n\n• **1,500+ Automated Tests:** Built with **Java, REST Assured, Selenium WebDriver (Page Object Model), Cucumber BDD, ReadyAPI, and Groovy**, cutting regression effort from **1,125 to 125 man-hours (90%)**.\n• **CI/CD & Containerization:** Containerized suites with **Docker** and ran daily/weekly smoke and regression in **Harness CI/CD** (previously **TeamCity**).\n• **Microservice Observability:** Automated daily error-log analysis across **30+ microservices** using **Kibana, Dynatrace, and Kafka event logs**, catching **2–4 critical defects** before each release.`,
    metrics: ['6+ Airline Programs', '1,500+ Tests (-90%)', 'Docker + Harness CI/CD', '30+ Microservices'],
  },
  {
    id: 'ai',
    category: 'AI in Testing (ValueLabs)',
    title: '🤖 My AI Defect Automation, Ollama Tracker & Copilot Agents',
    prompt: 'What AI-driven testing tools and agents have you built?',
    keywords: [
      'ai',
      'llm',
      'agent',
      'agents',
      'agentic',
      'copilot',
      'ollama',
      'claude',
      'gemini',
      'defect',
      'triage',
      'stlc',
      'ace',
    ],
    answer: `At **ValueLabs**, I engineered three production AI systems for quality engineering and earned the **ACE – AI Agents Certified Engineer (Dec 2025)** certification & **Employee of the Month (Sep 2025)** award:\n\n• **AI Defect Automation (-70% Triage Effort):** Built an AI-driven **Azure DevOps defect pipeline** inside our REST Assured framework that auto-files bugs when failure-to-user-story confidence exceeds **95%**.\n• **AI Quality Insights (-80% Manual Monitoring):** Developed an AI-driven **EQE best-practices tracker** using **Python, Microsoft Teams webhooks, GitHub AI API, and Ollama** for sprint-level compliance insights.\n• **Copilot & Agentic AI Workflows (-60% Delivery Time):** Designed **Copilot-based AI agents** automating STLC workflows with **Azure DevOps and Maven**; on the **LSY** program (` +
      '`300+` tests across `12+` microservices' +
      `), **Agentic AI** cut automation effort by **75%** and test authoring effort by **90%**.`,
    metrics: ['-70% Bug Triage', '-80% Manual Monitoring', '-60% Delivery Time', 'ACE Certified (2025)'],
  },
  {
    id: 'stack',
    category: 'Technical Skills',
    title: '⚡ My Verified Technical Stack',
    prompt: 'What is your hands-on technical stack across languages, automation, CI/CD, and observability?',
    keywords: [
      'stack',
      'skills',
      'java',
      'python',
      'playwright',
      'selenium',
      'api',
      'rest assured',
      'ci/cd',
      'docker',
      'kubernetes',
      'kibana',
      'harness',
      'tools',
      'tech',
    ],
    answer: `Here is my verified production stack across **~7 years**:\n\n• **Languages:** Java (6 yrs), Python (4 yrs), SQL (4 yrs), Groovy.\n• **Test Automation:** REST Assured (5 yrs), Selenium WebDriver (6 yrs, POM), Playwright, Appium, Cucumber BDD (5 yrs), TestNG, ReadyAPI, Postman (5 yrs), Ekam Java Framework.\n• **CI/CD & Infrastructure:** Harness CI/CD, Jenkins, TeamCity, GitHub Actions, Azure DevOps, Docker, Kubernetes (kubectl), GCP, Maven, Git.\n• **Observability & Quality:** Kibana (4 yrs), Dynatrace, Kafka (event-log monitoring), Google Metrics Explorer, Allure, Charles Proxy, Burp Suite, PostgreSQL, Jira, Zephyr, TestRail.\n• **AI in Testing:** GitHub Copilot, Agentic AI, Claude, Gemini, Ollama, GitHub AI API.`,
    metrics: ['Java & Python', 'REST Assured & Selenium', 'Docker, K8s & Harness', 'Kibana, Dynatrace & Kafka'],
  },
  {
    id: 'dunzo',
    category: 'Quick-Commerce Scale (Dunzo)',
    title: '🛵 My Microservices & GCP/K8s Work at Dunzo',
    prompt: 'What did you build at Dunzo as an SDET-1?',
    keywords: ['dunzo', 'commerce', 'microservices', 'merchant', 'ekam', 'postgresql', 'gcp', 'kubernetes', 'kubectl'],
    answer: `At **Dunzo (SDET-1, Aug 2022–Jun 2023, Bengaluru)**, I owned API, database, and container quality for the microservices-based **Merchant Service**:\n\n• **API & PostgreSQL Automation:** Automated end-to-end API flows and **PostgreSQL** validations using the **Ekam Java framework** for 4 key features, reaching **60% test coverage**.\n• **Docker & Jenkins CI/CD:** Ran Dockerized regression and feature suites through **Jenkins CI/CD**, owning feature quality from planning through deployment with minimal production defect leakage.\n• **GCP & Kubernetes Observability:** Led root-cause analysis of daily stability failures using **Allure, Google Metrics Explorer, and Kibana on GCP**, and monitored Merchant Service containers via **Docker and Kubernetes (kubectl)** for service-failure and DB testing.`,
    metrics: ['60% Merchant Service Coverage', 'Ekam Java + PostgreSQL', 'Docker, K8s & GCP', 'Jenkins CI/CD'],
  },
  {
    id: 'tata',
    category: 'OTT & Mobile Automation (Tata Elxsi)',
    title: '📺 My Web, Mobile & OTT Automation at Tata Elxsi',
    prompt: 'Tell me about your experience at Tata Elxsi.',
    keywords: ['tata', 'elxsi', 'ott', 'appium', 'testrail', 'charles', 'burp', 'ios', 'mobile', 'bravo'],
    answer: `At **Tata Elxsi (Dec 2019–Aug 2022, Bengaluru — Senior Engineer, QA & Engineer, QA)**, I built Web and Mobile automation for a **$12M+ OTT platform**:\n\n• **Python + Appium BDD Framework:** Designed a BDD automation framework using **Python, Appium, and the TestRail API**, automating **50% of the sanity suite** and saving **5 man-days per month** across Web and Mobile.\n• **$12M+ OTT App Quality:** Improved the **iOS App Store rating from 1.9 to 3.5** through systematic API and stability testing under Agile.\n• **API & Security/KPI Testing:** Performed domain API, stability, and KPI testing for Web and iOS using **Charles Proxy, Postman, and Burp Suite**, earning the **Tata Elxsi Bravo Award (Jan 2020)**.`,
    metrics: ['Python + Appium + TestRail API', 'iOS Rating 1.9 → 3.5', 'Bravo Award (Jan 2020)'],
  },
  {
    id: 'logistics',
    category: 'Hiring & Logistics',
    title: '📋 My Notice Period, Location, Experience & Education',
    prompt: 'What is your current location, notice period, and experience level?',
    keywords: [
      'notice',
      'location',
      'where',
      'bangalore',
      'bengaluru',
      'remote',
      'relocate',
      'join',
      'availability',
      'yoe',
      'years',
      'ctc',
      'salary',
      'compensation',
      'education',
      'degree',
      'college',
    ],
    answer: `Here are my verified hiring and background details:\n\n• **Total Experience:** ~7 Years (**6.8 YOE** — 6 yrs Java/Selenium/API, 5 yrs REST Assured/BDD/CI-CD, 4 yrs Python/SQL/Kibana).\n• **Current Role:** **Senior Engineer - QE** at **ValueLabs** (Jun 2023–Present, Remote).\n• **Location:** **Bengaluru, Karnataka, India** (open to Bengaluru Hybrid/On-site or Remote).\n• **Notice Period:** **60 Days**.\n• **Education:** **B.E. Computer Science (Information Science)**, Sri Jayachamarajendra College of Engineering (SJCE Mysuru, **CGPA: 8.02 / 10**).`,
    metrics: ['~7 YOE (6.8 Yrs)', 'Bengaluru / Remote', '60-Day Notice', 'B.E. CS (8.02 CGPA)'],
  },
  {
    id: 'contact',
    category: 'Direct Reach',
    title: '📬 How to Reach Me or Download My Resume',
    prompt: 'How can I contact you or download your resume?',
    keywords: [
      'contact',
      'email',
      'linkedin',
      'github',
      'reach',
      'call',
      'phone',
      'resume',
      'cv',
      'hire now',
    ],
    answer: `I'd love to connect directly! You can reach me anytime via:\n\n• **Email:** [manjunathhk833@gmail.com](mailto:manjunathhk833@gmail.com)\n• **Phone:** +91 7337813770\n• **LinkedIn:** [linkedin.com/in/manjunath-h-k](https://www.linkedin.com/in/manjunath-h-k/)\n• **GitHub:** [github.com/manjunathk833](https://github.com/manjunathk833)\n• **Resume PDF:** Click **Resume** in the top navigation bar or **Download Resume** on the Home page for my latest 2-page PDF!`,
    metrics: ['manjunathhk833@gmail.com', '+91 7337813770', 'LinkedIn & GitHub'],
  },
]

const JD_SKILL_CATALOG = [
  { label: 'Java & Groovy', tokens: ['java', 'groovy'] },
  { label: 'Python', tokens: ['python'] },
  {
    label: 'REST Assured & API Testing',
    tokens: ['rest assured', 'restassured', 'readyapi', 'postman', 'api', 'microservices'],
  },
  {
    label: 'Selenium, Playwright & Appium',
    tokens: ['selenium', 'webdriver', 'playwright', 'appium', 'cucumber', 'bdd', 'testng'],
  },
  {
    label: 'AI in Testing (Copilot, Agentic AI, Ollama)',
    tokens: ['ai', 'agent', 'agents', 'agentic', 'copilot', 'ollama', 'llm', 'claude', 'gemini'],
  },
  {
    label: 'CI/CD (Harness, Jenkins, GitHub Actions, Azure DevOps)',
    tokens: ['harness', 'jenkins', 'teamcity', 'github actions', 'azure devops', 'ci/cd', 'cicd', 'maven'],
  },
  {
    label: 'Containers & Cloud (Docker, Kubernetes, GCP)',
    tokens: ['docker', 'kubernetes', 'k8s', 'kubectl', 'gcp', 'google cloud'],
  },
  {
    label: 'Observability & DB (Kibana, Dynatrace, Kafka, PostgreSQL)',
    tokens: [
      'kibana',
      'dynatrace',
      'kafka',
      'postgresql',
      'postgres',
      'sql',
      'allure',
      'charles proxy',
      'burp suite',
      'testrail',
      'jira',
      'zephyr',
    ],
  },
]

export function classifyAndRespond(rawInput) {
  const text = (rawInput || '').trim()
  const lower = text.toLowerCase()

  // Gate 1: Prompt Injection / System Prompt Extraction Guard
  const injectionPatterns = [
    /ignore (all |previous |prior |above )?(instructions|rules|prompts)/i,
    /system prompt/i,
    /api key/i,
    /jailbreak/i,
    /you are now (dan|a helpful|an unrestricted)/i,
    /reveal your (secret|prompt|token)/i,
  ]
  if (injectionPatterns.some((rx) => rx.test(text))) {
    return {
      badge: '🔒 Anti-Injection Guard Triggered ($0 API Cost)',
      badgeColor: 'text-rose-300 bg-rose-950/80 border-rose-500/40',
      answer: `Nice try testing my security boundaries! 😄 Since I'm a **Senior SDET**, I engineered my digital twin with a **100% deterministic, zero-API-key client-side knowledge engine**.\n\nThere's no LLM API key to leak and zero credits to burn — I only answer questions about **my verified engineering work, architecture impact, and how I fit your team**. Ask me about my **1,500+ test Mosaic framework** or paste your **Job Description**!`,
      metrics: ['0 API Keys Exposed', '$0.00 Token Burn', '100% Injection-Immune'],
    }
  }

  // Gate 2: Free-Coding / Homework / Off-Topic Abuse Guard
  const codingAbusePatterns = [
    /write (me )?(a |an )?(python|java|javascript|c\+\+|code|script|program|function|essay|poem)/i,
    /binary search/i,
    /leetcode/i,
    /solve this/i,
    /translate this/i,
    /recipe for/i,
    /capital of/i,
  ]
  if (
    codingAbusePatterns.some((rx) => rx.test(text)) &&
    !lower.includes('manjunath') &&
    !lower.includes('your')
  ) {
    return {
      badge: '🛡️ Off-Topic / Free-AI Abuse Deflected',
      badgeColor: 'text-amber-300 bg-amber-950/80 border-amber-500/40',
      answer: `Haha, I don't write free homework scripts in chat — I save my **Java, Python, REST Assured, and Selenium/Playwright** code for production test architectures! 😉\n\nIf you want to see my real work, check out my **Projects & Automation pages**, or ask me how I cut airline regression effort by **90% across 1,500+ automated tests**!`,
      metrics: ['Portfolio-Scoped Only', 'See /projects for Live Code'],
    }
  }

  // Gate 3: Job Description (JD) Compatibility Scorer
  const matchedSkills = JD_SKILL_CATALOG.filter((item) =>
    item.tokens.some((tok) => lower.includes(tok))
  )
  const looksLikeJD =
    text.length > 95 ||
    matchedSkills.length >= 3 ||
    /(we are hiring|looking for|responsibilities|requirements|years of experience|job description|jd\b)/i.test(
      text
    )

  if (looksLikeJD && matchedSkills.length >= 2) {
    const score = Math.min(98, 84 + matchedSkills.length * 2)
    const skillNames = matchedSkills.map((s) => s.label)
    return {
      badge: `🎯 Instant JD Match Score: ${score}% Strong Fit`,
      badgeColor: 'text-emerald-300 bg-emerald-950/90 border-emerald-400/50',
      answer: `I matched your requirements against my **~7-year (6.8+ YOE) production track record** — we have a **${score}% stack & seniority match**!\n\n• **Matched Core Skills (${skillNames.length}):** ${skillNames.join(' · ')}\n• **Proven Enterprise Scale:** Architected **1,500+ UI & API tests (Mosaic)** at ValueLabs (-90% regression effort in Docker & Harness CI/CD) + microservices & PostgreSQL automation at **Dunzo** (Ekam Java, Jenkins, GCP, K8s).\n• **Logistics:** Based in **Bengaluru** (open to Hybrid/Remote), **60-day notice period**.\n\nLet's connect at **[manjunathhk833@gmail.com](mailto:manjunathhk833@gmail.com)** or on **[LinkedIn](https://www.linkedin.com/in/manjunath-h-k/)**!`,
      metrics: [`${score}% JD Match`, ...skillNames.slice(0, 3)],
    }
  }

  // Gate 4: BM25 / Keyword Scoring Across First-Person Intents
  let bestIntent = null
  let bestScore = 0
  for (const intent of KNOWLEDGE_INTENTS) {
    let s = 0
    for (const kw of intent.keywords) {
      if (lower.includes(kw)) s += kw.length >= 5 ? 3 : 2
    }
    if (s > bestScore) {
      bestScore = s
      bestIntent = intent
    }
  }

  if (bestIntent && bestScore > 0) {
    return {
      badge: `✨ ${bestIntent.category}`,
      badgeColor: 'text-amber-300 bg-amber-400/10 border-amber-400/30',
      answer: bestIntent.answer,
      metrics: bestIntent.metrics,
    }
  }

  // Gate 5: Friendly First-Person Fallback
  return {
    badge: "👋 Let's Talk Engineering",
    badgeColor: 'text-emerald-300 bg-emerald-950/60 border-emerald-500/30',
    answer: `I'm **Manjunath H K**! I keep this chat focused on my **~7 years in SDET, Microservices API/UI Automation & AI-Augmented Testing**.\n\nTry asking me:\n• *"Why should we hire you?"*\n• *"How did you cut regression effort by 90% at ValueLabs?"*\n• *"What AI defect & Copilot STLC agents have you built?"*\n• Or **paste your full Job Description** and I'll calculate our exact stack match %!`,
    metrics: ['~7 YOE', '1,500+ Tests', 'Paste a JD to Score Fit'],
  }
}
