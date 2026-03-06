import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Code2, Twitter } from 'lucide-react'
import { socials } from '@/data/content'

const iconMap = {
  linkedin: Linkedin,
  github: Github,
  mail: Mail,
  twitter: Twitter,
  code: Code2,
}

const brandColors = {
  linkedin: 'hover:border-blue-500/60 hover:shadow-blue-500/10',
  github: 'hover:border-white/40 hover:shadow-white/10',
  mail: 'hover:border-primary/60 hover:shadow-primary/10',
  twitter: 'hover:border-sky-400/60 hover:shadow-sky-400/10',
  code: 'hover:border-yellow-500/60 hover:shadow-yellow-500/10',
}

const iconColors = {
  linkedin: 'text-blue-500',
  github: 'text-foreground',
  mail: 'text-primary',
  twitter: 'text-sky-400',
  code: 'text-yellow-500',
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
}

export default function SocialLinks() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      {socials.map(({ label, url, icon }) => {
        const Icon = iconMap[icon] ?? Mail
        const isEmail = url.startsWith('mailto:')
        const displayUrl = isEmail ? url.replace('mailto:', '') : url.replace('https://', '')

        return (
          <motion.a
            key={label}
            href={url}
            target={isEmail ? undefined : '_blank'}
            rel="noopener noreferrer"
            variants={cardVariants}
            whileHover={{ scale: 1.03, boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}
            whileTap={{ scale: 0.98 }}
            className={`flex items-center gap-4 p-5 rounded-xl border border-border bg-card transition-all duration-200 ${brandColors[icon] ?? 'hover:border-primary/60'} hover:shadow-lg`}
          >
            <div className="shrink-0 w-12 h-12 rounded-lg border border-border bg-muted flex items-center justify-center">
              <Icon className={`h-5 w-5 ${iconColors[icon] ?? 'text-primary'}`} />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-foreground text-sm">{label}</p>
              <p className="text-muted-foreground text-xs font-mono truncate mt-0.5">{displayUrl}</p>
            </div>
          </motion.a>
        )
      })}
    </motion.div>
  )
}
