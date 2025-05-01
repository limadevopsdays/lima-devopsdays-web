import { Meta, StoryObj } from '@storybook/react';
import Header, { HeaderProps } from './index';

const meta: Meta<typeof Header> = {
  decorators: [Story => <div className="bg-gray-5 rounded-md"><Story /></div>],
  title: 'Sections/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    logoText: "DevOpsDay Lima",
    navItems: [
      { text: "Speakers", href: "/speakers", variant: "text" },
      { text: "Agenda", href: "/agenda", variant: "text" },
      { text: "Sponsors", href: "/sponsors", variant: "text" },
      { text: "Inscribirme", href: "/inscribirme", variant: "secondary" },
    ]
  } as HeaderProps,
};