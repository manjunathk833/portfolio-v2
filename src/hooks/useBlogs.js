import { useState, useEffect } from 'react'
import { fetchDevToPosts } from '@/services/blog'

export function useBlogs() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchDevToPosts()
      .then((data) => setPosts(data))
      .catch((err) => {
        console.error('Failed to fetch Dev.to posts:', err)
        setError(err)
      })
      .finally(() => setLoading(false))
  }, [])

  return { posts, loading, error }
}
