import { useState, useEffect } from 'react'
import { client, PROJECTS_QUERY } from '@/services/sanity'

export function useSanityProjects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    client.fetch(PROJECTS_QUERY)
      .then(setProjects)
      .catch((err) => { console.error('Sanity fetch error:', err); setProjects([]) })
      .finally(() => setLoading(false))
  }, [])

  return { projects, loading }
}
