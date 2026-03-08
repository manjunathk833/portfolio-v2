import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Youtube, Clapperboard } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import VideoCard from '@/components/videos/VideoCard'
import { useSanityVideos } from '@/hooks/useSanityVideos'

function VideoGrid() {
  const { videos, loading } = useSanityVideos()

  if (loading) {
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-border bg-card overflow-hidden">
            <Skeleton className="aspect-video w-full rounded-none" />
            <div className="p-5 space-y-3">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (videos.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center gap-6 py-20 text-center"
      >
        <div className="rounded-full bg-primary/10 p-6">
          <Clapperboard className="h-10 w-10 text-primary" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Videos coming soon</h2>
          <p className="text-muted-foreground max-w-md">
            Project explainers and automation walkthroughs are being recorded. Once published,
            they'll appear here automatically — no redeployment needed.
          </p>
        </div>
        <div className="flex items-center gap-1.5 rounded-full border border-border px-4 py-1.5 text-sm text-muted-foreground">
          <Youtube className="h-4 w-4 text-red-500" />
          YouTube
        </div>
      </motion.div>
    )
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((video, i) => (
        <VideoCard key={video._id} video={video} index={i} />
      ))}
    </div>
  )
}

export default function Videos() {
  return (
    <>
      <Helmet>
        <title>Videos — Manjunath H K</title>
        <meta
          name="description"
          content="Project explainers and test automation walkthroughs by Manjunath H K, Senior SDET."
        />
        <meta property="og:title" content="Videos — Manjunath H K" />
        <meta
          property="og:description"
          content="Watch project demos and automation framework walkthroughs."
        />
      </Helmet>

      <main className="max-w-6xl mx-auto px-4 py-16 space-y-12">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 text-sm text-primary font-medium">
            <Youtube className="h-4 w-4" />
            Videos
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            See it{' '}
            <span className="text-primary">in action</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Project walkthroughs, automation framework demos, and test strategy explainers.
          </p>
        </motion.section>

        <VideoGrid />
      </main>
    </>
  )
}
