import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, X, Code2 } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { name } from '@/data/content'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
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
          isActive ? 'text-primary border-b-2 border-primary pb-0.5' : 'text-muted-foreground'
        }`
      }
    >
      {label}
    </NavLink>
  ))
}

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 backdrop-blur-md bg-background/80">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2 font-bold text-foreground hover:text-primary transition-colors">
          <Code2 className="h-5 w-5 text-primary" />
          <span className="font-mono text-sm">{name.split(' ')[0]}.hk</span>
        </NavLink>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLinks />
        </nav>

        {/* Mobile nav */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-card border-border w-64">
            <div className="flex flex-col gap-6 mt-8">
              <NavLinks onClick={() => setOpen(false)} />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
