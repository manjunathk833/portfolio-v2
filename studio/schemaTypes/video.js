export default {
  name: 'video',
  title: 'Video',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    },
    {
      name: 'youtubeUrl',
      title: 'YouTube URL',
      type: 'url',
      description: 'e.g. https://youtu.be/abc123 or https://www.youtube.com/watch?v=abc123',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'project',
      title: 'Related Project',
      type: 'string',
      description: 'Which project does this video explain?',
    },
    {
      name: 'publishedAt',
      title: 'Published Date',
      type: 'date',
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower number appears first.',
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'project' },
  },
}
