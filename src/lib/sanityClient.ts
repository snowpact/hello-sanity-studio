import imageUrlBuilder from '@sanity/image-url';
import { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { createClient, SanityClient as OriginalSanityClient } from '@sanity/client';

import { SlugModel } from '../models/base.model';
import { EditorialSettingsModel } from '../models/editorialSettings.model';
import { ExpertiseModel } from '../models/expertise.model';
import { PageSettingsModel } from '../models/pageSettings.model';
import { BasePostModel, PostModel } from '../models/post.model';
import { ProjectModel } from '../models/project.model';
import { TeamMemberModel } from '../models/teamMember.model';
import { SiteSettingsModel } from '../models/siteSettings.model';

type CollectionDocument = 'expertise' | 'project' | 'team' | 'post';

type HelloSanityStudioClientOptions = {
  projectId: string;
  dataset: string;
};

export class HelloSanityStudioClient {
  client: OriginalSanityClient;
  builder: ImageUrlBuilder;

  constructor(options: HelloSanityStudioClientOptions) {
    this.client = createClient({
      projectId: options.projectId,
      dataset: options.dataset,
      apiVersion: '2022-03-25',
      useCdn: false,
    });

    this.builder = imageUrlBuilder(this.client);
  }

  // HELPERS
  public urlFor(source?: SanityImageSource): string {
    if (!source) {
      return '';
    }
    try {
      return this.builder.image(source).url();
    } catch {
      return '';
    }
  }

  // Public fetch methods
  async fetchContactData(): Promise<SiteSettingsModel> {
    const siteSettings = await this.client.fetch<SiteSettingsModel>(
      `*[_type == "siteSettings" && _id=="siteSettings"][0]`
    );

    return siteSettings;
  }

  async fetchPageSettings(): Promise<PageSettingsModel> {
    const pageSettings = await this.client.fetch<PageSettingsModel>(
      `*[_type == "pageSettings" && _id=="pageSettings"][0]`
    );

    return pageSettings;
  }

  async fetchEditorialSettings(): Promise<EditorialSettingsModel> {
    const editorialSettings = await this.client.fetch<EditorialSettingsModel>(
      `*[_type == "editorialSettings" && _id=="editorialSettings"][0]`
    );
    return editorialSettings;
  }

  async fetchExpertiseItems(): Promise<ExpertiseModel[]> {
    const expertises = await this.client.fetch<ExpertiseModel[]>(
      `*[_type == "expertise"]|order(orderRank)`
    );
    return expertises;
  }

  async fetchStacksExpertiseItems(): Promise<ExpertiseModel[]> {
    const expertises = await this.client.fetch<ExpertiseModel[]>(
      `*[_type == "expertise" && isStackItem]|order(orderRank)`
    );
    return expertises;
  }

  async fetchStacksMasteredExpertiseItems(): Promise<ExpertiseModel[]> {
    const expertises = await this.client.fetch<ExpertiseModel[]>(
      `*[_type == "expertise" && isStackItem && mastered]|order(orderRank)`
    );
    return expertises;
  }

  async fetchSlugs(collection: CollectionDocument): Promise<SlugModel[]> {
    const slugs = await this.client.fetch<SlugModel[]>(`*[_type == "${collection}"]{slug}`);
    return slugs;
  }

  async fetchExpertiseBySlug(slug: string): Promise<ExpertiseModel> {
    const expertise = await this.client.fetch<ExpertiseModel>(
      `*[_type == "expertise" && slug.current=="${slug}"][0]`
    );
    return expertise;
  }

  async fetchProjectsItems(): Promise<ProjectModel[]> {
    const projects = await this.client.fetch<ProjectModel[]>(
      `*[_type == "project"]|order(date desc){..., expertises[]->}`
    );
    return projects;
  }

  async fetchProjectBySlug(slug: string): Promise<ProjectModel> {
    const project = await this.client.fetch<ProjectModel>(
      `*[_type == "project" && slug.current=="${slug}"][0]{..., expertises[]->}`
    );
    return project;
  }

  async fetchTeamItems(): Promise<TeamMemberModel[]> {
    const teams = await this.client.fetch<TeamMemberModel[]>(`*[_type == "team"]|order(orderRank)`);
    return teams;
  }

  async fetchTeamBySlug(slug: string): Promise<TeamMemberModel> {
    const teamMember = await this.client.fetch<TeamMemberModel>(
      `*[_type == "team" && slug.current=="${slug}"][0]{..., expertises[]->}`
    );
    return teamMember;
  }

  async fetchPostsItems(): Promise<PostModel[]> {
    const posts = await this.client.fetch<PostModel[]>(`*[_type == "post"]|order(date desc)`);
    return posts;
  }

  async fetchPostsHeaders(): Promise<BasePostModel[]> {
    const posts = await this.client.fetch<BasePostModel[]>(
      `*[_type == "post"]|order(date desc){title, subtitle, slug, image, alt, date, expertise[]->{name, slug},author->{name, slug, image}}`
    );
    return posts;
  }

  async fetchFullPost(slug: string): Promise<PostModel | null> {
    const post = await this.client.fetch<PostModel>(
      `*[_type == "post" && slug.current=="${slug}"]|order(date desc){..., expertise[]->,author->}[0]`
    );
    return post;
  }

  async fetchPostsAboutExpertiseID(id: string): Promise<PostModel[]> {
    const posts = await this.client.fetch<PostModel[]>(
      `*[_type == "post" && references(expertise, "${id}")]{..., expertise[]->,author->}`
    );
    return posts;
  }

  async fetchPostsWrittenByTeamID(id: string): Promise<PostModel[]> {
    const posts = await this.client.fetch<PostModel[]>(
      `*[_type == "post" && references(team, "${id}")]{..., expertise[]->,author->}`
    );
    return posts;
  }
}
