import { Meta, StoryObj } from "@storybook/react";
import DevopsDaysLogo from "./DevopsDaysLogo";
import HandShake from "./HandShake";
import LigthBulb from "./LigthBulb";
import Stocks from "./Stocks";

const meta = {
  title: "Atoms/Icons",
  component: DevopsDaysLogo,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof DevopsDaysLogo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DevopsDaysLogoStory: Story = {
  args: {
  },
  render: (args) => <DevopsDaysLogo  {...args} />,
};

export const HandShakeStory: Story = {
  args: {
    className: "bg-cyan-base rounded-md p-1",
    width: 32,
    height: 32,
  },
  render: (args) => <HandShake {...args} />,
};

export const LigthBulbStory: Story = {
  args: {
    className: "bg-cyan-base rounded-md p-1",
    width: 32,
    height: 32,
  },
  render: (args) => <LigthBulb {...args} />,
};

export const StocksStory: Story = {
  args: {
    className: "bg-cyan-base rounded-md p-1",
    width: 32,
    height: 32,
  },
  render: (args) => <Stocks {...args} />,
};
