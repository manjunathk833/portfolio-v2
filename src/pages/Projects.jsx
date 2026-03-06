import { useState, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { Skeleton } from '@/components/ui/skeleton'
import ProjectCard from '@/components/projects/ProjectCard'
import TechFilter from '@/components/projects/TechFilter'
import { useSanityProjects } from '@/hooks/useSanityProjects'

function ProjectSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-4">
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <div className="flex gap-2">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-8 flex-1" />
        <Skeleton className="h-8 flex-1" />
      </div>
    </div>
  )
}

export default function Projects() {
  const { projects, loading } = useSanityProjects()
  const [activeFilter, setActiveFilter] = useState('All')

  const allTags = useMemo(() => {
    const tagSet = new Set()
    projects.forEach((p) => (p.techStack ?? []).forEach((t) => tagSet.add(t)))
    return Array.from(tagSet).sort()
  }, [projects])

  const filtered = useMemo(() => {
    if (activeFilter === 'All') return projects
    return projects.filter((p) => (p.techStack ?? []).includes(activeFilter))
  }, [projects, activeFilter])

  return (
    <main className="max-w-6xl mx-auto px-4 py-16">
      <Helmet>
        <title>Projects — Manjunath H K</title>
        <meta name="description" content="Automation frameworks and tools built by Manjunath H K — Senior SDET. Live GitHub stats per project." />
        <meta property="og:title" content="Projects — Manjunath H K" />
        <meta property="og:description" content="Curated automation projects with live GitHub stats. API frameworks, BDD suites, and more." />
      </Helmet>

      {/* Header */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="font-mono text-primary text-sm tracking-widest uppercase mb-2"
      >
        Portfolio
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-3xl md:text-4xl font-bold text-foreground mb-4"
      >
        Projects
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="text-muted-foreground mb-10 max-w-2xl"
      >
        Automation frameworks and tools I've built — with live GitHub stats.
      </motion.p>

      {/* Filter */}
      {!loading && allTags.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-8"
        >
          <TechFilter tags={allTags} active={activeFilter} onChange={setActiveFilter} />
        </motion.div>
      )}

      {/* Loading skeletons */}
      {loading && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <ProjectSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Project grid */}
      {!loading && (
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            <motion.div
              layout
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((project) => (
                <motion.div
                  key={project._id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 text-muted-foreground"
            >
              <p className="font-mono text-sm">// No projects found</p>
              <p className="mt-2 text-sm">
                {projects.length === 0
                  ? 'Add projects in Sanity Studio to see them here.'
                  : `No projects tagged with "${activeFilter}".`}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </main>
  )
}
