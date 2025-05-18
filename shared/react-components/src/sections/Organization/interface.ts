export interface OrganizationProps {
  title: string;
  speakerProfile: SpeakerProfile[];
}

export interface SpeakerProfile {
  name: string;
  role: string[];
  imageUrl: string;
  socialNetworks?: SocialNetwork[];
}

export interface SocialNetwork {
  iconName: string;
  url: string;
}
