import { Meta, StoryObj } from '@storybook/react';
import Subtitle from '.'

const meta = {
  decorators: [(Story)=><div className='bg-surface-background-primary p-10' ><Story/></div>],
  title: 'Atoms/Subtitle',
  component: Subtitle,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Subtitle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const BoldSubtitle: Story = {
  args: {
    color: 'primary',
    weight: 'bold',
    style: 'normal',
    children: '¡Enviaremos la clave de acceso al correo electrónico registrado!',
  }
}

