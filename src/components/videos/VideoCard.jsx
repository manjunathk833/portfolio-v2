import { motion } from 'framer-motion'
import LiteYouTubeEmbed from 'react-lite-youtube-embed'
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'
import { Badge } from '@/components/ui/badge'

function extractVideoId(url) {
  if (!url) return null
  // Handles: youtu.be/ID, youtube.com/watch?v=ID, youtube.com/embed/ID
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([A-Za-z0-9_-]{11})/
  )
  return match ? match[1] : null
}

export default function VideoCard({ video, index }) {
  const { title, description, youtubeUrl, project, publishedAt } = video
  const videoId = extractVideoId(youtubeUrl)

  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
    : null

  if (!videoId) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="rounded-xl border border-border bg-card overflow-hidden hover:border-primary/40 transition-colors"
    >
      {/* Embed */}
      <div className="aspect-video">
        <LiteYouTubeEmbed id={videoId} title={title} />
      </div>

      {/* Meta */}
      <div className="p-5 space-y-3">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          {project && (
            <Badge variant="secondary" className="text-xs">
              {project}
            </Badge>
          )}
          {formattedDate && (
            <span className="text-xs text-muted-foreground ml-auto">{formattedDate}</span>
          )}
        </div>
        <h3 className="font-semibold text-foreground leading-snug">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        )}
      </div>
    </motion.div>
  )
}
