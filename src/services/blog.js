const DEVTO_USERNAME = import.meta.env.VITE_DEVTO_USERNAME
const MEDIUM_USERNAME = import.meta.env.VITE_MEDIUM_USERNAME

/**
 * Normalize a post to a common shape.
 * @typedef {{ id: string, title: string, url: string, excerpt: string, publishedAt: string, platform: 'dev.to'|'medium', tags: string[], coverImage: string|null }} Post
 */

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
    platform: 'dev.to',
    tags: a.tag_list ?? [],
    coverImage: a.cover_image ?? null,
  }))
}

export async function fetchMediumPosts() {
  if (!MEDIUM_USERNAME) return []
  const feedUrl = `https://medium.com/feed/@${MEDIUM_USERNAME}`
  const res = await fetch(
    `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}&count=6`
  )
  if (!res.ok) throw new Error(`rss2json error: ${res.status}`)
  const data = await res.json()
  if (data.status !== 'ok') return []
  return (data.items ?? []).map((item) => ({
    id: `medium-${item.guid}`,
    title: item.title,
    url: item.link,
    excerpt: stripHtml(item.description).slice(0, 200),
    publishedAt: item.pubDate,
    platform: 'medium',
    tags: item.categories ?? [],
    coverImage: item.thumbnail ?? null,
  }))
}

function stripHtml(html) {
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
}
