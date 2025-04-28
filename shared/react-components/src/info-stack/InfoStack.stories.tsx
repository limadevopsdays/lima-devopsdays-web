import HandShake from "../icons/HandShake";
import LigthBulb from "../icons/LigthBulb";
import Stocks from "../icons/Stocks";
import { InfoStack } from ".";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof InfoStack> = {
  decorators:[Story=><div className="bg-gray-4 p-4 rounded-md"><Story/></div>],
  title: "InfoStack",
  component: InfoStack,
  tags: ["autodocs"],
  parameters: {
    layout: 'centered',
  },
};
export default meta;

type Story = StoryObj<typeof InfoStack>;

export const Default: Story = {
  args: {
    icon: <HandShake className="bg-cyan-base rounded-md p-1" width={32} height={32} />,
    title: "Super Cool Title",
    description: "This is a description for the InfoStack component.",
  },
};

export const WithLightBulb: Story = {
  args: {
    icon: <LigthBulb className="bg-cyan-base rounded-md p-1" width={32} height={32} />,
    title: "Bright Idea",
    description: "InfoStack with a light bulb icon.",
  },
};

export const WithStocks: Story = {
  args: {
    icon: <Stocks className="bg-cyan-base rounded-md p-1" width={32} height={32} />,
    title: "Market Trends",
    description: "InfoStack with a stocks icon.",
  },
};

export const AsSection: Story = {
  args: {
    as: "section",
    icon: <HandShake className="bg-cyan-base rounded-md p-1" width={32} height={32} />,
    title: "Section Block",
    description: "InfoStack rendered as a <section> element.",
  },
};
