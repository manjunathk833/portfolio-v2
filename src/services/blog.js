const DEVTO_USERNAME = import.meta.env.VITE_DEVTO_USERNAME

export async function fetchDevToPosts() {
  if (!DEVTO_USERNAME) return []
  const res = await fetch(
    `https://dev.to/api/articles?username=${DEVTO_USERNAME}&per_page=6`
  )
  if (!res.ok) throw new Error(`Dev.to API error: ${res.status}`)
  const data = await res.json()
  return data.map((a) => ({
    id: `devto-${a.id}`,
    title: a.title,
    url: a.url,
    excerpt: a.description ?? '',
    publishedAt: a.published_at,
    tags: a.tag_list ?? [],
    coverImage: a.cover_image ?? null,
  }))
}
