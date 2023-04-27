import { defineType } from 'sanity';

export default defineType({
  title: 'Page Content',
  name: 'pageContent',
  type: 'object',
  fields: [
    {
      name: 'pageTitle',
      type: 'string',
      title: 'Titre de la page*',
      validation: (Rule) => Rule.required().error('Champ obligatoire'),
    },
    {
      name: 'pageDescription',
      type: 'string',
      title: 'Résumé de la page (SEO)*',
      validation: (Rule) => Rule.required().error('Champ obligatoire'),
    },
    {
      name: 'heroBackground',
      type: 'image',
      options: { hotspot: true },
      title: 'Image du Hero*',
      validation: (Rule) => Rule.required().error('Champ obligatoire'),
    },
    {
      name: 'heroTitle',
      type: 'string',
      title: 'Titre du Hero*',
      validation: (Rule) => Rule.required().error('Champ obligatoire'),
    },
    {
      name: 'heroSubtitle',
      type: 'string',
      title: 'Sous-titre du Hero',
    },
  ],
});
