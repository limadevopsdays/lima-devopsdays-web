"use client";

import { useState } from 'react';
import TabLabel from '../../tabs/TabLabel';
import TabContent from '../../tabs/TabContent';
import Subtitle from '../../subtitle';
import Paragraph from '../../paragraph';
import AgendaRow from '../../agendaRow';

export interface AgendaItem {
  date: string;
  title: string;
  description: string;
}

export interface AgendaProps {
  tabLabels: string[];
  agendaItemsBy: Record<string, AgendaItem[]>;
}

function convertISOToSimpleTime(isoString: string): string {
  const date = new Date(isoString);

  let hours = date.getHours();
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours === 0 ? 12 : hours;

  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${hours}:${minutes} ${ampm}`;
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
    <section className='bg-gray-4'>
      <div className="container px-4 py-12 container-custom">
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
                  <Paragraph as="span" size="lg" color="secondary">{convertISOToSimpleTime(item.date)}</Paragraph>
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
