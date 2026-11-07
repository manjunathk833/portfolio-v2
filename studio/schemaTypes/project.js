export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: Rule => Rule.required() },
    { name: 'description', title: 'Description', type: 'text', rows: 3, validation: Rule => Rule.required() },
    {
      name: 'techStack',
      title: 'Tech Stack',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    },
    { name: 'githubUrl', title: 'GitHub URL', type: 'url' },
    { name: 'liveUrl', title: 'Live URL (optional)', type: 'url' },
    {
      name: 'image',
      title: 'Screenshot (optional)',
      type: 'image',
      options: { hotspot: true },
    },
    { name: 'featured', title: 'Featured', type: 'boolean', initialValue: false },
    { name: 'order', title: 'Display Order', type: 'number', initialValue: 0 },
  ],
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'title', subtitle: 'githubUrl', media: 'image' },
  },
}
