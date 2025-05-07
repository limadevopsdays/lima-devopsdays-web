import { createResponsiveStyled } from '@dyesthetics-lab/react-tv-variants-creators';

const SponsorTierCardBody = createResponsiveStyled({
  tag: 'div',
  preset: {
    base: ["bg-gray-4", "text-white", "py-6", "px-9", "rounded-b-3xl flex-1"],
    variants: {
      tier: {
        bronze: 'border-b border-l border-r border-[#44422E]',
        silver: 'border-b border-l border-r border-[#565656]',
        silveGray: 'border-b border-l border-r border-[#565656]',
        gold: 'border-b border-l border-r border-[#5A4F25]',
        violet: 'border-b border-l border-r border-[#B87BED]',
      },
    }
  },
});

export default SponsorTierCardBody;