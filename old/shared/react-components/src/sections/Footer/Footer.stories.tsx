import { Meta, StoryObj } from '@storybook/react';
import Footer from './index';

const meta: Meta<typeof Footer> = {
  decorators: [Story => <div className="bg-gray-5 p-4 rounded-md"><Story /></div>],
  title: 'Sections/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Default: Story = {
  args: {
    about: {
      title: "DevOpsDay Lima",
      description: "Buscamos ser el hub de la transformación tecnológica, brindando a los participantes inspiración, conocimiento y herramientas para liderar el cambio."
    },
    links: {
      title: "Enlaces",
      items: [
        { text: "Conócenos", url: "/conocenos" },
        { text: "Speakers", url: "/speakers" },
        { text: "Agenda", url: "/agenda" },
        { text: "Call for Speakers", url: "/call-for-speakers" }
      ]
    },
    contact: {
      title: "Contacto",
      location: "Lima, Peru",
      email: "contacto@devopsdays.pe"
    },
    social: {
      title: "Síguenos",
      location: "Lima, Peru",
      email: "contacto@devopsdays.pe"
    },
    copyright: "© 2025 DevOpsDays. Made with <3 in Peru",
    legalLinks: [
      { text: "Política de Privacidad", url: "/privacidad" },
      { text: "Código de Conducta", url: "/conducta" }
    ]
  }
};