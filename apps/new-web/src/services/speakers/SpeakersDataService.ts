import { injectable } from 'inversify';
import { IContentData, GetPagesSectionOptions, GetModalsOptions } from '../IContentData';
import { ApiScheduleData, SpeakerWithTalk } from './types';

@injectable()
export class SpeakersDataService implements IContentData {
  private scheduleCache: ApiScheduleData | null = null;
  private readonly apiUrl = 'https://talks.devopsdays.org/devopsdays-lima-2025/schedule/widgets/schedule.json';

  private async fetchScheduleData(): Promise<ApiScheduleData> {
    if (this.scheduleCache) {
      return Promise.resolve(this.scheduleCache);
    }

    try {
      const response = await fetch(this.apiUrl);
      if (!response.ok) {
        throw new Error(`Error fetching schedule data: ${response.statusText}`);
      }
      this.scheduleCache = await response.json() as ApiScheduleData;
      return this.scheduleCache;
    } catch (error) {
      console.error('Error fetching schedule data:', error);

      return {
        talks: [],
        rooms: [],
        speakers: [],
        event_start: '',
        event_end: '',
        timezone: '',
        version: '',
        tracks: []
      };
    }
  }

  private extractSpeakersWithTalks(scheduleData: ApiScheduleData): SpeakerWithTalk[] {
    const speakersMap = new Map<string, any>();
    
    scheduleData.speakers.forEach(speaker => {
      speakersMap.set(speaker.code, speaker);
    });

    const speakersWithTalks: SpeakerWithTalk[] = [];
    const processedSpeakers = new Set<string>();

    scheduleData.talks.forEach(talk => {
      if (talk.speakers && talk.speakers.length > 0) {
        talk.speakers.forEach(speakerCode => {
          if (!processedSpeakers.has(speakerCode)) {
            const speaker = speakersMap.get(speakerCode);
            if (speaker) {
              const talkTitle = typeof talk.title === 'string' 
                ? talk.title 
                : talk.title?.es || talk.title?.en || 'Sin título';

              speakersWithTalks.push({
                id: speaker.code,
                name: speaker.name,
                imageSrc: speaker.avatar || speaker.avatar_thumbnail_default || speaker.avatar_thumbnail_tiny || '',
                talkTitle,
                talkAbstract: talk.abstract
              });
              
              processedSpeakers.add(speakerCode);
            }
          }
        });
      }
    });

    return speakersWithTalks;
  }

  async getSectionsBySlug(options: GetPagesSectionOptions<any>): Promise<any[]> {
    if (options.slug !== 'speakers') {
      return [];
    }

    try {
      const scheduleData = await this.fetchScheduleData();
      const speakersWithTalks = this.extractSpeakersWithTalks(scheduleData);

      if (speakersWithTalks.length === 0) {
        return [];
      }

      const transformedData = {
        sys: {
          id: 'speakers-section',
          contentType: {
            sys: {
              id: 'speakers'
            }
          }
        },
        fields: {
          speakers: speakersWithTalks,
          title: 'Speakers',
          description: 'Conoce a nuestros increíbles speakers del DevOpsDays Lima 2025'
        }
      };

      return [transformedData];
    } catch (error) {
      console.error('Error transforming speakers data:', error);
      return [];
    }
  }

  async getPages(): Promise<any[]> {
    return [];
  }

  async getModals(options?: GetModalsOptions<any>): Promise<any[]> {
    return [];
  }
}