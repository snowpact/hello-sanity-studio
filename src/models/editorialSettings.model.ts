import { groq } from '@sanity/groq-store';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

export interface EditorialSettingsModel {
  approaches: CardModel[];
  values: CardModel[];
  portfolio: ReferenceModel[];
  reviews: ReviewModel[];
  _id: string;
}

export interface CardModel {
  image?: SanityImageSource;
  title: string;
  description: string;
  footer?: string;
  _key: string;
}

export interface ReferenceModel {
  image: SanityImageSource;
  title: string;
  _key: string;
}

export interface ReviewModel {
  content: string;
  author: string;
  _key: string;
}
