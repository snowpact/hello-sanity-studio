import { FaCog } from 'react-icons/fa';
import { defineType } from 'sanity';

export default defineType({
  name: 'siteSettings',
  type: 'document',
  title: 'Configuration du site',
  icon: FaCog,
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Titre du document',
      initialValue: 'Configuration du site',
      readOnly: true,
      hidden: true,
    },
    {
      name: 'siteTitle',
      type: 'string',
      title: 'Titre du site internet*',
      validation: (Rule) => Rule.required().error('Champ obligatoire'),
    },
    {
      name: 'phoneNumber',
      type: 'string',
      title: 'Téléphone fixe',
    },
    {
      name: 'mobileNumber',
      type: 'string',
      title: 'Téléphone portable',
    },
    {
      name: 'email',
      type: 'string',
      title: 'E-mail',
      validation: (Rule) => Rule.email().error('Saisie incorrecte'),
    },
    {
      name: 'address',
      type: 'string',
      title: 'Adresse',
    },
    {
      name: 'socialMedia',
      title: 'Réseaux sociaux du footer (5 max.)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              type: 'string',
              title: 'Libellé affiché',
              validation: (Rule) => Rule.required().error('Champ obligatoire'),
            },
            {
              name: 'link',
              type: 'url',
              title: 'Lien',
              initialValue: 'https://',
              validation: (Rule) => Rule.required().error('Champ obligatoire'),
            },
          ],
        },
      ],
      validation: (Rule) => Rule.max(5).error('La limite a été atteinte'),
    },
    {
      name: 'coordinates',
      type: 'geopoint',
      title: 'Coordonnées',
    },
    {
      name: 'contactFormTitle',
      type: 'string',
      title: 'Titre du formulaire de contact',
      validation: (Rule) => Rule.required().error('Champ obligatoire'),
    },
    {
      name: 'contactFormImage',
      type: 'image',
      options: { hotspot: true },
      title: 'Image du formulaire de contact',
      validation: (Rule) => Rule.required().error('Champ obligatoire'),
    },
    {
      name: 'hubspotSettings',
      title: "Ajout d'un formulaire de contact Hubspot",
      type: 'object',
      fields: [
        {
          name: 'formId',
          type: 'string',
          title: 'Hubspot Form ID',
        },
        {
          name: 'portalId',
          type: 'string',
          title: 'Hubspot Portal ID',
        },
      ],
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
  ],
});
