import { useState, useEffect } from 'react'
import { fetchDevToPosts, fetchMediumPosts } from '@/services/blog'

export function useBlogs() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    Promise.allSettled([fetchDevToPosts(), fetchMediumPosts()])
      .then((results) => {
        const merged = results
          .filter((r) => r.status === 'fulfilled')
          .flatMap((r) => r.value)
          .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
        setPosts(merged)
        const failed = results.filter((r) => r.status === 'rejected')
        if (failed.length > 0 && merged.length === 0) {
          setError(failed[0].reason)
        }
      })
      .finally(() => setLoading(false))
  }, [])

  return { posts, loading, error }
}
