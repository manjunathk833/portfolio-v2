import { Helmet } from 'react-helmet-async'
import Hero from '@/components/home/Hero'
import About from '@/components/home/About'
import Skills from '@/components/home/Skills'
import Experience from '@/components/home/Experience'

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Manjunath H K — Senior SDET</title>
        <meta name="description" content="Senior SDET specializing in API & UI Automation with 6 years of experience in Java, Python, and Microservices. Open to MAANG-level roles." />
        <meta property="og:title" content="Manjunath H K — Senior SDET" />
        <meta property="og:description" content="Senior SDET specializing in API & UI Automation. 6 years across Airlines, Consumer Services, and Media sectors." />
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
