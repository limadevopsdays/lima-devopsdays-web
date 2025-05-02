import Subtitle from '../../subtitle';
import Paragraph from '../../paragraph';
import PanelGridRoot from '../../panel-grid/PanelGridRoot';
import PanelRow from '../../panel-grid/PanelRow';
import Panel from '../../panel';
import Button from '../../button';
import { ReactNode } from 'react';

export interface CallForSpeakersSectionProps {
  title: string;
  description: ReactNode;
  topics: string[][];
}

export default function CallForSpeakersSection({ title, description, topics }: CallForSpeakersSectionProps) {
  return (
    <section className='flex flex-col items-center gap-9 mt-16 mb-20'>
      <div className='flex flex-col items-center gap-4'>
        <Subtitle size='lg'>{title}</Subtitle>
        <Paragraph className='text-center max-w-[620px]'>{description}</Paragraph>
      </div>
      <PanelGridRoot>
        {topics.map((row, rowIndex) => (
          <PanelRow key={rowIndex}>
            {row.map((topic, topicIndex) => (
              <Panel key={topicIndex}>
                <Paragraph as="span">{topic}</Paragraph>
              </Panel>
            ))}
          </PanelRow>
        ))}
      </PanelGridRoot>
      <Button size="large" variant='primary'>Quiero ser speaker</Button>
    </section>
  );
}