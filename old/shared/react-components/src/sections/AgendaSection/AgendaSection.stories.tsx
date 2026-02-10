import type { Meta, StoryObj } from '@storybook/react';
import AgendaSection from '.';

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
          date: new Date('2023-10-01T09:00:00Z').toISOString(),
          title: 'Registro & Bienvenida',
          description: 'Acompañado de Welcome Coffee',
        },
        {
          date: new Date('2023-10-01T09:00:00Z').toISOString(),
          title: 'Inicio de DevOps Days Lima',
          description: 'Discurso inaugural y apertura',
        },
        {
          date: new Date('2023-10-01T09:00:00Z').toISOString(),
          title: 'Charla Técnica',
          description: 'Detalles sobre DevOps y herramientas',
        },
        {
          date: new Date('2023-10-01T09:00:00Z').toISOString(),
          title: 'Break',
          description: 'Momento para networking y café',
        },
      ],
      'Sala 2': [
        {
          date: new Date('2023-10-01T09:00:00Z').toISOString(),
          title: 'Charla Técnica',
          description: 'Detalles sobre DevOps y herramientas',
        },
        {
          date: new Date('2023-10-01T09:00:00Z').toISOString(),
          title: 'Workshop',
          description: 'Taller práctico sobre CI/CD',
        },
        {
          date: new Date('2023-10-01T09:00:00Z').toISOString(),
          title: 'Almuerzo',
          description: 'Tiempo para almorzar y socializar',
        },
      ],
      'Sala 3': [
        {
          date: new Date('2023-10-01T09:00:00Z').toISOString(),
          title: 'Panel de Discusión',
          description: 'Expertos discuten sobre el futuro de DevOps',
        },
        {
          date: new Date('2023-10-01T09:00:00Z').toISOString(),
          title: 'Charla Inspiracional',
          description: 'Historias de éxito en la industria',
        },
        {
          date: new Date('2023-10-01T09:00:00Z').toISOString(),
          title: 'Cierre del Evento',
          description: 'Palabras finales y agradecimientos',
        },
      ],
    },
  },
};
