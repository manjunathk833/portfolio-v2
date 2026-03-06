import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export default function TechFilter({ tags, active, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {['All', ...tags].map((tag) => {
        const isActive = active === tag
        return (
          <motion.button
            key={tag}
            onClick={() => onChange(tag)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className={cn(
              'font-mono text-xs px-3 py-1.5 rounded-full border transition-colors',
              isActive
                ? 'bg-primary text-primary-foreground border-primary'
                : 'border-border text-muted-foreground hover:border-primary/50 hover:text-primary'
            )}
          >
            {tag}
          </motion.button>
        )
      })}
    </div>
  )
}
