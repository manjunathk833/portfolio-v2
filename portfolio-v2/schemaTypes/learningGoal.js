export default {
  name: 'learningGoal',
  title: 'Learning Goal',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Course / Topic',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'provider',
      title: 'Provider',
      type: 'string',
      description: 'e.g. Udemy, Coursera, Linux Foundation, AWS Training',
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Planned', value: 'planned' },
          { title: 'In Progress', value: 'in-progress' },
          { title: 'Completed', value: 'completed' },
        ],
        layout: 'radio',
      },
      initialValue: 'planned',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'progressPercent',
      title: 'Progress (%)',
      type: 'number',
      description: '0–100. Only meaningful for In Progress status.',
      validation: (Rule) => Rule.min(0).max(100),
      initialValue: 0,
    },
    {
      name: 'targetDate',
      title: 'Target Completion Date',
      type: 'date',
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      description: 'e.g. cloud, performance, leadership, mobile',
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower number appears first.',
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'status' },
  },
}
