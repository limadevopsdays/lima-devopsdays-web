import type { Meta, StoryObj } from '@storybook/react';
import PanelGrid from './index';

const meta = {
  decorators: [(Story)=><div className='bg-surface-background-primary p-10' ><Story/></div>],
  title: 'Molecules/PanelGrid',
  component: PanelGrid,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
  },
} satisfies Meta<typeof PanelGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    panels: [
      {
        id: 'group-1',
        panelGroup: [
          { id: 'panel-1', title: 'Agile' },
          { id: 'panel-2', title: 'CI/CD' },
          { id: 'panel-3', title: 'Continuous Testing' },
          { id: 'panel-4', title: 'Continuous Security' },
        ],
      },
      {
        id: 'group-2',
        panelGroup: [
          { id: 'panel-5', title: 'Infrastructure as Code' },
          { id: 'panel-6', title: 'Site Reliability Engineering' },
          { id: 'panel-7', title: 'AI & MLOps' },
        ],
      },
      {
        id: 'group-3',
        panelGroup: [
          { id: 'panel-8', title: 'Platform Engineering' },
          { id: 'panel-9', title: 'CloudOps' },
          { id: 'panel-10', title: 'Culture Transformation' },
        ],
      },
    ],
  },
};
