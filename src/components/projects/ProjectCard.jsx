import { motion } from 'framer-motion'
import { Github, ExternalLink, Star, GitFork } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useGitHubStats } from '@/hooks/useGitHubStats'

export default function ProjectCard({ project }) {
  const { title, description, techStack, githubUrl, liveUrl, imageUrl } = project
  const tech = techStack ?? []
  const stats = useGitHubStats(githubUrl)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      whileHover={{ scale: 1.02, boxShadow: '0 0 28px rgba(6,182,212,0.12)' }}
      className="flex flex-col rounded-xl border border-border bg-card hover:border-primary/40 transition-colors overflow-hidden"
    >
      {/* Screenshot */}
      {imageUrl && (
        <div className="h-44 overflow-hidden">
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="flex flex-col flex-1 p-5 gap-4">
        {/* Title */}
        <h3 className="font-semibold text-foreground text-lg leading-snug">{title}</h3>

        {/* Description */}
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 flex-1">
          {description}
        </p>

        {/* Tech stack tags */}
        {tech.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tech.map((t) => (
              <span
                key={t}
                className="font-mono text-xs px-2 py-1 rounded border border-border bg-muted text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {/* GitHub stats */}
        {stats && (
          <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono">
            <span className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 text-yellow-500" />
              {stats.stars}
            </span>
            <span className="flex items-center gap-1">
              <GitFork className="h-3.5 w-3.5 text-primary" />
              {stats.forks}
            </span>
            {stats.language && (
              <span className="ml-auto px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                {stats.language}
              </span>
            )}
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-2 pt-1">
          {githubUrl && (
            <Button asChild variant="outline" size="sm" className="gap-1.5 flex-1 border-border hover:border-primary/50">
              <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="h-3.5 w-3.5" /> Code
              </a>
            </Button>
          )}
          {liveUrl && (
            <Button asChild size="sm" className="gap-1.5 flex-1 bg-primary/10 text-primary hover:bg-primary/20 border border-primary/30">
              <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-3.5 w-3.5" /> Live
              </a>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
