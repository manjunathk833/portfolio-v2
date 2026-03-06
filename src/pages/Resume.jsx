import { Helmet } from 'react-helmet-async'
import ResumeSection from '@/components/resume/ResumeSection'

export default function Resume() {
  return (
    <>
      <Helmet>
        <title>Resume — Manjunath H K</title>
        <meta name="description" content="View and download the resume of Manjunath H K — Senior SDET with 6 years of experience in Java, Python, and test automation." />
        <meta property="og:title" content="Resume — Manjunath H K" />
        <meta property="og:description" content="Senior SDET resume — API/UI Automation, Microservices, CI/CD, Java, Python." />
      </Helmet>
      <ResumeSection />
    </>
  )
}
