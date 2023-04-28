import { TypedObject } from '@portabletext/types';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

import { SanitySlug } from './base.model';
import { BaseExpertiseModel, ExpertiseModel } from './expertise.model';
import { BaseTeamMemberModel, TeamMemberModel } from './teamMember.model';

export interface PostModel {
  title: string;
  subtitle: string;
  slug: SanitySlug;
  author: TeamMemberModel;
  image?: SanityImageSource;
  alt?: string;
  expertise?: ExpertiseModel[];
  date: string;
  body: TypedObject | TypedObject[];
  _id: string;
}

export interface BasePostModel {
  title: string;
  subtitle: string;
  slug: { current: string };
  author: BaseTeamMemberModel;
  image?: SanityImageSource;
  alt?: string;
  expertise?: BaseExpertiseModel[];
  date: string;
}
