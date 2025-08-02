import { AgendaProps } from "react-components/sections/AgendaSection";
import { ApiScheduleData, ApiTalk, ApiRoom, ApiSpeaker } from "@/services/agenda/types";
import { ResolutionContext } from "inversify";

function transformer(props: any, _ctx: ResolutionContext): AgendaProps {
  return transformApiData(props);
};

const transformApiData = (data: ApiScheduleData): AgendaProps => {
  if (!data || !data.talks || !data.rooms || data.talks.length === 0) {
    return {
      tabLabels: [],
      agendaItemsBy: {}
    };
  }

  const roomsMap = new Map<number, ApiRoom>();
  data.rooms.forEach(room => {
    roomsMap.set(room.id, room);
  });

  const speakersMap = new Map<string, ApiSpeaker>();
  data.speakers.forEach(speaker => {
    speakersMap.set(speaker.code, speaker);
  });

  const validTalks = data.talks.filter(talk =>
    talk.room && roomsMap.has(talk.room)
  );

  const roomsWithTalks = Array.from(new Set(validTalks.map(talk => talk.room)))
    .map(roomId => roomsMap.get(roomId)!)
    .filter(Boolean)
    .sort((a, b) => a.id - b.id);

  const tabLabels = roomsWithTalks.map((room, index) => {
    let roomName = `Sala ${room.id}`;
    if (typeof room.name === 'string') {
      roomName = room.name;
    } else if (room.name && typeof room.name === 'object') {
      roomName = room.name.es || room.name.en || `Sala ${room.id}`;
    }
    return String(roomName);
  });

  const uniqueTabLabels = tabLabels.map((label, index) => {
    const duplicateCount = tabLabels.slice(0, index).filter(l => l === label).length;
    return duplicateCount > 0 ? `${label} (${duplicateCount + 1})` : label;
  });

  const agendaItemsBy: Record<string, any[]> = {};

  roomsWithTalks.forEach((room, index) => {
    const roomTalks = validTalks
      .filter(talk => talk.room === room.id)
      .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());

    const roomKey = uniqueTabLabels[index];
    agendaItemsBy[roomKey] = roomTalks.map(talk => {
      let title = 'Sin título';
      if (typeof talk.title === 'string') {
        title = talk.title;
      } else if (talk.title && typeof talk.title === 'object') {
        title = talk.title.es || talk.title.en || 'Sin título';
      }

      title = String(title);

      let description = '';
      if (talk.speakers && talk.speakers.length > 0) {
        const speakerNames = talk.speakers
          .map(speakerCode => speakersMap.get(speakerCode)?.name || 'Orador no confirmado')
          .join(', ');
        description = `Presentado por: ${speakerNames}`;
      } else {
        description = 'Evento general';
      }

      return {
        date: talk.start,
        title: title,
        description: description
      };
    });
  });

  return {
    tabLabels: uniqueTabLabels,
    agendaItemsBy
  };
};

export default transformer;

export { transformApiData };
