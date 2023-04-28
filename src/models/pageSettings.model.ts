import { SanityImageSource } from '@sanity/image-url/lib/types/types';

export interface PageSettingsModel {
  indexPage?: PageModel;
  teamPage?: PageModel;
  projectsPage?: PageModel;
  expertisePage?: PageModel;
  blogPage?: PageModel;
  contactPage?: PageModel;
  teamArticle?: PageModel;
  projectArticle?: PageModel;
  expertiseArticle?: PageModel;
  blogArticle?: PageModel;
  _id: string;
}

export interface PageModel {
  pageTitle?: string;
  pageDescription: string;
  heroBackground?: SanityImageSource;
  heroTitle?: string;
  heroSubtitle?: string;
}
