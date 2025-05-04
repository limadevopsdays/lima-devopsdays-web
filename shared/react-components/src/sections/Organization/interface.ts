export interface OrganizationProps {
  title: string;
  description: string;
  speakerProfile: SpeakerProfile[];
  coreValue: CoreValue[];
  email: string;
}

export interface SpeakerProfile {
  name: string;
  role: string;
  imageUrl: string;
}

export interface CoreValue {
  url: string;
  iconName: string;
  title: string;
  description: string
}
