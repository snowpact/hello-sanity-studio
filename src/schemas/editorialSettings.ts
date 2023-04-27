import { FaBars } from 'react-icons/fa';
import { defineType, defineField } from 'sanity';

export const EDITORIAL_SETTINGS_SCHEMA_ID = 'editorialSettings';

export const buildEditorialSettingsSchema = () =>
  defineType({
    name: EDITORIAL_SETTINGS_SCHEMA_ID,
    type: 'document',
    title: 'Paramètres éditoriaux',
    icon: FaBars,
    fields: [
      defineField({
        name: 'title',
        type: 'string',
        title: 'Titre du document',
        initialValue: 'Paramètres éditoriaux',
        readOnly: true,
        hidden: true,
      }),
      defineField({
        name: 'approaches',
        title: 'Approche',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'title',
                type: 'string',
                title: "Nom de l'approche*",
                validation: (Rule) => Rule.required().error('Champ obligatoire'),
              },
              {
                name: 'description',
                type: 'text',
                title: 'Description*',
                validation: (Rule) => Rule.required().error('Champ obligatoire'),
              },
              { name: 'footer', type: 'string', title: 'Mot(s) clé(s)' },
              { name: 'image', type: 'image', title: "Image d'illustration" },
            ],
          },
        ],
      }),
      defineField({
        name: 'values',
        title: 'Valeurs',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'title',
                type: 'string',
                title: 'Nom de la valeur*',
                validation: (Rule) => Rule.required().error('Champ obligatoire'),
              },
              {
                name: 'description',
                type: 'text',
                title: 'Description*',
                validation: (Rule) => Rule.required().error('Champ obligatoire'),
              },
              { name: 'footer', type: 'string', title: 'Mot(s) clé(s)' },
              { name: 'image', type: 'image', title: "Image d'illustration" },
            ],
          },
        ],
      }),
      defineField({
        name: 'portfolio',
        title: 'Références',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'title',
                title: 'Titre*',
                type: 'string',
                validation: (Rule) => Rule.required().error('Champ obligatoire'),
              },
              {
                name: 'image',
                title: 'Image*',
                type: 'image',
                options: { hotspot: true },
                validation: (Rule) => Rule.required().error('Champ obligatoire'),
              },
            ],
          },
        ],
      }),
      defineField({
        name: 'reviews',
        title: 'Avis',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'content',
                title: 'Avis*',
                type: 'text',
                validation: (Rule) => Rule.required().error('Champ obligatoire'),
              },
              {
                name: 'author',
                title: 'Auteur*',
                type: 'string',
                validation: (Rule) => Rule.required().error('Champ obligatoire'),
              },
            ],
          },
        ],
      }),
    ],
  });
