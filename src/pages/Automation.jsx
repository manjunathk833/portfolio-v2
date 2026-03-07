import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { FlaskConical, Layers, BookOpen } from 'lucide-react'
import CodeShowcase from '@/components/automation/CodeShowcase'
import LearningCard from '@/components/automation/LearningCard'
import { Skeleton } from '@/components/ui/skeleton'
import { useSanityLearning } from '@/hooks/useSanityLearning'

const TEST_PYRAMID = [
  { label: 'E2E', width: 'w-1/3', description: 'User journeys, critical flows' },
  { label: 'Integration', width: 'w-2/3', description: 'API contracts, service boundaries' },
  { label: 'Unit', width: 'w-full', description: 'Business logic, data transformations' },
]

function TestPyramid() {
  return (
    <div className="flex flex-col items-center gap-2 py-4">
      {TEST_PYRAMID.map(({ label, width, description }, i) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, scaleX: 0.6 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
          className={`${width} flex flex-col items-center gap-1`}
        >
          <div
            className={`w-full rounded-lg py-3 px-4 text-center text-sm font-medium ${
              i === 0
                ? 'bg-primary/20 text-primary border border-primary/30'
                : i === 1
                ? 'bg-primary/10 text-foreground border border-border'
                : 'bg-muted text-foreground border border-border'
            }`}
          >
            {label}
          </div>
          <p className="text-xs text-muted-foreground">{description}</p>
        </motion.div>
      ))}
    </div>
  )
}

function LearningSection() {
  const { goals, loading } = useSanityLearning()

  if (loading) {
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-40 rounded-xl" />
        ))}
      </div>
    )
  }

  if (goals.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border p-8 text-center text-muted-foreground text-sm">
        Learning goals coming soon — check back after the next upskill sprint.
      </div>
    )
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {goals.map((goal, i) => (
        <LearningCard key={goal._id} goal={goal} index={i} />
      ))}
    </div>
  )
}

export default function Automation() {
  return (
    <>
      <Helmet>
        <title>Testing in Action — Manjunath H K</title>
        <meta
          name="description"
          content="See how Manjunath H K approaches test automation — real code patterns, frameworks, and CI/CD pipelines built as a Senior SDET."
        />
        <meta property="og:title" content="Testing in Action — Manjunath H K" />
        <meta
          property="og:description"
          content="Real test automation patterns: BDD API tests, Selenium POM, parallel execution, and GitHub Actions pipelines."
        />
      </Helmet>

      <main className="max-w-6xl mx-auto px-4 py-16 space-y-20">
        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 text-sm text-primary font-medium">
            <FlaskConical className="h-4 w-4" />
            Testing in Action
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Not just tools —{' '}
            <span className="text-primary">patterns & pipelines</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real automation code from 6 years of building test frameworks across airlines,
            e-commerce, and OTT platforms. Every snippet reflects production-grade thinking.
          </p>
        </motion.section>

        {/* Code Showcase */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Layers className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-bold">Automation Patterns</h2>
          </div>
          <p className="text-muted-foreground">
            Four patterns I use daily — click a tab to explore the code.
          </p>
          <CodeShowcase />
        </section>

        {/* Test Pyramid */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Test Strategy</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <p className="text-muted-foreground">
                I follow a balanced test pyramid — heavy unit coverage at the base, targeted
                integration tests in the middle, and lean E2E flows at the top. This keeps suites
                fast, deterministic, and cheap to maintain.
              </p>
              <ul className="space-y-2 text-sm">
                {[
                  'Fail fast — unit tests run in under 30 seconds',
                  'API-first — integration tests validate contracts before UI',
                  'E2E for critical paths only — login, checkout, booking',
                ].map((point) => (
                  <li key={point} className="flex gap-2 text-muted-foreground">
                    <span className="text-primary mt-0.5">→</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-muted/30 rounded-xl border border-border p-6">
              <TestPyramid />
            </div>
          </div>
        </section>

        {/* Currently Learning */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <BookOpen className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-bold">Currently Learning</h2>
          </div>
          <p className="text-muted-foreground">
            SDETs at MAANG level never stop upskilling. Here's what I'm actively working on.
          </p>
          <LearningSection />
        </section>
      </main>
    </>
  )
}
