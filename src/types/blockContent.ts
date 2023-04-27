import { FaRegImage } from 'react-icons/fa';
import { defineType, defineArrayMember } from 'sanity';

/**
 * This is the schema definition for the rich text fields used for
 * for this blog studio. When you import it in schemas.js it can be
 * reused in other parts of the studio with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */
export const buildBlockContentType = ({ initCodeBlocks }: { initCodeBlocks: boolean }) => {
  const codeBlockMember = defineArrayMember({
    type: 'code',
    name: 'codeblock',
    title: 'Code',
    options: {
      language: 'javascript',
      languageAlternatives: [
        { title: 'Bash', value: 'bash' },
        { title: 'C', value: 'c' },
        { title: 'CSS', value: 'css' },
        { title: 'Docker', value: 'docker' },
        { title: 'GraphQL', value: 'graphql' },
        { title: 'Java', value: 'java' },
        { title: 'JavaScript', value: 'javascript' },
        { title: 'JSON', value: 'json' },
        { title: 'JSX', value: 'jsx' },
        { title: 'Makefile', value: 'makefile' },
        { title: 'Markdown', value: 'markdown' },
        { title: 'Markup', value: 'markup' },
        { title: 'PHP', value: 'php' },
        { title: 'Python', value: 'python' },
        { title: 'SQL', value: 'sql' },
        { title: 'Swift', value: 'swift' },
        { title: 'TypeScript', value: 'typescript' },
        { title: 'TSX', value: 'tsx' },
        { title: 'YAML', value: 'yaml' },
      ],
      withFilename: true,
    },
  });

  const type = defineType({
    title: 'Block Content',
    name: 'blockContent',
    type: 'array',
    of: [
      defineArrayMember({
        title: 'Block',
        type: 'block',
        // Styles let you set what your user can mark up blocks with. These
        // correspond with HTML tags, but you can set any title or value
        // you want and decide how you want to deal with it where you want to
        // use your content.
        // @ts-ignore
        styles: [
          { title: 'Normal', value: 'normal' },
          { title: 'H1', value: 'h1' },
          { title: 'H2', value: 'h2' },
          { title: 'H3', value: 'h3' },
          { title: 'H4', value: 'h4' },
          { title: 'Quote', value: 'blockquote' },
        ],
        lists: [
          { title: 'Liste à puces', value: 'bullet' },
          { title: 'Liste ordonnée', value: 'number' },
        ],
        // Marks let you mark up inline text in the block editor.
        marks: {
          // Decorators usually describe a single property – e.g. a typographic
          // preference or highlighting by editors.
          decorators: [
            { title: 'Gras', value: 'strong' },
            { title: 'Italique', value: 'em' },
            { title: 'Code', value: 'code' },
          ],
          // Annotations can be any object structure – e.g. a link or a footnote.
          annotations: [
            {
              name: 'link',
              title: 'Lien externe',
              type: 'object',
              fields: [
                {
                  title: 'URL',
                  name: 'href',
                  type: 'url',
                  initialValue: 'https://',
                },
              ],
            },
            // TODO on client side it's hard to implement slug from reference
            // we need to update each GROQ query to fetch the slug
            // {
            //   name: 'internalLink',
            //   type: 'reference',
            //   title: 'Lien interne',
            //   icon: FaCompressAlt,
            //   to: [
            //     {type: 'post'},
            //     {type: 'team'},
            //     {type: 'project'},
            //     {type: 'expertise'},
            //     // other types you may want to link to
            //   ],
            // },
          ],
        },
      }),
      // You can add additional types here. Note that you can't use
      // primitive types such as 'string' and 'number' in the same array
      // as a block type.
      defineArrayMember({
        type: 'image',
        name: 'image',
        title: 'Image',
        icon: FaRegImage,
        options: { hotspot: true },
        fields: [
          {
            name: 'alt',
            type: 'string',
            title: 'Texte alternatif',
          },
        ],
      }),
    ],
  });

  if (initCodeBlocks) {
    type.of.push(codeBlockMember);
  }

  return type;
};
