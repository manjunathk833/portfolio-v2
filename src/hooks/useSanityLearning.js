import { useState, useEffect } from 'react'
import { client, LEARNING_QUERY } from '@/services/sanity'

export function useSanityLearning() {
  const [goals, setGoals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    client
      .fetch(LEARNING_QUERY)
      .then((data) => setGoals(data ?? []))
      .catch((err) => {
        console.error('Failed to fetch learning goals:', err)
        setError(err)
      })
      .finally(() => setLoading(false))
  }, [])

  return { goals, loading, error }
}
