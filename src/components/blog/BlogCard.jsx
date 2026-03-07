import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { ExternalLink } from 'lucide-react'

const PLATFORM_STYLES = {
  'dev.to': {
    label: 'DEV.to',
    badgeClass: 'bg-[#0a0a0a] text-white border-[#0a0a0a] dark:bg-white dark:text-black dark:border-white',
  },
  medium: {
    label: 'Medium',
    badgeClass: 'bg-[#00ab6c]/10 text-[#00ab6c] border-[#00ab6c]/30',
  },
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export default function BlogCard({ post, index }) {
  const { title, url, excerpt, publishedAt, platform, tags, coverImage } = post
  const platformStyle = PLATFORM_STYLES[platform] ?? { label: platform, badgeClass: '' }

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="group flex flex-col rounded-xl border border-border bg-card overflow-hidden hover:border-primary/40 transition-colors"
    >
      {/* Cover image */}
      {coverImage && (
        <div className="h-40 overflow-hidden bg-muted">
          <img
            src={coverImage}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Platform + date */}
        <div className="flex items-center justify-between gap-2">
          <Badge variant="outline" className={`text-xs ${platformStyle.badgeClass}`}>
            {platformStyle.label}
          </Badge>
          <span className="text-xs text-muted-foreground">{formatDate(publishedAt)}</span>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </h3>

        {/* Excerpt */}
        {excerpt && (
          <p className="text-sm text-muted-foreground line-clamp-3 flex-1">{excerpt}</p>
        )}

        {/* Tags + read link */}
        <div className="flex items-center justify-between gap-2 flex-wrap mt-auto pt-2">
          <div className="flex gap-1.5 flex-wrap">
            {(tags ?? []).slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                #{tag}
              </Badge>
            ))}
          </div>
          <span className="flex items-center gap-1 text-xs text-primary font-medium ml-auto">
            Read
            <ExternalLink className="h-3 w-3" />
          </span>
        </div>
      </div>
    </motion.a>
  )
}
