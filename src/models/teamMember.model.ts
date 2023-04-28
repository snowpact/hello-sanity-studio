import { SanityImageSource } from '@sanity/image-url/lib/types/types';

import { SanitySlug } from './base.model';
import { ExpertiseModel } from './expertise.model';

export interface TeamMemberModel {
  name: string;
  slug: SanitySlug;
  image: SanityImageSource;
  skills: string;
  position?: string;
  bio?: string;
  localization?: string;
  expertises?: ExpertiseModel[];
  orderRank?: string;
  _id: string;
}

export interface BaseTeamMemberModel {
  name: string;
  slug: SanitySlug;
  image: SanityImageSource;
}
