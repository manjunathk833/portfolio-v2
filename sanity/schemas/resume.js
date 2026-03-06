export default {
  name: 'resume',
  title: 'Resume',
  type: 'document',
  fields: [
    {
      name: 'file',
      title: 'Resume PDF',
      type: 'file',
      options: { accept: '.pdf' },
      validation: Rule => Rule.required(),
    },
    { name: 'version', title: 'Version Label', type: 'string', placeholder: 'e.g. v4 March 2026' },
    { name: 'lastUpdated', title: 'Last Updated', type: 'date' },
  ],
}
