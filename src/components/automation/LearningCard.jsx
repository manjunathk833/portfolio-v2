import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Clock, CheckCircle2, Circle } from 'lucide-react'

const STATUS_CONFIG = {
  completed: {
    label: 'Completed',
    icon: CheckCircle2,
    color: 'text-green-500',
    barColor: 'bg-green-500',
    badgeClass: 'bg-green-500/10 text-green-500 border-green-500/20',
  },
  'in-progress': {
    label: 'In Progress',
    icon: BookOpen,
    color: 'text-primary',
    barColor: 'bg-primary',
    badgeClass: 'bg-primary/10 text-primary border-primary/20',
  },
  planned: {
    label: 'Planned',
    icon: Circle,
    color: 'text-muted-foreground',
    barColor: 'bg-muted-foreground',
    badgeClass: 'bg-muted text-muted-foreground border-border',
  },
}

export default function LearningCard({ goal, index }) {
  const { title, provider, status, progressPercent = 0, targetDate, tags } = goal
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.planned
  const Icon = config.icon

  const pct = status === 'completed' ? 100 : Math.min(progressPercent, 100)

  const formattedDate = targetDate
    ? new Date(targetDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="rounded-xl border border-border bg-card p-5 flex flex-col gap-4 hover:border-primary/40 transition-colors"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-semibold text-foreground leading-snug">{title}</p>
          {provider && (
            <p className="text-sm text-muted-foreground mt-0.5">{provider}</p>
          )}
        </div>
        <Badge
          variant="outline"
          className={`shrink-0 text-xs flex items-center gap-1 ${config.badgeClass}`}
        >
          <Icon className={`h-3 w-3 ${config.color}`} />
          {config.label}
        </Badge>
      </div>

      {/* Progress bar */}
      <div>
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs text-muted-foreground">Progress</span>
          <span className="text-xs font-medium text-foreground">{pct}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${config.barColor}`}
            initial={{ width: 0 }}
            whileInView={{ width: `${pct}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: index * 0.07 + 0.2, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        {tags && tags.length > 0 && (
          <div className="flex gap-1.5 flex-wrap">
            {(tags ?? []).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        {formattedDate && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground ml-auto">
            <Clock className="h-3 w-3" />
            {status === 'completed' ? 'Completed' : 'Target'}: {formattedDate}
          </div>
        )}
      </div>
    </motion.div>
  )
}
