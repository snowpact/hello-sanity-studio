import { TypedObject } from '@portabletext/types';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

import { SanitySlug } from './base.model';
import { ExpertiseModel } from './expertise.model';

export interface ProjectModel {
  title: string;
  slug: SanitySlug;
  date: Date;
  client?: string;
  icon: SanityImageSource;
  body?: TypedObject | TypedObject[];
  expertises?: ExpertiseModel[];
  _id: string;
}
