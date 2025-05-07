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
        violet: 'border-t border-r border-l border-[#B87BED] bg-gradient-to-t from-[#B87BED] via-[#B87BED] to-gray-5',
        silveGray: 'border-t border-r border-l border-[#565656] bg-gradient-to-t from-[#565656] via-[#565656] to-gray-5',
      },
    }
  }
});

export default SponsorTierCardHeader;