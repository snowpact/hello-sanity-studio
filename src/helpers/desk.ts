import { IconType } from 'react-icons';

import { StructureBuilder, StructureResolverContext } from 'sanity/desk';
import { DocumentActionComponent, DocumentActionsContext } from 'sanity';
import { createListView, createOrderableView, createSingletonView } from './deskItem';
import { ListOptions } from '../models/typeList';
import { SITE_SETTINGS_SCHEMA_ID, buildSiteSettingsSchema } from '../schemas/siteSettings';
import { PAGE_SETTINGS_SCHEMA_ID, buildPageSettingsSchema } from '../schemas/pageSettings';
import {
  EDITORIAL_SETTINGS_SCHEMA_ID,
  buildEditorialSettingsSchema,
} from '../schemas/editorialSettings';
import { POST_SCHEMA_ID, buildPostSchema } from '../schemas/post';
import { PROJECT_SCHEMA_ID, buildProjectSchema } from '../schemas/project';
import { TEAM_SCHEMA_ID, buildTeamSchema } from '../schemas/team';
import { EXPERTISE_SCHEMA_ID, buildExpertiseSchema } from '../schemas/expertise';
import { buildPageContentSchema } from '../schemas/pageContent';
import { buildBlockContentType } from '../types/blockContent';

export interface LightSchema {
  title: string;
  icon: IconType;
  name: string;
}

const SINGLETON_ACTIONS = new Set(['publish', 'discardChanges', 'restore']);
const singletonTypes: Set<string> = new Set([
  SITE_SETTINGS_SCHEMA_ID,
  PAGE_SETTINGS_SCHEMA_ID,
  EDITORIAL_SETTINGS_SCHEMA_ID,
]);

export interface HelloSanityStudioOptions {
  expertiseCategories: ListOptions;
  initCodeBlocks?: boolean;
}

export class HelloSanityStudio {
  private schemas: any[] = [];

  constructor({ expertiseCategories, initCodeBlocks = false }: HelloSanityStudioOptions) {
    this.schemas = [
      buildEditorialSettingsSchema(),
      buildPageSettingsSchema(),
      buildSiteSettingsSchema(),
      buildBlockContentType({ initCodeBlocks }),
      buildPageContentSchema(),
      buildPostSchema(),
      buildProjectSchema(),
      buildExpertiseSchema({ expertiseCategories }),
      buildTeamSchema(),
    ];
  }

  public getSchemaTypes() {
    return this.schemas;
  }

  public generateDesk(S: StructureBuilder, context: StructureResolverContext) {
    const settingsList = this.schemas.filter(
      (schema) =>
        schema.name === EDITORIAL_SETTINGS_SCHEMA_ID ||
        schema.name === SITE_SETTINGS_SCHEMA_ID ||
        schema.name === PAGE_SETTINGS_SCHEMA_ID
    );

    const groupOneList = this.schemas.filter(
      (schema) => schema.name === POST_SCHEMA_ID || schema.name === PROJECT_SCHEMA_ID
    );

    const groupTwoList = this.schemas.filter(
      (schema) => schema.name === EXPERTISE_SCHEMA_ID || schema.name === TEAM_SCHEMA_ID
    );

    const settingsView = settingsList.map((item) => createSingletonView(S, item));
    const groupOneView = groupOneList.map((item) => createListView(S, item));
    const groupTwoView = groupTwoList.map((item) => createOrderableView(S, item, context));

    return [...settingsView, S.divider(), ...groupOneView, S.divider(), ...groupTwoView];
  }

  // For singleton types, filter out actions that are not explicitly included
  // in the `SINGLETON_ACTIONS` list defined above
  filterOutSingletonActions(input: DocumentActionComponent[], context: DocumentActionsContext) {
    return singletonTypes.has(context.schemaType)
      ? input.filter(({ action }) => action && SINGLETON_ACTIONS.has(action))
      : input;
  }
}
