import { FaBuffer } from 'react-icons/fa';
import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'pageSettings',
  type: 'document',
  title: 'Pages & SEO',
  icon: FaBuffer,
  groups: [
    {
      name: 'static',
      title: 'Pages statiques',
      default: true,
    },
    {
      name: 'dynamic',
      title: 'Pages dynamiques',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Titre du document',
      initialValue: 'Pages & SEO',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'indexPage',
      title: 'Accueil',
      type: 'pageContent',
      group: 'static',
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
    defineField({
      name: 'teamPage',
      title: "L'équipe",
      type: 'pageContent',
      group: 'static',
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
    defineField({
      name: 'projectsPage',
      title: 'Réalisations',
      type: 'pageContent',
      group: 'static',
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
    defineField({
      name: 'expertisePage',
      title: 'Expertise',
      type: 'pageContent',
      group: 'static',
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
    defineField({
      name: 'blogPage',
      title: 'Blog',
      type: 'pageContent',
      group: 'static',
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
    defineField({
      name: 'contactPage',
      title: 'Contact',
      type: 'pageContent',
      group: 'static',
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
    defineField({
      name: 'teamArticle',
      title: 'Membre de "L\'Équipe"',
      type: 'object',
      fields: [
        {
          name: 'pageDescription',
          type: 'string',
          title: 'Résumé de la page (SEO)*',
          description:
            'Tag(s) disponible(s) : $name$ > Nom du membre | $skills$ > Compétences du membre',
          validation: (Rule) => Rule.required().error('Champ obligatoire'),
        },
      ],
      group: 'dynamic',
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
    defineField({
      name: 'projectArticle',
      title: 'Description d\'une "Réalisation"',
      type: 'object',
      fields: [
        {
          name: 'heroBackground',
          type: 'image',
          options: { hotspot: true },
          title: 'Image du Hero*',
          validation: (Rule) => Rule.required().error('Champ obligatoire'),
        },
        {
          name: 'pageDescription',
          type: 'string',
          title: 'Résumé de la page (SEO)*',
          description:
            'Tag(s) disponible(s) : $name$ > Nom de la réalisation | $client$ > Nom du client',
          validation: (Rule) => Rule.required().error('Champ obligatoire'),
        },
      ],
      group: 'dynamic',
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
    defineField({
      name: 'expertiseArticle',
      title: 'Description d\'une "Expertise"',
      type: 'object',
      fields: [
        {
          name: 'heroBackground',
          type: 'image',
          options: { hotspot: true },
          title: 'Image du Hero*',
          validation: (Rule) => Rule.required().error('Champ obligatoire'),
        },
        {
          name: 'pageDescription',
          type: 'string',
          title: 'Résumé de la page (SEO)*',
          description: "Tag(s) disponible(s) : $name$ > Nom de l'expertise",
          validation: (Rule) => Rule.required().error('Champ obligatoire'),
        },
      ],
      group: 'dynamic',
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
    defineField({
      name: 'blogArticle',
      title: 'Article du "Blog"',
      type: 'object',
      fields: [
        {
          name: 'pageDescription',
          type: 'string',
          title: 'Résumé de la page (SEO)*',
          description: "Tag(s) disponible(s) : $name$ > Titre de l'article",
          validation: (Rule) => Rule.required().error('Champ obligatoire'),
        },
      ],
      group: 'dynamic',
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
  ],
});
