import { AgendaProps } from "react-components/sections/AgendaSection";

interface SessionSlot {
  fields: {
    description: string;
    title: string;
    date: string;
  }
}

interface EventVenue {
  fields: {
    title: string;
    sessionSlots: SessionSlot[];
  }
}

interface TransformerProps {
  title: string;
  eventVenues: EventVenue[]
}

const transformer = (props: TransformerProps): AgendaProps => {
  const newProps: AgendaProps = {
    tabLabels: props.eventVenues.map((venue) => venue.fields.title),
    agendaItemsBy: {
      ...props.eventVenues.reduce((acc, venue) => {
        const agendaItems = venue.fields.sessionSlots.map((sessionSlot) => ({
          date: sessionSlot.fields.date,
          title: sessionSlot.fields.title,
          description: sessionSlot.fields.description,
        }));

        return {
          ...acc,
          [venue.fields.title]: agendaItems,
        };
      }, {}),
    }
  }

  return newProps
};
export default transformer;
