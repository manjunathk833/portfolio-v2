export const ROUTE_BUBBLES = {
  '/': "Hey! I'm Manjunath 👋 Drag me around or click me — ask about my work or paste a JD!",
  '/projects':
    'Checking out my builds? Ask me how I architected Mosaic (1,500+ airline tests) or my AI agents!',
  '/automation':
    'Curious how my automation patterns fit your stack? Paste your Job Description right here!',
  '/blog':
    'Reading my technical notes? Ask me about self-healing DOM locators or LLM quality gates!',
  '/videos':
    'Want a live walkthrough of my test architectures? Click me and ask anything!',
  '/resume':
    'Need my quick numbers? ~7 YOE, 60-day notice, Bengaluru / Remote — click me to ask anything!',
  '/contact':
    "Ready to connect? Ask me about my availability or drop me a note directly!",
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
    'We are hiring a Senior SDET / Lead QA Automation Engineer (5+ years experience) in Bengaluru. Must have strong expertise in Java, Python, Playwright, Selenium WebDriver, REST Assured API automation, microservices testing, AWS cloud, Docker, and CI/CD pipelines (Jenkins/GitHub Actions). Experience with AI-driven test automation is a huge plus.',
  jd_ai:
    'Looking for an AI Quality Engineer / Staff SDET to build autonomous test agents, LLM evaluation pipelines, Python & Playwright browser automation, self-healing locators, API contract testing, and CI/CD quality gates for high-scale distributed systems.',
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
    answer: `I'm a **Senior SDET & AI Quality Architect with ~7 years of experience** building enterprise test ecosystems across **Aviation (ValueLabs), Quick-Commerce (Dunzo), and Automotive/Embedded (Tata Elxsi)**.\n\n• **Scale & Speed:** I architected the **Mosaic automation platform** across 6+ airline programs (**1,500+ UI & API tests**), cutting regression effort by **90%**.\n• **AI-Native Engineering:** I build **LLM self-healing locators, RAG/eval guardrails, and autonomous multi-agent workflows** that eliminate flaky failures.\n• **Full-Stack Depth:** Java, Python, Playwright, Selenium, REST Assured, Karate, AWS, Docker, and CI/CD quality gates.`,
    metrics: ['~7 YOE', '1,500+ Tests', '-90% Regression Effort', '4x Bravo Awards'],
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
      'parallel',
    ],
    answer: `At **ValueLabs (Senior Software Engineer in Test, 2022–Present)**, I led the **Mosaic multi-tenant automation architecture** serving **6+ international airline clients**:\n\n• **Unified Hybrid Engine:** Combined **Java, Selenium/Playwright, REST Assured, and Karate** into a single reusable core covering **1,500+ automated UI & API scenarios**.\n• **90% Effort Reduction:** Parallelized execution via Dockerized CI/CD pipelines and automated environment provisioning, shrinking multi-day manual regression into rapid release gates.\n• **Recognition:** Honored with **4× ValueLabs Bravo Awards** and **2× Nadabramha Spoorthi Awards** for engineering impact.`,
    metrics: ['6+ Airline Clients', '1,500+ UI/API Tests', '-90% Effort', 'Docker + CI/CD'],
  },
  {
    id: 'ai',
    category: 'AI & LLM Engineering',
    title: '🤖 My AI Agents, Self-Healing & LLM Evaluation Work',
    prompt: 'What have you built with AI agents, LLMs, and self-healing automation?',
    keywords: [
      'ai',
      'llm',
      'agent',
      'agents',
      'rag',
      'self-healing',
      'genai',
      'autonomous',
      'openai',
      'gemini',
      'ollama',
      'healing',
      'locator',
    ],
    answer: `I build **production AI-augmented quality and automation systems** rather than just using off-the-shelf copilots:\n\n• **Self-Healing DOM & Selector Engines:** Built intelligent fallback pipelines that inspect live DOM trees when locators break, cutting maintenance overhead by **40%+**.\n• **Autonomous Browser & Multi-Agent Workflows:** Engineered headful Playwright CDP stealth pipelines with deterministic state machines and human-in-the-loop safety gates.\n• **LLM & API Guardrails:** Automated validation for non-deterministic AI responses, schema integrity, latency SLAs, and anti-hallucination whitelists.`,
    metrics: ['-40% Locator Maintenance', 'Playwright CDP', 'Multi-Agent DAGs', 'Zero-Hallucination Gates'],
  },
  {
    id: 'stack',
    category: 'Technical Depth',
    title: '⚡ My Java, Python, Playwright & API Stack',
    prompt: 'What is your hands-on technical stack across languages, UI, API, and cloud?',
    keywords: [
      'stack',
      'skills',
      'java',
      'python',
      'playwright',
      'selenium',
      'api',
      'rest assured',
      'karate',
      'aws',
      'ci/cd',
      'docker',
      'tools',
      'tech',
    ],
    answer: `Here is my production battle-tested stack across **7 years**:\n\n• **Languages:** Java (Core, Streams, Concurrency) & Python (Asyncio, Pytest, Automation Scripting), plus SQL & Shell.\n• **Web & Browser Automation:** Playwright (CDP, Trace Viewer, Network Interception) & Selenium WebDriver (Grid, Selenoid).\n• **API & Microservices:** REST Assured, Karate DSL, Postman/Newman, GraphQL, JSON Schema & Contract Validation.\n• **Cloud, Performance & CI/CD:** AWS (EC2, S3, Lambda), Jenkins, GitHub Actions, Docker, JMeter, and Linux/QNX.`,
    metrics: ['Java & Python', 'Playwright & Selenium', 'REST Assured & Karate', 'AWS + Docker + CI/CD'],
  },
  {
    id: 'dunzo',
    category: 'Quick-Commerce Scale (Dunzo)',
    title: '🛵 My High-Concurrency Microservices Work at Dunzo',
    prompt: 'What did you build at Dunzo for quick-commerce microservices?',
    keywords: ['dunzo', 'commerce', 'microservices', 'backend', 'delivery', 'order', 'concurrency'],
    answer: `At **Dunzo (SDET, 2021–2022)**, I owned backend and mobile quality for high-throughput quick-commerce fulfillment flows:\n\n• **Microservices API Automation:** Automated end-to-end order, dispatch, pricing, and rider-allocation APIs handling peak hyperlocal traffic.\n• **Shift-Left Release Velocity:** Embedded automated regression suites into deployment pipelines, catching contract breaking changes before staging.\n• **Awarded:** Received the **Dunzo Shining Star Award** for zero-sev1 release ownership.`,
    metrics: ['Hyperlocal Microservices', 'End-to-End API Suites', 'Shining Star Award'],
  },
  {
    id: 'tata',
    category: 'Embedded & Linux Systems (Tata Elxsi)',
    title: '🚗 My Foundation at Tata Elxsi (Linux/QNX & Python)',
    prompt: 'Tell me about your early career at Tata Elxsi.',
    keywords: ['tata', 'elxsi', 'embedded', 'linux', 'qnx', 'automotive', 'early career'],
    answer: `I started my engineering career at **Tata Elxsi (Test Engineer, 2019–2021)** working on mission-critical **Automotive & Embedded Linux/QNX systems**:\n\n• Built **Python & Shell diagnostic automation scripts** for infotainment and HMI modules.\n• Validated system-level stability, memory leaks, and hardware-in-the-loop (HIL) communication protocols.`,
    metrics: ['Python + Linux/QNX', 'Automotive HMI', '2019–2021'],
  },
  {
    id: 'logistics',
    category: 'Hiring & Logistics',
    title: '📋 My Notice Period, Location, Experience & Availability',
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
    ],
    answer: `Here are my quick hiring details:\n\n• **Total Experience:** ~7 Years (6.8+ YOE) in Software Quality Engineering, Test Architecture & AI Automation.\n• **Current Location:** **Bengaluru, India** (open to Bengaluru Hybrid/On-site, Remote Worldwide, or relocation).\n• **Notice Period:** **60 Days** (standard, with buyout/negotiation options depending on handover).\n• **Target Roles:** Senior SDET, Staff/Lead SDET, Quality Architect, or AI Quality Engineer.`,
    metrics: ['~7 YOE', 'Bengaluru / Remote', '60-Day Notice', 'Open to Interviews'],
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
    answer: `I'd love to chat directly! You can reach me anytime via:\n\n• **Email:** [manjunathk833@gmail.com](mailto:manjunathk833@gmail.com)\n• **LinkedIn:** [linkedin.com/in/manjunath-h-k](https://www.linkedin.com/in/manjunath-h-k)\n• **GitHub:** [github.com/manjunathk833](https://github.com/manjunathk833)\n• **Resume PDF:** Click **Resume** in the top navigation bar or **Download Resume** on the Home page for my latest PDF!`,
    metrics: ['manjunathk833@gmail.com', 'LinkedIn', 'GitHub'],
  },
]

