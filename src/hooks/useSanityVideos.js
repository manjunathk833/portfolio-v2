import { useState, useEffect } from 'react'
import { client, VIDEOS_QUERY } from '@/services/sanity'

export function useSanityVideos() {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    client
      .fetch(VIDEOS_QUERY)
      .then((data) => setVideos(data ?? []))
      .catch((err) => {
        console.error('Failed to fetch videos:', err)
        setError(err)
      })
      .finally(() => setLoading(false))
  }, [])

  return { videos, loading, error }
}
