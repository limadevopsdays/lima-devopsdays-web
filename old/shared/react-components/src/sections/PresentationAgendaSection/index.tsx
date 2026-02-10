"use client";

import { useState } from 'react';
import TabLabel from '../../tabs/TabLabel';
import TabContent from '../../tabs/TabContent';
import Subtitle from '../../subtitle';
import Paragraph from '../../paragraph';
import DiversityIcon from '../../icons/Diversity';
import ArticlePersonIcon from '../../icons/ArticlePerson';
import ForkSpoonIcon from '../../icons/ForkSpoon';
import WavingHandIcon from '../../icons/WavingHand';
import PersonalPlaceIcon from '../../icons/PersonalPlace';
import CampaignIcon from '../../icons/Campaign';

export interface Speaker {
  name: string;
  image: string;
}

export interface Talk {
  title: string;
  iconName?: string;
  speakers?: Speaker[];
  date: string;
}

function convertISOToSimpleTime(isoString: string): string {
  const date = new Date(isoString);
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Lima',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
  return formatter.format(date);
}

function getSpeakerNames(speakers: Speaker[]): string {
  return speakers.map(speaker => speaker.name).join(' & ');
}

export interface AgendaSectionAsyncProps {
  talksByRoom: Record<string, Talk[]>;
}

const iconByName = {
  'Diversity': DiversityIcon,
  'ArticlePerson': ArticlePersonIcon,
  'ForkSpoon': ForkSpoonIcon,
  'WavingHand': WavingHandIcon,
  'PersonalPlace': PersonalPlaceIcon,
  'Campaign': CampaignIcon
};

export default function PresentationAgendaSection({ talksByRoom }: AgendaSectionAsyncProps) {
  const tabLabels = Object.keys(talksByRoom);
  const [currentTabActive, setCurrentTabActive] = useState<string>(tabLabels[0] || '');

  const handleClick = (label: string) => {
    setCurrentTabActive(label);
  };

  return (
    <section className="bg-gray-4">
      <div className="container px-4 py-12 container-custom">
        <Subtitle size="lg" className="text-center mb-8">Agenda</Subtitle>
        <div className="flex pb-2 gap-3 border-b border-surface-border">
          {tabLabels.map((label) => (
            <TabLabel
              key={`tab${label}`}
              htmlFor={`tab${label}`}
              variant={currentTabActive === label ? 'active' : 'default'}
              onClick={() => handleClick(label)}
            >
              {label}
            </TabLabel>
          ))}
        </div>
        {tabLabels.map((label, index) => (
          currentTabActive === label && (
            <TabContent
              key={`tab${label}`}
              tabName="agenda"
              tabId={`tab${label}`}
              defaultChecked={index === 0}
            >
              <div className="flex flex-col gap-2">
                {talksByRoom[label]?.map((talk, talkIdx) => {

                  const Icon = talk.iconName && iconByName[talk.iconName as keyof typeof iconByName]

                  return (
                    <div className='bg-[#1F1F1F] py-4 pl-7 rounded-xl grid grid-cols-[auto_1fr] gap-2 md:gap-[80px]' key={talkIdx}>
                      <Paragraph as="span" size="lg" color="secondary">{convertISOToSimpleTime(talk.date)}</Paragraph>

                      <div className="flex gap-4 items-start md:items-center">
                        {talk.speakers?.length && (
                          <div className="flex gap-2 flex-col md:flex-row">
                            {talk.speakers.map((speaker, speakerIdx) => (
                              <div key={speakerIdx} className="flex w-[64px] h-[64px]">
                                <img src={speaker.image} alt={speaker.name} className="rounded-xl object-cover" />
                              </div>
                            ))}
                          </div>
                        )}

                        {Icon && (
                          <div className="flex items-center justify-center w-[64px] h-[64px] bg-[#B87BED] rounded-xl">
                            <Icon />
                          </div>
                        )}

                        <div className='flex flex-col'>
                          <Paragraph size="lg" weight="regular">{talk.title}</Paragraph>
                          {talk.speakers?.length && (
                            <Paragraph as="span" size="md" color="secondary">{getSpeakerNames(talk.speakers)}</Paragraph>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </TabContent>
          )
        ))}
      </div>
    </section>
  );
}

