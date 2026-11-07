import { useState, useEffect } from 'react'
import { client, RESUME_QUERY } from '@/services/sanity'

const FALLBACK_RESUME = {
  fileUrl: '/Manjunath_HK_Resume.pdf',
  version: 'v2026.11',
  lastUpdated: '2026-11-07',
}

export function useSanityResume() {
  const [resume, setResume] = useState(FALLBACK_RESUME)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    client.fetch(RESUME_QUERY)
      .then((data) => setResume(data?.fileUrl ? data : FALLBACK_RESUME))
      .catch(() => setResume(FALLBACK_RESUME))
      .finally(() => setLoading(false))
  }, [])

  return { resume, loading }
}
