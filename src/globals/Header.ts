import { GlobalConfig } from 'payload'

const Header: GlobalConfig = {
  slug: 'header',
  fields: [
    {
      name: 'logo',
      label: 'Logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'nav',
      label: 'Navigation',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'type',
          label: 'Item Type',
          type: 'select',
          required: true,
          options: [
            { label: 'Single Link', value: 'single' },
            { label: 'Group', value: 'group' },
          ],
          defaultValue: 'single',
        },
        {
          name: 'text',
          label: 'Label',
          type: 'text',
          required: true,
        },
        {
          name: 'link',
          label: 'Link',
          type: 'text',
          admin: {
            condition: (_, siblingData) => siblingData.type === 'single',
          },
        },
        {
          name: 'children',
          label: 'Group Items',
          type: 'array',
          admin: {
            condition: (_, siblingData) => siblingData.type === 'group',
          },
          fields: [
            {
              name: 'text',
              label: 'Label',
              type: 'text',
              required: true,
            },
            {
              name: 'link',
              label: 'Link',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'auth',
      label: 'Authentication',
      type: 'array',
      fields: [
        {
          name: 'text',
          label: 'Text',
          type: 'text',
          required: true,
        },
        {
          name: 'link',
          label: 'Link',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}

export default Header
