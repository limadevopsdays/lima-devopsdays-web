import Paragraph from '../../paragraph';

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

export default function Footer({
  about,
  links,
  contact,
  social,
  copyright,
  legalLinks
}: Readonly<FooterProps>) {
  return (
    <footer className="bg-gray-5">
      <div className='max-w-[1200px] mx-auto px-4 py-10'>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Paragraph color="tertiary" size="xl" className="mb-4">{about.title}</Paragraph>
            <Paragraph>{about.description}</Paragraph>
          </div>

          <div>
            <Paragraph color="tertiary" size="xl" className="mb-4">{links.title}</Paragraph>
            <ul className="list-disc list-inside text-white">
              {links.items.map((link, index) => (
                <li key={index}>
                  <Paragraph as="a" href={link.url} className="underline hover:text-gray-300 transition-colors">
                    {link.text}
                  </Paragraph>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Paragraph color="tertiary" size="xl" className="mb-4">{contact.title}</Paragraph>
            <Paragraph className="mb-2">{contact.location}</Paragraph>
            <Paragraph>
              <a href={`mailto:${contact.email}`} className="hover:text-gray-300 transition-colors">
                {contact.email}
              </a>
            </Paragraph>
          </div>

          <div>
            <Paragraph color="tertiary" size="xl" className="mb-4">{social.title}</Paragraph>
            <Paragraph className="mb-2">{social.location}</Paragraph>
            <Paragraph as="a" href={`mailto:${social.email}`} className="hover:text-gray-300 transition-colors">
              {social.email}
            </Paragraph>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div>
            <Paragraph size="md" className="text-center md:text-left">
              {copyright}
            </Paragraph>
          </div>
          <div className="flex gap-6 mt-4 md:mt-0">
            {legalLinks.map((link, index) => (
              <Paragraph
                as="a"
                key={index}
                href={link.url}
                className="hover:text-gray-300 transition-colors"
              >
                {link.text}
              </Paragraph>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

