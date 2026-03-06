import { motion } from 'framer-motion'
import { Download, ExternalLink, Calendar, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useSanityResume } from '@/hooks/useSanityResume'

function formatDate(dateStr) {
  if (!dateStr) return null
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function ResumeSection() {
  const { resume, loading } = useSanityResume()

  return (
    <main className="max-w-5xl mx-auto px-4 py-16">
      {/* Header */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="font-mono text-primary text-sm tracking-widest uppercase mb-2"
      >
        My Resume
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-3xl md:text-4xl font-bold text-foreground mb-4"
      >
        Resume
      </motion.h1>

      {/* Loading state */}
      {loading && (
        <div className="space-y-4 mt-8">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-[800px] w-full rounded-xl" />
        </div>
      )}

      {/* Resume loaded */}
      {!loading && resume?.fileUrl && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-muted-foreground">
            {resume.version && (
              <span className="flex items-center gap-1.5 font-mono px-2 py-1 rounded border border-border bg-card">
                <RefreshCw className="h-3.5 w-3.5 text-primary" />
                {resume.version}
              </span>
            )}
            {resume.lastUpdated && (
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-primary" />
                Updated {formatDate(resume.lastUpdated)}
              </span>
            )}
            <div className="flex gap-2 ml-auto">
              <Button asChild variant="outline" size="sm" className="gap-1.5 border-border hover:border-primary/50">
                <a href={resume.fileUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-3.5 w-3.5" /> Open in tab
                </a>
              </Button>
              <Button asChild size="sm" className="gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground">
                <a href={resume.fileUrl} download="Manjunath_HK_Resume.pdf" target="_blank" rel="noopener noreferrer">
                  <Download className="h-3.5 w-3.5" /> Download PDF
                </a>
              </Button>
            </div>
          </div>

          {/* PDF iframe — desktop */}
          <div className="hidden md:block rounded-xl overflow-hidden border border-border">
            <iframe
              src={resume.fileUrl}
              className="w-full h-[850px]"
              title="Manjunath HK Resume"
            />
          </div>

          {/* Mobile fallback */}
          <div className="md:hidden rounded-xl border border-border bg-card p-8 text-center space-y-4">
            <p className="text-muted-foreground text-sm">PDF preview is best on desktop.</p>
            <div className="flex flex-col gap-3">
              <Button asChild variant="outline" className="gap-2">
                <a href={resume.fileUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" /> View PDF
                </a>
              </Button>
              <Button asChild className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
                <a href={resume.fileUrl} download="Manjunath_HK_Resume.pdf" target="_blank" rel="noopener noreferrer">
                  <Download className="h-4 w-4" /> Download PDF
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      {/* No resume uploaded yet */}
      {!loading && !resume?.fileUrl && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-12 rounded-xl border border-border bg-card p-12 text-center space-y-3"
        >
          <p className="font-mono text-sm text-muted-foreground">// No resume found</p>
          <p className="text-sm text-muted-foreground">
            Upload a PDF in Sanity Studio → Resume → file field → Publish.
          </p>
        </motion.div>
      )}
    </main>
  )
}
