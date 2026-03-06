import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})

export const PROJECTS_QUERY = `*[_type == "project"] | order(order asc) {
  _id,
  title,
  description,
  techStack,
  githubUrl,
  liveUrl,
  featured,
  "imageUrl": image.asset->url,
}`

export const RESUME_QUERY = `*[_type == "resume"][0] {
  "fileUrl": file.asset->url,
  version,
  lastUpdated,
}`
