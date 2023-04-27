import { FaNewspaper } from 'react-icons/fa';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'post',
  title: 'Articles',
  type: 'document',
  icon: FaNewspaper,
  fields: [
    defineField({
      name: 'title',
      title: 'Titre*',
      type: 'string',
      validation: (Rule) => Rule.required().error('Champ obligatoire'),
    }),
    defineField({
      name: 'subtitle',
      title: 'Sous-titre*',
      type: 'text',
      validation: (Rule) => Rule.required().error('Champ obligatoire'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug*',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error('Champ obligatoire'),
    }),
    defineField({
      name: 'author',
      title: 'Auteur*',
      type: 'reference',
      to: { type: 'team' },
      validation: (Rule) => Rule.required().error('Champ obligatoire'),
    }),
    defineField({
      name: 'image',
      title: 'Image*',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Texte alternatif',
        },
      ],
      validation: (Rule) => Rule.required().error('Champ obligatoire'),
    }),
    defineField({
      name: 'expertise',
      title: 'Expertise(s) liée(s)',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: { type: 'expertise' },
        },
      ],
      validation: (Rule) => Rule.unique(),
    }),
    defineField({
      name: 'date',
      title: 'Publié le*',
      type: 'date',
      options: {
        dateFormat: 'DD/MM/YYYY',
      },
      validation: (Rule) => Rule.required().error('Champ obligatoire'),
    }),
    defineField({
      name: 'body',
      title: 'Contenu*',
      type: 'blockContent',
      validation: (Rule) => Rule.required().error('Champ obligatoire'),
    }),
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'image',
      date: 'date',
    },
    prepare(selection) {
      const { date, author } = selection;
      return {
        ...selection,
        subtitle: author
          ? 'Publié le ' + new Date(date).toLocaleString().split(' ')[0] + ' par ' + author
          : 'Publié le ' + new Date(date).toLocaleString().split(' ')[0],
      };
    },
  },
});
