import { Helmet } from 'react-helmet-async'
import Hero from '@/components/home/Hero'
import About from '@/components/home/About'
import Skills from '@/components/home/Skills'
import Experience from '@/components/home/Experience'

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Manjunath H K — Senior SDET & AI Systems Builder</title>
        <meta name="description" content="Senior SDET specializing in API & UI Automation with 7 years of experience in Java, Python, Playwright, Selenium, REST Assured, and AI-Augmented Testing." />
        <meta property="og:title" content="Manjunath H K — Senior SDET & AI Systems Builder" />
        <meta property="og:description" content="Senior SDET specializing in API, UI & Microservices Automation and AI Quality Engineering across Airline, Quick-Commerce, and OTT platforms." />
        <meta property="og:type" content="website" />
      </Helmet>
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
      </main>
    </>
  )
}
