import { motion } from 'framer-motion'
import { Briefcase } from 'lucide-react'
import { experience } from '@/data/content'

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-mono text-primary text-sm tracking-widest uppercase mb-2"
        >
          Career
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold text-foreground mb-12"
        >
          Work Experience
        </motion.h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-10">
            {experience.map((job, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: 'easeOut' }}
                className="relative pl-12 md:pl-20"
              >
                {/* Timeline dot */}
                <div className="absolute left-1.5 md:left-5 top-1.5 w-5 h-5 rounded-full border-2 border-primary bg-background flex items-center justify-center">
                  <Briefcase className="w-2.5 h-2.5 text-primary" />
                </div>

                <div className="p-5 rounded-xl border border-border bg-card hover:border-primary/30 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-3">
                    <div>
                      <h3 className="font-semibold text-foreground text-lg">{job.role}</h3>
                      <p className="text-primary font-mono text-sm">{job.company}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-muted-foreground text-sm font-mono">{job.duration}</p>
                      <p className="text-muted-foreground text-xs">{job.location}</p>
                    </div>
                  </div>

                  <ul className="space-y-2">
                    {job.bullets.map((bullet, j) => (
                      <li key={j} className="flex gap-2 text-sm text-muted-foreground">
                        <span className="text-primary mt-1 shrink-0">▸</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
