export interface LinkItem {
  text: string;
  url: string;
}

export interface AboutSection {
  title: string;
  description: string;
}

export interface LinksSection {
  title: string;
  items: LinkItem[];
}

export interface ContactSection {
  title: string;
  location: string;
  email: string;
}

export interface SocialSection {
  title: string;
  location: string;
  email: string;
}

export interface FooterProps {
  about: AboutSection;
  links: LinksSection;
  contact: ContactSection;
  social: SocialSection;
  copyright: string;
  legalLinks: LinkItem[];
}
