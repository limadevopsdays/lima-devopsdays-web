'use client';

import Image from 'next/image';

const sponsors = {
  platinum: [
    { name: 'AWS', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg' },
    { name: 'Google Cloud', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Google_Cloud_Logo.svg' },
    { name: 'Microsoft Azure', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Microsoft_Azure_Logo.svg' },
  ],
  gold: [
    { name: 'IBM', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg' },
    { name: 'Red Hat', logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d8/Red_Hat_logo.svg' },
    { name: 'Oracle', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg' },
    { name: 'VMware', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Vmware.svg' },
  ],
  silver: [
    { name: 'GitLab', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/GitLab_logo.svg' },
    {
      name: 'Docker',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Docker_%28container_engine%29_logo.svg',
    },
    { name: 'HashiCorp', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Hashicorp_Logo.svg' },
    { name: 'Elastic', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f4/Elastic_logo.svg' },
    { name: 'DataDog', logo: 'https://upload.wikimedia.org/wikipedia/en/2/25/Datadog_logo.svg' },
  ],
};

export default function Sponsors() {
  return (
    <section id="sponsors" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#1EBDD1] to-[#8C51BF]">
          Nuestros Sponsors
        </h2>


        <div className="overflow-x-auto">
        <div className="flex justify-center items-center">
        <span className="text-2xl font-bold text-center text-gray-400 mb-0">
          Resalta tu marca al unirte a esta experiencia.✨
        </span>
        </div>

    <table className="table-auto mx-auto text-center">
      
      <thead>
        <tr>
          <th className="px-6 py-4 text-lg font-medium text-gray-600">Bronze</th>
          <th className="px-6 py-4 text-lg font-medium text-gray-600">Silver</th>
          <th className="px-6 py-4 text-lg font-medium text-gray-600">Gold</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="px-6 py-4">
            <img src="img/badge-bronze.png" alt="Gold Sponsor" className="w-36 h-auto mx-auto" />
          </td>
          <td className="px-6 py-4">
            <img src="img/badge-silver.png" alt="Silver Sponsor" className="w-36 h-auto mx-auto" />
          </td>
          <td className="px-6 py-4">
            <img src="img/badge-gold.png" alt="Bronze Sponsor" className="w-36 h-auto mx-auto" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
        {/* Platinum Sponsors */}
        {/* <div className="mb-16">
          <h3 className="text-2xl font-bold text-center text-[#1EBDD1] mb-8">Platinum Sponsors</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {sponsors.platinum.map((sponsor) => (
              <div key={sponsor.name} className="bg-white/5 p-8 rounded-xl hover:bg-white/10 transition-colors">
                <div className="h-20 relative">
                  <Image
                    src={sponsor.logo}
                    alt={sponsor.name}
                    fill
                    className="object-contain filter brightness-0 invert"
                  />
                </div>
              </div>
            ))}
          </div>
        </div> */}

        {/* Gold Sponsors */}
        {/* <div className="mb-16">
          <h3 className="text-2xl font-bold text-center text-[#00A86B] mb-8">Gold Sponsors</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {sponsors.gold.map((sponsor) => (
              <div key={sponsor.name} className="bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-colors">
                <div className="h-16 relative">
                  <Image
                    src={sponsor.logo}
                    alt={sponsor.name}
                    fill
                    className="object-contain filter brightness-0 invert"
                  />
                </div>
              </div>
            ))}
          </div>
        </div> */}

        {/* Silver Sponsors */}
        {/* <div>
          <h3 className="text-2xl font-bold text-center text-gray-400 mb-8">Silver Sponsors</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
            {sponsors.silver.map((sponsor) => (
              <div key={sponsor.name} className="bg-white/5 p-4 rounded-xl hover:bg-white/10 transition-colors">
                <div className="h-12 relative">
                  <Image
                    src={sponsor.logo}
                    alt={sponsor.name}
                    fill
                    className="object-contain filter brightness-0 invert"
                  />
                </div>
              </div>
            ))}
          </div>
        </div> */}

        {/* Become a Sponsor */}
        <div className="mt-16 text-center">
          <a href="https://drive.google.com/file/d/1hyATwbpf9gOYiEwyyhY4X4F2nVNIVcTa/view?usp=sharing" target='_blank'>
            <button className="bg-gradient-to-r from-[#1EBDD1] to-[#8C51BF] text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity">
              Sé un Patrocinador
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}
