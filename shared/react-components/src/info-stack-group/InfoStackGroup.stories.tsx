import HandShake from "../icons/HandShake";
import LigthBulb from "../icons/LigthBulb";
import Stocks from "../icons/Stocks";
import InfoStackGroup from ".";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof InfoStackGroup> = {
  decorators: [Story => <div className="bg-gray-4 p-4 rounded-md"><Story /></div>],
  title: "Molecules/InfoStackGroup",
  component: InfoStackGroup,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof InfoStackGroup>;

export const Default: Story = {
  args: {
    title: "Our Key Features",
    items: [
      {
        id: "handshake",
        icon: <HandShake className="bg-cyan-base rounded-md p-1" width={32} height={32} />,
        title: "Collaboration",
        description: "We foster strong partnerships and teamwork.",
      },
      {
        id: "lightbulb",
        icon: <LigthBulb className="bg-cyan-base rounded-md p-1" width={32} height={32} />,
        title: "Innovation",
        description: "Bright ideas drive our progress.",
      },
      {
        id: "stocks",
        icon: <Stocks className="bg-cyan-base rounded-md p-1" width={32} height={32} />,
        title: "Growth",
        description: "We help you reach new heights.",
      },
    ],
  },
};
