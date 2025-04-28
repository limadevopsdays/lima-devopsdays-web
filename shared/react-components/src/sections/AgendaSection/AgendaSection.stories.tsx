import type { Meta, StoryObj } from '@storybook/react';
import AgendaSection from './AgendaSection';

const meta: Meta<typeof AgendaSection> = {
  decorators: [Story => <div className="bg-gray-4 p-4 rounded-md"><Story /></div>],
  title: 'Sections/AgendaSection',
  component: AgendaSection,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AgendaSection>;

export const Default: Story = {
  args: {
    tabLabels: ['Sala 1', 'Sala 2', 'Sala 3'],
    agendaItemsBy: {
      'Sala 1': [
        {
          time: '8:30 am',
          title: 'Registro & Bienvenida',
          description: 'Acompañado de Welcome Coffee',
        },
        {
          time: '9:00 am',
          title: 'Inicio de DevOps Days Lima',
          description: 'Discurso inaugural y apertura',
        },
        {
          time: '10:00 am',
          title: 'Charla Técnica',
          description: 'Detalles sobre DevOps y herramientas',
        },
        {
          time: '11:00 am',
          title: 'Break',
          description: 'Momento para networking y café',
        },
      ],
      'Sala 2': [
        {
          time: '10:00 am',
          title: 'Charla Técnica',
          description: 'Detalles sobre DevOps y herramientas',
        },
        {
          time: '11:30 am',
          title: 'Workshop',
          description: 'Taller práctico sobre CI/CD',
        },
        {
          time: '1:00 pm',
          title: 'Almuerzo',
          description: 'Tiempo para almorzar y socializar',
        },
      ],
      'Sala 3': [
        {
          time: '11:00 am',
          title: 'Panel de Discusión',
          description: 'Expertos discuten sobre el futuro de DevOps',
        },
        {
          time: '12:30 pm',
          title: 'Charla Inspiracional',
          description: 'Historias de éxito en la industria',
        },
        {
          time: '2:00 pm',
          title: 'Cierre del Evento',
          description: 'Palabras finales y agradecimientos',
        },
      ],
    },
  },
};