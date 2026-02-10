import { injectable } from 'inversify';
import { IContentData, GetPagesSectionOptions, GetModalsOptions } from '../IContentData';
import { ApiScheduleData } from './types';

@injectable()
export class AgendaDataService implements IContentData {
  private scheduleCache: ApiScheduleData | null = null;
  private readonly apiUrl = 'https://talks.devopsdays.org/devopsdays-lima-2025/schedule/widgets/schedule.json';

  private async fetchScheduleData(): Promise<ApiScheduleData> {
    if (this.scheduleCache) {
      return Promise.resolve(this.scheduleCache);
    }

    try {
      if (!this.apiUrl) {
        throw new Error('SCHEDULE_API_URL is not defined.');
      }
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

  async getSectionsBySlug(options: GetPagesSectionOptions<any>): Promise<any[]> {
    if (options.slug !== 'agenda') {
      return [];
    }

    try {
      const scheduleData = await this.fetchScheduleData();

      if (!scheduleData.talks || scheduleData.talks.length === 0) {
        return [];
      }

      const transformedData = {
        sys: {
          id: 'agenda-section',
          contentType: {
            sys: {
              id: 'agenda'
            }
          }
        },
        fields: scheduleData
      };

      return [transformedData];
    } catch (error) {
      console.error('Error transforming schedule data:', error);
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
