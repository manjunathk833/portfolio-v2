import { useState } from 'react'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import java from 'react-syntax-highlighter/dist/esm/languages/prism/java'
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python'
import yaml from 'react-syntax-highlighter/dist/esm/languages/prism/yaml'

SyntaxHighlighter.registerLanguage('java', java)
SyntaxHighlighter.registerLanguage('python', python)
SyntaxHighlighter.registerLanguage('yaml', yaml)
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, Check, Terminal } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { testShowcase } from '@/data/content'

function CopyButton({ code }) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleCopy}
      className="h-8 w-8 text-muted-foreground hover:text-foreground"
      aria-label="Copy code"
    >
      {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
    </Button>
  )
}

export default function CodeShowcase() {
  const [activeId, setActiveId] = useState(testShowcase[0].id)
  const active = testShowcase.find((s) => s.id === activeId)

  return (
    <div className="rounded-xl border border-border overflow-hidden bg-card">
      {/* Tab bar */}
      <div className="flex items-center gap-1 px-4 py-3 border-b border-border bg-muted/30 overflow-x-auto">
        <Terminal className="h-4 w-4 text-primary mr-2 shrink-0" />
        {testShowcase.map((snippet) => (
          <button
            key={snippet.id}
            onClick={() => setActiveId(snippet.id)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
              activeId === snippet.id
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            {snippet.title}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeId}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18 }}
        >
          {/* Meta bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-border/50">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium text-foreground">{active.framework}</span>
              <div className="flex gap-1.5 flex-wrap">
                {active.highlights.map((h) => (
                  <Badge key={h} variant="secondary" className="text-xs">
                    {h}
                  </Badge>
                ))}
              </div>
            </div>
            <CopyButton code={active.code} />
          </div>

          {/* Description */}
          <p className="px-4 py-3 text-sm text-muted-foreground border-b border-border/30">
            {active.description}
          </p>

          {/* Code block */}
          <div className="text-sm">
            <SyntaxHighlighter
              language={active.language}
              style={oneDark}
              showLineNumbers
              customStyle={{
                margin: 0,
                borderRadius: 0,
                fontSize: '0.8rem',
                maxHeight: '420px',
              }}
            >
              {active.code}
            </SyntaxHighlighter>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
