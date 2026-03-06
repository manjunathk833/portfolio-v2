import { motion } from 'framer-motion'
import { bio, stats } from '@/data/content'

const statChips = [
  { value: `${stats.yearsExperience}+`, label: 'Years Experience' },
  { value: `${stats.automationFrameworks}+`, label: 'Automation Frameworks' },
  { value: `${stats.testCasesWritten}+`, label: 'Test Cases Written' },
]

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: 'easeOut' },
}

export default function About() {
  return (
    <section id="about" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.p {...fadeUp} className="font-mono text-primary text-sm tracking-widest uppercase mb-2">
          About Me
        </motion.p>
        <motion.h2
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold text-foreground mb-12"
        >
          Who I Am
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <p className="text-muted-foreground text-lg leading-relaxed">{bio}</p>
          </motion.div>

          {/* Stat chips */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="grid grid-cols-1 gap-4"
          >
            {statChips.map(({ value, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card"
              >
                <span className="text-3xl font-bold text-primary font-mono">{value}</span>
                <span className="text-muted-foreground text-sm">{label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
