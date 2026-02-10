import type { Meta, StoryObj } from '@storybook/react';
import PanelGridRoot from './PanelGridRoot';
import PanelRow from './PanelRow';
import Panel from '../panel';
import Paragraph from '../paragraph';

const meta = {
  decorators: [(Story)=><div className='bg-surface-background-primary p-10' ><Story/></div>],
  title: 'Atoms/PanelGridRoot',
  component: PanelGridRoot,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PanelGridRoot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Compositional: Story = {
  args: {},
  render: () => (
    <PanelGridRoot>
      <PanelRow>
        <Panel>
          <Paragraph as="span">Agile</Paragraph>
        </Panel>
        <Panel>
          <Paragraph as="span">CI/CD</Paragraph>
        </Panel>
      </PanelRow>
      <PanelRow>
        <Panel>
          <Paragraph as="span">Infrastructure as Code</Paragraph>
        </Panel>
        <Panel>
          <Paragraph as="span">Site Reliability Engineering</Paragraph>
        </Panel>
      </PanelRow>
    </PanelGridRoot>
  ),
};
