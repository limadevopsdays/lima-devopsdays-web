import InstagramIcon from "../../icons/Instagram";
import LinkedinIcon from "../../icons/Linkedin";
import OrganizationMemberCard from "../../org-member-card";
import Paragraph from "../../paragraph";
import { OrganizationProps } from "./interface";

const iconsByName: Record<string, typeof InstagramIcon> = {
  "Instagram": InstagramIcon,
  "Linkedin": LinkedinIcon
}

export default function Organization({ title, description, speakerProfile, coreValue, email }: OrganizationProps) {

  return (
    <section className="bg-gray-4">
      <div className="container mx-auto py-16 px-4">
        <h2 className="text-4xl text-center mb-9 text-white ">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-8">
          {speakerProfile.map((member) => (
            <OrganizationMemberCard
              key={member.name}
              name={member.name}
              role={member.role}
              imageSrc={member.imageUrl}
            />
          ))}
        </div>
        <div className="flex mt-24 justify-between flex-col items-center gap-4 md:flex-row ">
          <Paragraph className="text-button-background-primary" size="xl">{description}</Paragraph>
          <div className="socials flex items-center gap-3 sm:gap-6">
            {coreValue.map(({ url, iconName }) => {
              const Icon = iconsByName[iconName];

              return (
                <a
                  key={url}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white"
                >
                  {Icon && <Icon width={32} height={32} />}
                </a>
              );
            })}
            <Paragraph color="primary" size="xl">{email}</Paragraph>
          </div>
        </div>
      </div>
    </section>
  )
}

export * from './interface';
