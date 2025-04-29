import { Meta, StoryObj } from '@storybook/react';
import SponsorTierCard from './index';
import SponsorTierCardHeader from './SponsorTierCardHeader';
import SponsorTierCardBody from './SponsorTierCardBody';
import Paragraph from '../paragraph';
import Subtitle from '../subtitle';

export default {
  decorators: [Story => <div className="bg-gray-4 p-12 rounded-md"><Story /></div>],
  title: 'Components/SponsorTierCard',
  component: SponsorTierCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} as Meta<typeof SponsorTierCard>;

type Story = StoryObj<typeof SponsorTierCard>;

export const Default: Story = {
  render: () => (
    <div className='w-[380px]'>
      <SponsorTierCard>
        <SponsorTierCardHeader tier="bronze">
          <Subtitle size="md">
            Bronce
          </Subtitle>
          <Paragraph size="md">
            Sponsor Básico
          </Paragraph>
          <Subtitle size='lg' className='mt-3'>
            $1,500 USD
          </Subtitle>
        </SponsorTierCardHeader>
        <SponsorTierCardBody tier='bronze'>
          <ul className='list-disc list-inside' >
            <li>Entradas cortesía: 2</li>
            <li>Descuento entradas corporativas (Max. 10): 5%</li>
            <li>Mención en redes sociales</li>
          </ul>
        </SponsorTierCardBody>
      </SponsorTierCard>
    </div>
  ),
};

export const ThreeCards: Story = {
  render: () => (
    <div className="flex items-stretch gap-6">
      <SponsorTierCard>
        <SponsorTierCardHeader tier="bronze">
          <Subtitle size="md">
            Bronce
          </Subtitle>
          <Paragraph size="md">
            Sponsor Básico
          </Paragraph>
          <Subtitle size='lg' className='mt-3'>
            $1,500 USD
          </Subtitle>
        </SponsorTierCardHeader>
        <SponsorTierCardBody tier='bronze'>
          <ul className='list-disc list-inside'>
            <li>Entradas cortesía: 2</li>
            <li>Descuento entradas corporativas (Max. 10): 5%</li>
            <li>Mención en redes sociales</li>
          </ul>
        </SponsorTierCardBody>
      </SponsorTierCard>

      <SponsorTierCard>
        <SponsorTierCardHeader tier="silver">
          <Subtitle size="md">
            Plata
          </Subtitle>
          <Paragraph size="md">
            Sponsor Avanzado
          </Paragraph>
          <Subtitle size='lg' className='mt-3'>
            $3,000 USD
          </Subtitle>
        </SponsorTierCardHeader>
        <SponsorTierCardBody tier='silver'>
          <ul className='list-disc list-inside'>
            <li>Entradas cortesía: 4</li>
            <li>Descuento entradas corporativas (Max. 10): 10%</li>
            <li>Post en redes sociales (LinkedIn e Instagram)</li>
            <li>Mención del presentador</li>
            <li>Stand pequeño (1mx1m)</li>
            <li>Presentación en escenario central: 2 min.</li>
          </ul>
        </SponsorTierCardBody>
      </SponsorTierCard>

      <SponsorTierCard>
        <SponsorTierCardHeader tier="gold">
          <Subtitle size="md">
            Oro
          </Subtitle>
          <Paragraph size="md">
            Sponsor Deluxe
          </Paragraph>
          <Subtitle size='lg' className='mt-3'>
            $5,000 USD
          </Subtitle>
        </SponsorTierCardHeader>
        <SponsorTierCardBody tier='gold'>
          <ul className='list-disc list-inside'>
            <li>Entradas cortesía: 8</li>
            <li>Descuento entradas corporativas (Max. 10): 20%</li>
            <li>Post Destacado en redes sociales (LinkedIn e Instagram)</li>
            <li>Mención del presentador</li>
            <li>Stand grande (3mx2m)</li>
            <li>Presentación en escenario central: 5 min.</li>
          </ul>
        </SponsorTierCardBody>
      </SponsorTierCard>
    </div >
  ),
};