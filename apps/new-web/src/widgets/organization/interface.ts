export interface OrganizationPropsDefault {
  title: string;
  speakerProfile: SpeakerProfileDefault[];
  coreValue: CoreValueDefault[];
  description: string;
  email: string;
}

export interface CoreValueDefault {
  metadata: Metadata;
  sys: CoreValueSys;
  fields: CoreValueFields;
}

export interface CoreValueFields {
  iconName: string;
  title: string;
  description: string;
  url: string;
}

export interface Metadata {
  tags: any[];
  concepts: any[];
}

export interface CoreValueSys {
  space: ContentType;
  id: string;
  type: FluffyType;
  createdAt: Date;
  updatedAt: Date;
  environment: ContentType;
  publishedVersion: number;
  revision: number;
  contentType?: ContentType;
  locale: Locale;
}

export interface ContentType {
  sys: ContentTypeSys;
}

export interface ContentTypeSys {
  type: PurpleType;
  linkType: LinkType;
  id: ID;
}

export enum ID {
  CoreValue = "coreValue",
  Master = "master",
  S8Dnqsb59Dym = "s8dnqsb59dym",
  SpeakerProfile = "speakerProfile",
}

export enum LinkType {
  ContentType = "ContentType",
  Environment = "Environment",
  Space = "Space",
}

export enum PurpleType {
  Link = "Link",
}

export enum Locale {
  EnUS = "en-US",
}

export enum FluffyType {
  Asset = "Asset",
  Entry = "Entry",
}

export interface SpeakerProfileDefault {
  metadata: Metadata;
  sys: CoreValueSys;
  fields: SpeakerProfileFields;
}

export interface SpeakerProfileFields {
  name: string;
  role: string[];
  image: FieldsImage;
  socialNetworks: SocialNetworkDefault[];
}

export interface SocialNetworkDefault {
  metadata: Metadata;
  sys: CoreValueSys;
  fields: SocialNetworkField;
}

export interface SocialNetworkField {
  iconName: string;
  url: string;
}

export interface FieldsImage {
  metadata: Metadata;
  sys: CoreValueSys;
  fields: ImageFields;
}

export interface ImageFields {
  title: string;
  description: string;
  file: File;
}

export interface File {
  url: string;
  details: Details;
  fileName: string;
  contentType: string;
}

export interface Details {
  size: number;
  image: DetailsImage;
}

export interface DetailsImage {
  width: number;
  height: number;
}
