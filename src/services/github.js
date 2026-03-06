export async function fetchRepoStats(githubUrl) {
  if (!githubUrl) return null
  const parts = githubUrl.replace('https://github.com/', '').split('/')
  const [owner, repo] = parts
  const headers = import.meta.env.VITE_GITHUB_TOKEN
    ? { Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}` }
    : {}
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, { headers })
  if (!res.ok) return null
  const data = await res.json()
  return {
    stars: data.stargazers_count,
    forks: data.forks_count,
    language: data.language,
  }
}
