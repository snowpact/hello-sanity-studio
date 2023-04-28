export interface SiteSettingsModel {
  siteTitle?: string;
  phoneNumber?: string;
  mobileNumber?: string;
  email?: string;
  address?: string;
  socialMedia?: SocialMediaLink[];
  coordinates?: {
    lat: number;
    lng: number;
    alt: number;
  };
  contactFormTitle: string;
  contactFormImage: string;
  hubspotSettings: HubspotSettingsModel;
  _id: string;
}

export interface HubspotSettingsModel {
  formId?: string;
  portalId?: string;
}

export interface SocialMediaLink {
  label: string;
  link: string;
  _key: string;
}
