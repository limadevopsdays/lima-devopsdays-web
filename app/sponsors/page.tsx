'use client';

// Benefits comparison table component
const BenefitsTable = () => {
  // Table data for sponsor benefits
  const benefits = [
    { benefit: 'Precio paquete normal', bronze: '$1,500.00', silver: '$3,000.00', gold: '$5,000.00' },
    {
      benefit: 'Paquete Early Bird: 20% Dcto (hasta 23/04/2025)',
      bronze: '$1,200.00',
      silver: '$2,400.00',
      gold: '$4,000.00',
    },
    { benefit: 'Entradas de cortesía', bronze: '2', silver: '4', gold: '8' },
    { benefit: 'Logos en web, banners y correos a participantes', bronze: '✔', silver: '✔', gold: '✔' },
    { benefit: 'Logo en materiales promocionales', bronze: '✔', silver: '✔', gold: '✔' },
    {
      benefit: 'Logo en pantallas dentro del evento y/o durante los descansos',
      bronze: 'Sí',
      silver: 'Sí',
      gold: 'Sí',
    },
    { benefit: '% descuento entradas corporativas (máximo 10)', bronze: '5%', silver: '10%', gold: '20%' },
    {
      benefit: 'Reconocimiento en redes sociales (LinkedIn e Instagram)',
      bronze: 'Mención',
      silver: 'Publicidad',
      gold: 'Publicidad Destacada',
    },
    { benefit: 'Mención del presentador al inicio del evento', bronze: '-', silver: '✔', gold: '✔' },
    { benefit: 'Dimensiones del stand', bronze: '-', silver: 'Pequeño (1m x 1m)', gold: 'Grande (3m x 2m)' },
    { benefit: 'Presentación en escenario central', bronze: '-', silver: '2 min.', gold: '5 min.' },
  ];

  // Function to determine background color based on tier
  const getTierBackgroundColor = (tier: 'gold' | 'silver' | 'bronze') => {
    switch (tier) {
      case 'gold':
        return 'bg-yellow-500/20 dark:bg-yellow-900/30';
      case 'silver':
        return 'bg-gray-300/20 dark:bg-gray-600/30';
      case 'bronze':
        return 'bg-amber-600/20 dark:bg-amber-800/30';
      default:
        return 'bg-gradient-to-br from-gray-900 to-black text-cyan-400';
    }
  };

  // Function to determine header color based on tier
  const getTierHeaderColor = (tier: 'gold' | 'silver' | 'bronze' | 'default') => {
    switch (tier) {
      case 'gold':
        return 'bg-yellow-500/20 dark:bg-yellow-900/30 text-white';
      case 'silver':
        return 'bg-gray-300/20 dark:bg-gray-600/30 text-gray-800 text-white';
      case 'bronze':
        return 'bg-amber-600/20 dark:bg-amber-800/30 text-white';
      case 'default':
        return 'bg-gradient-to-br from-gray-900 to-black text-cyan-400';
      default:
        return '';
    }
  };

  return (
    <div className="w-full px-4 py-6">
      {/* Desktop version */}
      <div className="hidden md:block rounded-lg overflow-hidden shadow-xl bg-gradient-to-br from-gray-900 to-black border border-[#1EBDD1]/20">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#1EBDD1]/20 dark:divide-gray-700 ">
            <thead>
              <tr>
                <th
                  scope="col"
                  className={`px-6 py-4 text-center text-sm font-medium uppercase  tracking-wider ${getTierHeaderColor(
                    'default'
                  )}`}
                >
                  Beneficios
                </th>
                <th
                  scope="col"
                  className={`px-6 py-4 text-center text-sm font-medium uppercase tracking-wider ${getTierHeaderColor(
                    'bronze'
                  )}`}
                >
                  Bronze
                </th>
                <th
                  scope="col"
                  className={`px-6 py-4 text-center text-sm font-medium uppercase tracking-wider ${getTierHeaderColor(
                    'silver'
                  )}`}
                >
                  Silver
                </th>
                <th
                  scope="col"
                  className={`px-6 py-4 text-center text-sm font-medium uppercase tracking-wider ${getTierHeaderColor(
                    'gold'
                  )}`}
                >
                  Gold
                </th>
              </tr>
            </thead>
            <tbody className="bg-white/5 dark:bg-gray-800 divide-y divide-gray-800 dark:divide-gray-700 ">
              {benefits.map((row, index) => (
                <tr key={index} className="hover:bg-black/40 dark:hover:bg-gray-700/70 transition-colors">
                  <td className="px-6 py-4 text-sm font-normal text-white">{row.benefit}</td>
                  <td className={`px-6 py-4 text-center text-sm text-gray-300 ${getTierBackgroundColor('bronze')}`}>
                    {row.bronze}
                  </td>
                  <td className={`px-6 py-4 text-center text-sm text-gray-300 ${getTierBackgroundColor('silver')}`}>
                    {row.silver}
                  </td>
                  <td className={`px-6 py-4 text-center text-sm text-gray-300 ${getTierBackgroundColor('gold')}`}>
                    {row.gold}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile version - card style for each benefit */}
      <div className="md:hidden space-y-6">
        {benefits.map((row, index) => (
          <div
            key={index}
            className="bg-white/5 dark:bg-gray-800 shadow rounded-lg overflow-hidden border border-[#1EBDD1]/20"
          >
            <div className="px-4 py-3 dark:bg-gray-700  dark:text-white font-medium">{row.benefit}</div>
            <div className="grid grid-cols-3 divide-x divide-gray-200/20 dark:divide-gray-700">
              <div className={`px-4 py-3 text-center ${getTierBackgroundColor('bronze')}`}>
                <div className="text-xs uppercase text-gray-500 dark:text-gray-400 mb-1">Bronze</div>
                <div className="text-sm text-gray-300">{row.bronze}</div>
              </div>
              <div className={`px-4 py-3 text-center ${getTierBackgroundColor('silver')}`}>
                <div className="text-xs uppercase text-gray-500 dark:text-gray-400 mb-1">Silver</div>
                <div className="text-sm text-gray-300">{row.silver}</div>
              </div>
              <div className={`px-4 py-3 text-center ${getTierBackgroundColor('gold')}`}>
                <div className="text-xs uppercase text-gray-500 dark:text-gray-400 mb-1">Gold</div>
                <div className="text-sm text-gray-300">{row.gold}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Sponsors() {
  return (
    <section id="sponsors" className="py-40 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#1EBDD1] to-[#8C51BF]">
          Nuestros Sponsors
        </h2>

        <div className="overflow-x-auto">
          <div className="flex justify-center items-center mb-8">
            <span className="text-2xl font-bold text-center text-gray-400 mb-0">
              Impulse su marca en el principal evento DevOps de Perú
            </span>
          </div>
          <div className="flex justify-center items-center mb-8">
            <p className="flex justify text-gray-400 mb-0">
              DevOpsDays Lima es una conferencia organizada por voluntarios dedicados a la comunidad DevOps. El éxito de
              este evento depende significativamente del apoyo de organizaciones comprometidas con la innovación
              tecnológica.
            </p>
          </div>

          <div className="flex justify-center items-center mb-8">
            <span className="text-2xl font-bold text-center text-gray-400 mb-0">
              ¿Por qué patrocinar DevOpsDays Lima?
            </span>
          </div>
          <div className="flex items-center mb-8">
            <p className="text-center text-gray-400 mb-0">Al convertirse en patrocinador, su organización:</p>
          </div>
          <div className="flex justify-center items-center mb-8">
            <ul className="list-disc list-inside text-gray-400">
              <li>
                Ganará visibilidad estratégica ante más de 450 profesionales de tecnología incluyendo ingenieros DevOps,
                especialistas en cloud, desarrolladores, líderes de TI y tomadores de decisiones.{' '}
              </li>
              <li>
                {' '}
                Obtendrá reconocimiento prominente en nuestro sitio web y canales de redes sociales antes, durante y
                después del evento.
              </li>
              <li>
                Tendrá la oportunidad de realizar presentaciones breves durante el programa oficial (según el nivel de
                patrocinio).
              </li>
              <li>
                Establecerá conexiones de valor con una comunidad en crecimiento en el mercado tecnológico peruano.
              </li>
            </ul>
          </div>

          <div className="flex justify-center items-center mb-8">
            <span className="text-2xl font-bold text-center text-gray-400 mb-0">Nuestra filosofía de patrocinio</span>
          </div>
          <div className="flex justify-center items-center mb-8">
            <p className="flex text-justify text-gray-400 mb-0">
              DevOpsDays es fundamentalmente un evento centrado en la comunidad. Las organizaciones que obtienen mayor
              valor son aquellas que participan activamente y se relacionan genuinamente con los asistentes como colegas
              del sector. Recomendamos enviar a sus profesionales técnicos que puedan interactuar con otros
              participantes de manera auténtica y significativa. Las tácticas de marketing agresivo generalmente no son
              bien recibidas en este entorno colaborativo.
            </p>
          </div>

          {/* Sponsor Benefits Table */}
          <div className="mt-12 mb-8">
            <h3 className="text-2xl font-bold text-center text-gray-400 mb-4">Beneficios de Patrocinio</h3>
            <BenefitsTable />
          </div>
        </div>

        {/* Platinum Sponsors */}
        {/* <div className="mb-16">
          <h3 className="text-2xl font-bold text-center text-[#1EBDD1] mb-8">Platinum Sponsors</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {sponsorLogos.platinum.map((sponsor) => (
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
            {sponsorLogos.gold.map((sponsor) => (
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
            {sponsorLogos.silver.map((sponsor) => (
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

        <div className="overflow-x-auto">
          <div className="flex items-center mb-8">
            <p className="flex text-gray-400 mb-0">*Los precios no incluyen IGV</p>
          </div>

          <div className="flex items-center mb-8">
            <p className=" text-gray-400 mb-0">
              Para información detallada sobre cada nivel de patrocinio y beneficios específicos, descargue nuestro
              Media Kit completo:
            </p>
          </div>
        </div>
        <div className=" text-center flex gap-16 justify-center items-center ">
          <a href="https://assets.devopsdays.org/events/2025/lima/DevOpsDays-ES-Lima-2025.pdf" target="_blank">
            <button className="bg-gradient-to-r from-[#1EBDD1] to-[#8C51BF] text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity">
              Media Kit en Español
            </button>
          </a>
          <a href="https://assets.devopsdays.org/events/2025/lima/DevOpsDays-EN-Lima-2025.pdf" target="_blank">
            <button className="bg-gradient-to-r from-[#1EBDD1] to-[#8C51BF] text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity">
              Media Kit en Inglés
            </button>
          </a>
        </div>

        <div className="flex justify-center items-center mb-8 mt-12">
          <span className="text-2xl font-bold text-center text-gray-400 mb-0">Patrocinio Comunitario</span>
        </div>
        <div className="flex justify-center items-center mb-8">
          <p className="text-justify text-gray-400 mb-0 mt-2">
            Ofrecemos alianzas estratégicas no monetarias para organizaciones afines. Este formato está especialmente
            diseñado para conferencias regionales, comunidades tecnológicas y medios de comunicación especializados
            interesados en establecer colaboraciones mutuamente beneficiosas.
            {/* </p>{' '} */}
            <br />
            <br />
            {/* <p className="text-justify text-gray-400 mb-0 mt-2"> */}
            Para calificar como patrocinador comunitario, su organización debe compartir nuestra visión de impulsar la
            transformación tecnológica en Lima, comprometerse a promover activamente DevOpsDays Lima en sus canales y
            adherirse a nuestro código de conducta.
            {/* </p>{' '} */}
            <br />
            <br />
            {/* <p className="text-justify text-gray-400 mb-0 mt-2"> */}
            Como reconocimiento, los patrocinadores comunitarios recibirán dos entradas de cortesía para el evento,
            posicionamiento de marca en nuestros sitios web oficiales y visibilidad en nuestros materiales promocionales
            y comunicaciones con participantes.
          </p>{' '}
          <br />
        </div>

        <div className="flex justify-center items-center mb-8">
          <span className="text-2xl font-bold text-center text-gray-400 mb-0">Información de contacto</span>
        </div>
        <div className="flex justify-center items-center mb-8">
          <p className="text-justify text-gray-400 mb-0 mt-2">
            Si está interesado en convertirse en patrocinador de DevOpsDays Lima o desea obtener información adicional,
            por favor contáctenos en lima@devopsdays.org.
            <br />
            <br />
            Al patrocinar este evento, usted acepta cumplir con nuestro{' '}
            <a href="https://devopsdays.org/events/2025-lima/conduct" target="_blank">
              <span className="font-bold mb-6 bg-clip-text bg-gradient-to-r text-[#8C51BF]">Código de Conducta</span>
            </a>
          </p>
        </div>

        <div className="flex justify-center items-center mb-8">
          <span className="text-2xl font-bold text-center text-gray-400 mb-0">Política de datos</span>
        </div>
        <div className="flex justify-center items-center mb-8">
          <p className="text-justify text-gray-400 mb-0 mt-2">
            DevOpsDays Lima no comparte información de registro de los asistentes directamente con los patrocinadores.
            Sin embargo, podrá recopilar información con consentimiento explícito de los participantes durante el
            evento, especialmente a través de interacciones en su stand.
          </p>
        </div>
      </div>
    </section>
  );
}
