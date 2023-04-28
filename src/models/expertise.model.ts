import { SanityImageSource } from '@sanity/image-url/lib/types/types';

import { SanitySlug } from './base.model';

export interface ExpertiseModel {
  name: string;
  slug: SanitySlug;
  mastered: boolean;
  category?: string;
  icon?: SanityImageSource;
  title?: string;
  grayscale?: boolean;
  subtitle?: string;
  body?: string;
  pros?: string[];
  cons?: string[];
  lexicography?: LexicographyItemModel[];
  orderRank?: string;
  isStackItem: boolean;
  hasLandingPage: boolean;
  _id: string;
}
export interface BaseExpertiseModel {
  name: string;
  slug: SanitySlug;
}

export interface LexicographyItemModel {
  label: string;
  link: string;
  _key: string;
}
