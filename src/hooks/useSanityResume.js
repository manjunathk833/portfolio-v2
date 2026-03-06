import { useState, useEffect } from 'react'
import { client, RESUME_QUERY } from '@/services/sanity'

export function useSanityResume() {
  const [resume, setResume] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    client.fetch(RESUME_QUERY)
      .then(setResume)
      .catch(() => setResume(null))
      .finally(() => setLoading(false))
  }, [])

  return { resume, loading }
}
