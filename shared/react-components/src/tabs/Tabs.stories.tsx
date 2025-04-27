import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import TabLabel from './TabLabel';
import TabContent from './TabContent';

const meta: Meta = {
  title: 'Molecules/Tabs',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicTabs: Story = {
  render: () => {
    const [currentTabActive, setCurrentTabActive] = useState<string>('tab1');

    const handleClick = (event: React.MouseEvent<HTMLLabelElement>) => {
      const tabId = event.currentTarget.htmlFor;
      if (tabId) {
        setCurrentTabActive(tabId);
      }
    };

    return (
      <div className="tabs-container">
        <div className="flex mb-4 gap-3">
          <TabLabel
            htmlFor="tab1"
            variant={currentTabActive === 'tab1' ? 'active' : 'default'}
            onClick={handleClick}
          >
            Tab 1
          </TabLabel>
          <TabLabel
            htmlFor="tab2"
            variant={currentTabActive === 'tab2' ? 'active' : 'default'}
            onClick={handleClick}
          >
            Tab 2
          </TabLabel>
          <TabLabel
            htmlFor="tab3"
            variant={currentTabActive === 'tab3' ? 'active' : 'default'}
            onClick={handleClick}
          >
            Tab 3
          </TabLabel>
        </div>

        <TabContent className='text-white' tabName='tabs' tabId="tab1" defaultChecked={currentTabActive === 'tab1'}>
          Content for Tab 1
        </TabContent>

        <TabContent className='text-white' tabName='tabs' tabId="tab2" defaultChecked={currentTabActive === 'tab2'}>
          Content for Tab 2
        </TabContent>

        <TabContent className='text-white' tabName='tabs' tabId="tab3" defaultChecked={currentTabActive === 'tab3'}>
          Content for Tab 3
        </TabContent>
      </div>
    );
  }
};