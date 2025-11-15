import type { TextFieldSingleValidation } from 'payload'
import {
  BoldFeature,
  ItalicFeature,
  LinkFeature,
  ParagraphFeature,
  lexicalEditor,
  UnderlineFeature,
  type LinkFields,
} from '@payloadcms/richtext-lexical'
import {
  TextColorFeature,
  TextSizeFeature,
  TextFontFamilyFeature,
} from 'payload-lexical-typography'

export const defaultLexical = lexicalEditor({
  features: [
    ParagraphFeature(),
    UnderlineFeature(),
    BoldFeature(),
    ItalicFeature(),
    LinkFeature({
      enabledCollections: ['pages', 'posts'],
      fields: ({ defaultFields }) => {
        const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
          if ('name' in field && field.name === 'url') return false
          return true
        })

        return [
          ...defaultFieldsWithoutUrl,
          {
            name: 'url',
            type: 'text',
            admin: {
              condition: (_data, siblingData) => siblingData?.linkType !== 'internal',
            },
            label: ({ t }) => t('fields:enterURL'),
            required: true,
            validate: ((value, options) => {
              if ((options?.siblingData as LinkFields)?.linkType === 'internal') {
                return true // no validation needed, as no url should exist for internal links
              }
              return value ? true : 'URL is required'
            }) as TextFieldSingleValidation,
          },
        ]
      },
    }),
    // Typography features with Saint Helen color palette
    TextColorFeature({
      colors: [
        '#20336B', // Primary blue
        '#2B4585', // Primary soft
        '#E0A63A', // Gold
        '#2C9FAF', // Teal
        '#111111', // Text main (near black)
        '#585858', // Text muted
        '#FFFFFF', // White
        '#000000', // Black
        '#2E7D32', // Success green
        '#F9A825', // Warning yellow
        '#C62828', // Danger red
      ],
      colorPicker: true, // Allow custom colors
    }),
    TextSizeFeature({
      sizes: [
        { label: 'Small', value: '0.875rem' },
        { label: 'Base', value: '1rem' },
        { label: 'Large', value: '1.0625rem' },
        { label: 'XL', value: '1.25rem' },
        { label: '2XL', value: '1.5rem' },
      ],
    }),
    TextFontFamilyFeature({
      fontFamilies: [
        { label: 'Default', value: 'inherit' },
        { label: 'Heading (Libre Baskerville)', value: 'var(--font-heading)' },
        { label: 'Body (Libre Franklin)', value: 'var(--font-body)' },
        { label: 'Mono (Geist Mono)', value: 'var(--font-mono)' },
      ],
    }),
  ],
})
