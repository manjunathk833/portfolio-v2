import { useState, useEffect } from 'react'
import { fetchRepoStats } from '@/services/github'

export function useGitHubStats(githubUrl) {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    if (!githubUrl) return
    fetchRepoStats(githubUrl).then(setStats)
  }, [githubUrl])

  return stats
}
