"use client";

import { useState } from 'react';
import TabLabel from '../../tabs/TabLabel';
import TabContent from '../../tabs/TabContent';
import Subtitle from '../../subtitle';
import Paragraph from '../../paragraph';
import AgendaRow from '../../agendaRow';

export interface AgendaItem {
  time: string;
  title: string;
  description: string;
}

export interface AgendaProps {
  tabLabels: string[];
  agendaItemsBy: Record<string, AgendaItem[]>;
}

//TODO: refactor to avoid client component
export default function AgendaSection({ tabLabels, agendaItemsBy }: AgendaProps) {
  const [currentTabActive, setCurrentTabActive] = useState<string>(`tab${tabLabels[0]}`);

  const handleClick = (event: React.MouseEvent<HTMLLabelElement>) => {
    const tabId = event.currentTarget.htmlFor;
    if (tabId) {
      setCurrentTabActive(tabId);
    }
  };

  return (
    <section>
      <div className="container mx-auto px-4">
        <Subtitle size="lg" className="text-center mb-8">Agenda</Subtitle>

        <div className="flex pb-2 gap-3 border-b border-surface-border">
          {tabLabels.map((label) => (
            <TabLabel
              key={`tab${label}`}
              htmlFor={`tab${label}`}
              variant={currentTabActive === `tab${label}` ? 'active' : 'default'}
              onClick={handleClick}
            >
              {label}
            </TabLabel>
          ))}
        </div>

        {tabLabels.map((label, index) => (
          <TabContent
            key={`tab${label}`}
            tabName="agenda"
            tabId={`tab${label}`}
            defaultChecked={index === 0}
          >
            <div className="space-y-0">
              {agendaItemsBy[label]?.map((item, idx) => (
                <AgendaRow key={idx} variant={idx % 2 === 0 ? 'primary' : 'secondary'}>
                  <Paragraph as="span" size="lg" color="secondary">{item.time}</Paragraph>
                  <div className="flex-1 flex flex-col gap-2">
                    <Subtitle className='text-2xl leading-6 md:text-4xl md:leading-10' size="lg" weight="bold">{item.title}</Subtitle>
                    <Paragraph color="secondary">{item.description}</Paragraph>
                  </div>
                </AgendaRow>
              ))}
            </div>
          </TabContent>
        ))}
      </div>
    </section>
  );
}
