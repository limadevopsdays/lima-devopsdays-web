import { createResponsiveStyled } from '@dyesthetics-lab/react-tv-variants-creators';

const SponsorTierCardHeader = createResponsiveStyled({
  tag: 'div',
  preset: {
    base: ["rounded-t-3xl py-8 px-9 border-t"],
    variants: {
      tier: {
        bronze: 'border-t border-r border-l border-[#44422E] bg-gradient-to-t from-[#44422E] via-[#44422E] to-gray-4',
        silver: 'border-t border-r border-l border-[#565656] bg-gradient-to-t from-[#565656] via-[#565656] to-gray-4',
        gold: 'border-t border-r border-l border-[#5A4F25] bg-gradient-to-t from-[#5A4F25] via-[#5A4F25] to-gray-4',
      },
    }
  }
});

export default SponsorTierCardHeader;