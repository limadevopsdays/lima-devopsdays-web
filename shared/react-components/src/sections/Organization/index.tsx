import OrganizationMemberCard from "../../org-member-card";
import { OrganizationProps } from 'react-components/sections/Organization';

export default function Organization({ title, speakerProfile }: OrganizationProps) {

  return (
    <section className="bg-gray-4">
      <div className="container mx-auto py-16 px-4">
        <h2 className="text-4xl text-center mb-9 text-white ">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-7 gap-8">
          {speakerProfile.map((member) => (
            <OrganizationMemberCard
              key={member.name}
              name={member.name}
              role={member.role}
              imageSrc={member.imageUrl}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
export * from './interface';
