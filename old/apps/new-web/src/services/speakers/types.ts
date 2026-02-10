export interface ApiSpeaker {
  code: string;
  name: string;
  avatar?: string;
  avatar_thumbnail_default?: string;
  avatar_thumbnail_tiny?: string;
  bio?: string;
}

export interface ApiTalk {
  id: number;
  title: string | { en: string; es: string };
  abstract?: string;
  speakers: string[];
  start: string;
  end: string;
  room: number;
  duration?: number;
  code?: string;
}

export interface ApiScheduleData {
  talks: ApiTalk[];
  rooms: any[];
  speakers: ApiSpeaker[];
  event_start: string;
  event_end: string;
  timezone: string;
  version: string;
  tracks: any[];
}

export interface SpeakerWithTalk {
  id: string;
  name: string;
  imageSrc: string;
  talkTitle: string;
  talkAbstract?: string;
}