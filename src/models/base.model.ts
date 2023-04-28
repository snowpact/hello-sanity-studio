export interface SanityBaseModel {
  _id: string;
}

export interface SanitySlug {
  current: string;
}

export type SlugModel = { slug: SanitySlug };
