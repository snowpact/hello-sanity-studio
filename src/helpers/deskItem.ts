import { StructureBuilder, StructureResolverContext } from 'sanity/desk';
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list';
import {
  FaSortAlphaDown,
  FaSortAlphaDownAlt,
  FaSortNumericDown,
  FaSortNumericDownAlt,
} from 'react-icons/fa';
import { LightSchema } from './desk';

// Our singleton type has a list item with a custom child
// Instead of rendering a list of documents, we render a single
// document, specifying the `documentId` manually to ensure
// that we're editing the single instance of the document
export function createSingletonView(S: StructureBuilder, schema: LightSchema) {
  return S.listItem()
    .title(schema.title)
    .icon(schema.icon)
    .child(S.document().id(schema.name).schemaType(schema.name).documentId(schema.name));
}

export function createOrderableView(S: StructureBuilder, schema: LightSchema, context: any) {
  return orderableDocumentListDeskItem({
    type: schema.name,
    title: schema.title,
    icon: schema.icon,
    S,
    context,
  });
}

export function createListView(S: StructureBuilder, schema: LightSchema) {
  return S.listItem()
    .title(schema.title)
    .icon(schema.icon)
    .child(
      S.documentList()
        .title(schema.title)
        .filter('_type == "' + schema.name + '"')
        .defaultOrdering([{ field: 'date', direction: 'desc' }])
        .menuItems([
          S.orderingMenuItem({
            title: '',
            by: [{ field: 'date', direction: 'desc' }],
            name: 'sortDateDesc',
          })
            .title('Plus récent')
            .icon(FaSortNumericDownAlt),
          S.orderingMenuItem({
            title: '',
            by: [{ field: 'date', direction: 'asc' }],
            name: 'sortDateAsc',
          })
            .title('Plus ancien')
            .icon(FaSortNumericDown),
          S.orderingMenuItem({
            title: '',
            by: [{ field: 'title', direction: 'asc' }],
            name: 'sortTitleAsc',
          })
            .title('Titre croissant')
            .icon(FaSortAlphaDown),
          S.orderingMenuItem({
            title: '',
            by: [{ field: 'title', direction: 'desc' }],
            name: 'sortTitleDesc',
          })
            .title('Titre décroissant')
            .icon(FaSortAlphaDownAlt),
        ])
    );
}
