'use client';

import { SpeakerModal } from '../../modal';
import Subtitle from '../../subtitle';
import Paragraph from '../../paragraph';

export interface Speaker {
  id: string;
  imageSrc: string;
  name: string;
  talkTitle: string;
  talkAbstract?: string;
}

export interface SpeakersSectionProps {
  speakers: Speaker[];
  title?: string;
  description?: string;
}

export default function SpeakersSection({
  speakers,
  description,
  title = "Speakers"
}: Readonly<SpeakersSectionProps>) {
  return (
    <section className="bg-gray-4">
      <div className="flex flex-col items-center gap-8 container-custom py-12 px-4">
        <Subtitle weight="light" size="lg">{title}</Subtitle>

        <div className='w-2/3 te'>
          <Paragraph className='text-center' weight='light'>
            {description}
          </Paragraph>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8 max-w-7xl">
          {speakers?.map((speaker) => {
            const speakerId = `speaker-${speaker.id}`;

            return (
              <div key={speaker.id} className="flex flex-col items-center text-center space-y-3">

                <SpeakerModal
                  id={speakerId}
                  imageSrc={speaker.imageSrc}
                  name={speaker.name}
                  talkTitle={speaker.talkTitle}
                  talkAbstract={speaker.talkAbstract}
                />

                <label htmlFor={speakerId} className="cursor-pointer hover:opacity-80 transition-opacity duration-300 flex flex-col items-center">

                  <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-lg">
                    {speaker.imageSrc ? (
                      <img
                        src={speaker.imageSrc}
                        alt={speaker.name}
                        className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                      />
                    ) : null}
                  </div>

                  <div className='mt-4'>
                    <h3 className="font-semibold text-lg text-white leading-tight">{speaker.name}</h3>
                  </div>
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
