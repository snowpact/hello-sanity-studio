import { FaClipboardCheck } from 'react-icons/fa';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'project',
  title: 'Projets',
  type: 'document',
  icon: FaClipboardCheck,
  fields: [
    defineField({
      name: 'title',
      title: 'Titre*',
      type: 'string',
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
      name: 'date',
      title: 'Date de livraison*',
      type: 'date',
      options: {
        dateFormat: 'DD/MM/YYYY',
      },
      validation: (Rule) => Rule.required().error('Champ obligatoire'),
    }),
    defineField({
      name: 'client',
      title: 'Client',
      type: 'string',
    }),
    defineField({
      name: 'icon',
      title: 'Icône*',
      type: 'image',
      options: {
        hotspot: true,
      },
      // @ts-ignore
      validation: (Rule) => Rule.required().error('Champ obligatoire'),
    }),
    defineField({
      name: 'body',
      title: 'Contenu',
      type: 'blockContent',
    }),
    defineField({
      name: 'expertises',
      title: 'Expertise(s) liée(s)',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'expertise' } }],
      validation: (Rule) => Rule.unique(),
    }),
  ],

  preview: {
    select: {
      title: 'title',
      client: 'client',
      media: 'icon',
      date: 'date',
    },
    prepare(selection) {
      const { client, date } = selection;
      return {
        ...selection,
        subtitle: client
          ? 'Livré le ' + new Date(date).toLocaleString().split(' ')[0] + ' pour ' + client
          : 'Livré le ' + new Date(date).toLocaleString().split(' ')[0],
      };
    },
  },
});
