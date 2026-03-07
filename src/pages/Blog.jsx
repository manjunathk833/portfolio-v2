import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Rss, PenLine } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import BlogCard from '@/components/blog/BlogCard'
import { useBlogs } from '@/hooks/useBlogs'

function BlogGrid() {
  const { posts, loading } = useBlogs()

  if (loading) {
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-border bg-card overflow-hidden">
            <Skeleton className="h-40 w-full rounded-none" />
            <div className="p-5 space-y-3">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-4/5" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center gap-6 py-20 text-center"
      >
        <div className="rounded-full bg-primary/10 p-6">
          <PenLine className="h-10 w-10 text-primary" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">No posts yet</h2>
          <p className="text-muted-foreground max-w-md">
            Articles are on their way. Once a Dev.to or Medium account is connected, posts will
            appear here automatically — no redeployment needed.
          </p>
        </div>
        <div className="flex gap-3 flex-wrap justify-center text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1">
            <span className="h-2 w-2 rounded-full bg-[#0a0a0a] dark:bg-white" />
            DEV.to
          </span>
          <span className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1">
            <span className="h-2 w-2 rounded-full bg-[#00ab6c]" />
            Medium
          </span>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post, i) => (
        <BlogCard key={post.id} post={post} index={i} />
      ))}
    </div>
  )
}

export default function Blog() {
  return (
    <>
      <Helmet>
        <title>Blog — Manjunath H K</title>
        <meta
          name="description"
          content="Articles and thoughts on test automation, SDET best practices, and quality engineering by Manjunath H K."
        />
        <meta property="og:title" content="Blog — Manjunath H K" />
        <meta
          property="og:description"
          content="Test automation insights, SDET career tips, and quality engineering articles."
        />
      </Helmet>

      <main className="max-w-6xl mx-auto px-4 py-16 space-y-12">
        {/* Header */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 text-sm text-primary font-medium">
            <Rss className="h-4 w-4" />
            Writing
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Thoughts on{' '}
            <span className="text-primary">testing & quality</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Articles on test automation, SDET craft, and lessons from 6 years of building
            frameworks at scale — aggregated from Dev.to and Medium.
          </p>
        </motion.section>

        <BlogGrid />
      </main>
    </>
  )
}
