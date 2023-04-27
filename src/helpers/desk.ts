import { blockContent } from '../types';
import {
  post,
  siteSettings,
  pageSettings,
  expertise,
  project,
  pageContent,
  team,
  editorialSettings,
} from '../schemas';
import { IconType } from 'react-icons';

import { StructureBuilder, StructureResolverContext } from 'sanity/desk';
import { DocumentActionComponent, DocumentActionsContext } from 'sanity';
import { createListView, createOrderableView, createSingletonView } from './deskItem';
import { ListOptions } from '../models/typeList';

export interface LightSchema {
  title: string;
  icon: IconType;
  name: string;
}

const SINGLETON_ACTIONS = new Set(['publish', 'discardChanges', 'restore']);
const singletonTypes: Set<string> = new Set([
  siteSettings.name,
  pageSettings.name,
  editorialSettings.name,
]);

export interface HelloSanityStudioOptions {
  expertiseCategories: ListOptions;
}

export class HelloSanityStudio {
  private schemas: any[] = [];

  constructor({ expertiseCategories }: HelloSanityStudioOptions) {
    this.schemas = [
      editorialSettings,
      pageSettings,
      siteSettings,
      blockContent,
      pageContent,
      post,
      project,
      expertise({ expertiseCategories }),
      team,
    ];
  }

  public getSchemaTypes() {
    return this.schemas;
  }

  public generateDesk(S: StructureBuilder, context: StructureResolverContext) {
    const settingsList = [siteSettings, pageSettings, editorialSettings] as LightSchema[];
    const groupOneList = [post, project] as LightSchema[];
    const groupTwoList = [expertise, team] as LightSchema[];

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