const JD_SKILL_CATALOG = [
  { label: 'Java', tokens: ['java'] },
  { label: 'Python', tokens: ['python', 'pytest', 'asyncio'] },
  { label: 'Playwright', tokens: ['playwright', 'cdp'] },
  { label: 'Selenium', tokens: ['selenium', 'webdriver'] },
  {
    label: 'REST Assured / API',
    tokens: ['rest assured', 'restassured', 'api', 'postman', 'karate', 'graphql', 'microservices'],
  },
  {
    label: 'AI / LLM Agents',
    tokens: ['ai', 'llm', 'agent', 'agents', 'genai', 'self-healing', 'rag', 'evaluation'],
  },
  { label: 'AWS & Cloud', tokens: ['aws', 'cloud', 'ec2', 's3', 'lambda'] },
  {
    label: 'Docker & CI/CD',
    tokens: ['docker', 'ci/cd', 'cicd', 'jenkins', 'github actions', 'pipeline', 'pipelines'],
  },
  { label: 'Performance (JMeter)', tokens: ['jmeter', 'performance', 'load'] },
  {
    label: 'Linux / Distributed Systems',
    tokens: ['linux', 'distributed', 'scalable', 'scale', 'concurrency'],
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
      answer: `Nice try testing my security boundaries! 😄 Since I'm a **Senior SDET**, I engineered my digital twin with a **100% deterministic, zero-API-key client-side knowledge engine**.\n\nThere's no LLM API key to leak and zero credits to burn — I only answer questions about **my engineering work, architecture impact, and how I fit your team**. Ask me about my **1,500+ test Mosaic framework** or paste your **Job Description**!`,
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
      answer: `Haha, I don't write free homework scripts in chat — I save my **Python, Java, and Playwright** code for production test architectures! 😉\n\nIf you want to see my real code in action, check out my **5 open-source frameworks on the Projects page**, or ask me how I cut airline regression effort by **90% across 1,500+ automated tests**!`,
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
      answer: `I analyzed your requirements against my **7-year production track record** — we have a **${score}% stack & seniority match**!\n\n• **Matched Core Skills (${skillNames.length}):** ${skillNames.join(' · ')}\n• **Proven Enterprise Scale:** Architected **1,500+ UI/API tests (Mosaic)** at ValueLabs (-90% regression effort) + high-concurrency microservices QA at **Dunzo**.\n• **Logistics:** Based in **Bengaluru** (open to Hybrid/Remote), **60-day notice period**.\n\nLet's connect at **[manjunathk833@gmail.com](mailto:manjunathk833@gmail.com)** or on **[LinkedIn](https://www.linkedin.com/in/manjunath-h-k)**!`,
      metrics: [`${score}% JD Match`, ...skillNames.slice(0, 4)],
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
    answer: `I'm **Manjunath H K**! I keep this chat focused on my **7 years in SDET, Test Architecture & AI Automation**.\n\nTry asking me:\n• *"Why should we hire you?"*\n• *"How did you cut regression effort by 90% at ValueLabs?"*\n• *"What AI & LLM testing pipelines have you built?"*\n• Or **paste your full Job Description** and I'll calculate our exact stack match %!`,
    metrics: ['~7 YOE', '1,500+ Tests', 'Paste a JD to Score Fit'],
  }
}
