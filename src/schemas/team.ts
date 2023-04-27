import { FaUsers } from 'react-icons/fa';
import { defineField, defineType } from 'sanity';
import { uniqueRule } from '../utils/rules';

export const TEAM_SCHEMA_ID = 'team';

export const buildTeamSchema = () =>
  defineType({
    name: TEAM_SCHEMA_ID,
    title: 'Equipe',
    type: 'document',
    icon: FaUsers,
    fields: [
      defineField({
        name: 'name',
        title: 'Nom*',
        type: 'string',
        validation: (Rule) => Rule.required().error('Champ obligatoire'),
      }),
      defineField({
        name: 'slug',
        title: 'Slug*',
        type: 'slug',
        options: {
          source: 'name',
          maxLength: 96,
        },
        // @ts-ignore
        validation: (Rule) => Rule.required().error('Champ obligatoire'),
      }),
      defineField({
        name: 'image',
        title: 'Image*',
        type: 'image',
        options: {
          hotspot: true,
        },
        validation: (Rule) => Rule.required().error('Champ obligatoire'),
      }),
      defineField({
        name: 'skills',
        title: 'Compétences*',
        type: 'string',
        validation: (Rule) => Rule.required().error('Champ obligatoire'),
      }),
      defineField({
        name: 'position',
        title: 'Poste occupé',
        type: 'string',
      }),
      defineField({
        name: 'bio',
        title: 'Bio',
        type: 'text',
      }),
      defineField({
        name: 'localization',
        title: 'Localisation',
        type: 'string',
      }),
      defineField({
        name: 'expertises',
        title: 'Expertise(s) liée(s)',
        type: 'array',
        of: [{ type: 'reference', to: { type: 'expertise' } }],
        validation: (Rule) => uniqueRule(Rule),
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
        subtitle: 'position',
        media: 'image',
      },
      prepare(selection) {
        const { subtitle } = selection;
        return { ...selection, subtitle: subtitle && `comme ${subtitle}` };
      },
    },
  });
