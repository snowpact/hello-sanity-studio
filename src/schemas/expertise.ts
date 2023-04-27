import { FaCubes } from 'react-icons/fa';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'expertise',
  title: 'Expertise',
  type: 'document',
  liveEdit: true,
  icon: FaCubes,
  groups: [
    {
      name: 'tag',
      title: 'Tag',
      default: true,
    },
    {
      name: 'stacks',
      title: 'Stacks',
      hidden: ({ document }) => !document?.isStackItem,
    },
    {
      name: 'landingPage',
      title: 'Landing Page',
      hidden: ({ document }) => !document?.hasLandingPage,
    },
  ],
  fields: [
    defineField({
      name: 'name',
      group: 'tag',
      title: "Nom de l'expertise*",
      type: 'string',
      validation: (Rule) => Rule.required().error('Champ obligatoire'),
    }),
    defineField({
      name: 'slug',
      group: 'tag',
      title: 'Slug*',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error('Champ obligatoire'),
    }),
    defineField({
      name: 'isStackItem',
      group: 'tag',
      title: "Élément d'une Stack List?*",
      type: 'boolean',
      initialValue: false,
      description:
        'Une Stack List est un empilement de Stack, chacune représentant une expertise et toutes rangées par catégories.',
      validation: (Rule) => Rule.required().error('Champ obligatoire'),
    }),
    defineField({
      name: 'hasLandingPage',
      group: 'tag',
      title: 'Landing Page personnalisée?*',
      type: 'boolean',
      initialValue: false,
      description: "Permet de personnaliser le contenu de la Landing Page de l'expertise",
      validation: (Rule) => Rule.required().error('Champ obligatoire'),
    }),
    defineField({
      name: 'mastered',
      group: 'stacks',
      title: 'Expertise maîtrisée?*',
      type: 'boolean',
      initialValue: false,
      description:
        "Une expertise non maîtrisée sera grisée et n’apparaîtra pas sur la page d'accueil.",
      validation: (Rule) =>
        Rule.custom((field, context) =>
          context.document?.isStackItem && field === undefined ? 'Champ obligatoire' : true
        ),
    }),
    defineField({
      name: 'category',
      group: 'stacks',
      title: "Catégorie de l'expertise*",
      type: 'string',
      options: {
        list: [
          { title: 'Front-End', value: 'Front-End' },
          { title: 'Mobile', value: 'Mobile' },
          { title: 'Back-End', value: 'Back-End' },
          { title: 'Language', value: 'Language' },
          { title: 'Infra', value: 'Infra' },
          { title: 'Autre', value: 'Autre' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) =>
        Rule.custom((field, context) =>
          context.document?.isStackItem && field === undefined ? 'Champ obligatoire' : true
        ),
    }),
    defineField({
      name: 'icon',
      group: 'stacks',
      title: 'Icône*',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) =>
        Rule.custom((field, context) =>
          context.document?.isStackItem && field === undefined ? 'Champ obligatoire' : true
        ),
    }),
    defineField({
      name: 'title',
      group: 'landingPage',
      title: 'Titre de la landing page',
      type: 'string',
      validation: (Rule) =>
        Rule.custom((field, context) =>
          context.document?.hasLandingPage && field === undefined ? 'Champ obligatoire' : true
        ),
    }),
    defineField({
      name: 'subtitle',
      group: 'landingPage',
      title: 'Sous-titre de la landing page',
      type: 'string',
    }),
    defineField({
      name: 'body',
      group: 'landingPage',
      title: 'Contenu de la landing page',
      type: 'text',
      validation: (Rule) =>
        Rule.custom((field, context) =>
          context.document?.hasLandingPage && field === undefined ? 'Champ obligatoire' : true
        ),
    }),
    defineField({
      name: 'pros',
      group: 'landingPage',
      title: 'Avantages',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'cons',
      group: 'landingPage',
      title: 'Inconvénients',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'lexicography',
      group: 'landingPage',
      title: 'Lexicographie',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Nom de la source externe' },
            {
              name: 'link',
              type: 'url',
              title: 'Lien vers la source externe',
              initialValue: 'https://',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'orderRank',
      title: 'Ordre',
      type: 'string',
      hidden: true,
    }),
  ],

  preview: {
    select: {
      title: 'name',
      category: 'category',
      media: 'icon',
      mastered: 'mastered',
      hasLandingPage: 'hasLandingPage',
    },
    prepare(selection) {
      const { title, category, mastered, hasLandingPage } = selection;
      return {
        ...selection,
        title: title,
        subtitle: category + (mastered ? ' 👑 ' : '') + (hasLandingPage ? ' 🌐 ' : ''),
      };
    },
  },
});
