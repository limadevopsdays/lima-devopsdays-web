import OrganizationMemberCard from "../../org-member-card";
import { OrganizationProps } from 'react-components/sections/Organization';
import TwitterIcon from '../../icons/Twitter';
import InstagramIcon from '../../icons/Instagram';
import LinkedinIcon from '../../icons/Linkedin';

export interface SocialNetwork {
  url: string;
  icon: React.ReactNode;
}

const iconsByName: Record<string, typeof TwitterIcon> = {
  "Twitter": TwitterIcon,
  "Instagram": InstagramIcon,
  "Linkedin": LinkedinIcon
}

export default function Organization({ title, speakerProfile }: OrganizationProps) {

  return (
    <section className="bg-gray-4">
      <div className="container mx-auto py-16 px-4">
        <h2 className="text-4xl text-center mb-9 text-white ">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-7 gap-8">
          {speakerProfile?.map((member) => {
            const { name, imageUrl, role } = member
            const socialNetworks: SocialNetwork[] | undefined = member.socialNetworks?.map(({ url, iconName }) => {
              const Icon = iconsByName[iconName]
              return {
                url,
                icon: Icon ? <Icon /> : null
              }
            })

            return (
              <OrganizationMemberCard
                key={name}
                imageUrl={imageUrl}
                name={name}
                role={role}
                socialNetworks={socialNetworks}
              />
            )
          })}

        </div>
      </div>
    </section>
  )
}
export * from './interface';
