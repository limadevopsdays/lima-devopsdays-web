export interface OrganizationProps {
  title: string;
  speakerProfile: SpeakerProfile[];
}

export interface SpeakerProfile {
  name: string;
  role: string;
  imageUrl: string;
}
