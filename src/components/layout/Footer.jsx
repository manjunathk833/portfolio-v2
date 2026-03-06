import { Link } from 'react-router-dom'
import { Github, Linkedin, Mail, Code2, Twitter } from 'lucide-react'
import { name, socials } from '@/data/content'

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  twitter: Twitter,
  code: Code2,
}

export default function Footer() {
  return (
    <footer className="border-t border-border/40 py-10 mt-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <Link to="/" className="font-mono text-sm font-bold text-foreground hover:text-primary transition-colors">
              <Code2 className="inline h-4 w-4 mr-1 text-primary" />
              {name.split(' ')[0]}.hk
            </Link>
            <p className="text-muted-foreground text-xs">Senior SDET · Bengaluru, India</p>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-5">
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

          {/* Copyright */}
          <p className="text-muted-foreground text-xs text-center md:text-right">
            © {new Date().getFullYear()} {name}
            <br className="hidden md:block" />
            <span className="md:block"> Built with React + Sanity</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
