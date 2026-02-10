import type { Meta, StoryObj } from '@storybook/react';
import AgendaRow from '.';
import Paragraph from '../paragraph';
import Subtitle from '../subtitle';

const meta: Meta<typeof AgendaRow> = {
  title: 'Molecules/AgendaRow',
  component: AgendaRow,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof AgendaRow>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: (
      <>
        <Paragraph as="span" size="lg" color="secondary">8:30 am</Paragraph>
        <div className="flex-1 flex flex-col gap-2">
          <Subtitle size="lg" weight="bold">Registro & Bienvenida</Subtitle>
          <Paragraph color="secondary">Acompañado de Welcome Coffee</Paragraph>
        </div>
      </>
    ),
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: (
      <>
        <Paragraph as="span" size="lg" color="secondary">9:00 am</Paragraph>
        <div className="flex-1 flex flex-col gap-2">
          <Subtitle size="lg" weight="bold">Inicio de DevOps Days Lima</Subtitle>
          <Paragraph color="secondary">Discurso inaugural y apertura</Paragraph>
        </div>
      </>
    ),
  },
};

export const BsicAgendaRows: Story = {
  render: () => (
    <div className="space-y-0">
      <AgendaRow variant="primary">
        <Paragraph as="span" size="lg" color="secondary">8:30 am</Paragraph>
        <div className="flex-1 flex flex-col gap-2">
          <Subtitle size="lg" weight="bold">Registro & Bienvenida</Subtitle>
          <Paragraph color="secondary">Acompañado de Welcome Coffee</Paragraph>
        </div>
      </AgendaRow>
      <AgendaRow variant="secondary">
        <Paragraph as="span" size="lg" color="secondary">8:30 am</Paragraph>
        <div className="flex-1 flex flex-col gap-2">
          <Subtitle size="lg" weight="bold">Inicio de DevOps Days Lima</Subtitle>
          <Paragraph color="secondary">Discurso inaugural y apertura</Paragraph>
        </div>
      </AgendaRow>
      <AgendaRow variant="primary">
        <Paragraph as="span" size="lg" color="secondary">8:30 am</Paragraph>
        <div className="flex-1 flex flex-col gap-2">
          <Subtitle size="lg" weight="bold">Evento 1</Subtitle>
          <Paragraph color="secondary">Acompañado de Welcome Coffee</Paragraph>
        </div>
      </AgendaRow>
      <AgendaRow variant="secondary">
        <Paragraph as="span" size="lg" color="secondary">8:30 am</Paragraph>
        <div className="flex-1 flex flex-col gap-2">
          <Subtitle size="lg" weight="bold">Evento 2</Subtitle>
          <Paragraph color="secondary">Detalle evento 2</Paragraph>
        </div>
      </AgendaRow>
    </div>
  ),
};