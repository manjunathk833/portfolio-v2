import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { useTheme } from 'next-themes'
import { Menu, Code2, Sun, Moon } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { name } from '@/data/content'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/automation', label: 'Automation' },
  { to: '/blog', label: 'Blog' },
  { to: '/videos', label: 'Videos' },
  { to: '/resume', label: 'Resume' },
  { to: '/contact', label: 'Contact' },
]

function NavLinks({ onClick }) {
  return navLinks.map(({ to, label }) => (
    <NavLink
      key={to}
      to={to}
      end={to === '/'}
      onClick={onClick}
      className={({ isActive }) =>
        `text-sm font-medium transition-colors hover:text-primary ${
          isActive
            ? 'text-primary border-b-2 border-primary pb-0.5'
            : 'text-muted-foreground'
        }`
      }
    >
      {label}
    </NavLink>
  ))
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle theme"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const prev = scrollY.getPrevious() ?? 0
    if (latest > prev && latest > 150) {
      setHidden(true)
    } else {
      setHidden(false)
    }
  })

  return (
    <motion.header
      variants={{ visible: { y: 0 }, hidden: { y: '-100%' } }}
      animate={hidden ? 'hidden' : 'visible'}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="sticky top-0 z-50 w-full border-b border-border/40 backdrop-blur-md bg-background/80"
    >
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <NavLink
          to="/"
          className="flex items-center gap-2 font-bold text-foreground hover:text-primary transition-colors"
        >
          <Code2 className="h-5 w-5 text-primary" />
          <span className="font-mono text-sm">{name.split(' ')[0]}.hk</span>
        </NavLink>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLinks />
          <ThemeToggle />
        </nav>

        {/* Mobile nav */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-card border-border w-64">
              <div className="flex flex-col gap-6 mt-8">
                <NavLinks onClick={() => setOpen(false)} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  )
}
