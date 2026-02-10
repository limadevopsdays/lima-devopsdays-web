import type { Meta, StoryObj } from '@storybook/react';
import Modal from './index';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    // Aquí podrías agregar controles si el componente tuviera props
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Historia básica del modal
export const Default: Story = {
  render: () => (
    <div className="p-8">
      <Modal />
      <label
        htmlFor="toggle"
        className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600"
      >
        Toggle Modal
      </label>
    </div>
  ),
};

