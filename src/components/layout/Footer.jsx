import { Github, Linkedin, Mail } from 'lucide-react'
import { name, socials } from '@/data/content'

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
}

export default function Footer() {
  return (
    <footer className="border-t border-border/40 py-8 mt-16">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} {name}. Built with React + Sanity.
        </p>
        <div className="flex items-center gap-4">
          {socials.map(({ label, url, icon }) => {
            const Icon = iconMap[icon]
            return (
              <a
                key={label}
                href={url}
                target={url.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                aria-label={label}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {Icon && <Icon className="h-5 w-5" />}
              </a>
            )
          })}
        </div>
      </div>
    </footer>
  )
}
