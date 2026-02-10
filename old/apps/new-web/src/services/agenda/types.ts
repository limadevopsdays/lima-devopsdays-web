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

export interface ApiRoom {
  id: number;
  name: string | { en: string; es: string };
  description?: any;
}

export interface ApiSpeaker {
  code: string;
  name: string;
  avatar?: string;
  avatar_thumbnail_default?: string;
  avatar_thumbnail_tiny?: string;
  bio?: string;
}

export interface ApiScheduleData {
  talks: ApiTalk[];
  rooms: ApiRoom[];
  speakers: ApiSpeaker[];
  event_start: string;
  event_end: string;
  timezone: string;
  version: string;
  tracks: any[];
}

export interface Talk {
  time: string;
  title: string;
  speaker: string;
}

export interface Room {
  id: string;
  name: string;
  talks: Talk[];
}

export interface ScheduleDay {
  date: string;
  rooms: Room[];
}

export interface Schedule {
  schedule: ScheduleDay[];
}