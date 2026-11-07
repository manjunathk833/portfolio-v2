import { useState, useEffect } from 'react'
import { client, PROJECTS_QUERY } from '@/services/sanity'
import { projects as FALLBACK_PROJECTS } from '@/data/content'

export function useSanityProjects() {
  const [projects, setProjects] = useState(FALLBACK_PROJECTS)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    client.fetch(PROJECTS_QUERY)
      .then((data) => setProjects(Array.isArray(data) && data.length > 0 ? data : FALLBACK_PROJECTS))
      .catch(() => setProjects(FALLBACK_PROJECTS))
      .finally(() => setLoading(false))
  }, [])

  return { projects, loading }
}
