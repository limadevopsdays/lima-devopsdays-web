import { Meta, StoryObj } from '@storybook/react';
import Header, { HeaderProps } from './index';

const meta: Meta<typeof Header> = {
  decorators: [Story => (
    <div className="bg-gray-4 min-h-screen flex flex-col">
      <Story />
      {/* Hero Section */}
      <section className="w-full bg-gray-4 py-16 flex flex-col items-center justify-center border-b border-gray-300">
        <h1 className="text-4xl font-extrabold mb-2 text-gray-900">DevOpsDay Lima 2025</h1>
        <p className="text-lg text-gray-800 mb-4">Join us for a day of learning, networking, and fun!</p>
        <button className="bg-blue-700 text-white px-6 py-2 rounded shadow hover:bg-blue-800 transition">Register Now</button>
      </section>
      {/* About Section */}
      <section className="max-w-[1200px] mx-auto py-12 px-4">
        <h2 className="text-2xl font-bold mb-4">About the Event</h2>
        <p className="mb-6 text-gray-700">DevOpsDay Lima brings together professionals, enthusiasts, and experts to share knowledge and best practices in DevOps, cloud, and automation. Expect inspiring talks, hands-on workshops, and great networking opportunities.</p>
      </section>
      {/* Speakers Section */}
      <section className="bg-gray-4 py-12 border-t border-b border-gray-300">
        <div className="max-w-[1200px] mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Featured Speakers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1,2,3].map(i => (
              <div key={i} className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
                <div className="w-24 h-24 bg-gray-300 rounded-full mb-4" />
                <h3 className="font-semibold text-lg mb-1">Speaker {i}</h3>
                <p className="text-gray-600 text-sm">Expert in DevOps & Cloud</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Schedule Section */}
      <section className="max-w-[1200px] mx-auto py-12 px-4">
        <h2 className="text-2xl font-bold mb-4">Schedule</h2>
        <ul className="space-y-3">
          <li className="bg-white rounded p-4">09:00 - 10:00: Registration & Welcome</li>
          <li className="bg-white rounded p-4">10:00 - 12:00: Keynotes & Talks</li>
          <li className="bg-white rounded p-4">12:00 - 13:00: Lunch Break</li>
          <li className="bg-white rounded p-4">13:00 - 17:00: Workshops & Networking</li>
        </ul>
      </section>
      {/* Sponsors Section */}
      <section className="bg-gray-4 py-12 border-t border-gray-300">
        <div className="max-w-[1200px] mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Sponsors</h2>
          <div className="flex flex-wrap gap-8 justify-center items-center">
            {[1,2,3,4].map(i => (
              <div key={i} className="w-32 h-16 bg-white rounded shadow flex items-center justify-center text-gray-400">Logo {i}</div>
            ))}
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-gray-900 text-center py-6 mt-8 text-gray-200">
        © 2025 DevOpsDay Lima. All rights reserved.
      </footer>
    </div>
  )],
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
