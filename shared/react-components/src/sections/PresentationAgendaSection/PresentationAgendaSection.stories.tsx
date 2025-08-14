import AgendaSectionAsync, { Talk } from "./index";

const mockAgenda: Record<string, Talk[]> = {
  "Sala 1": [
    {
      title: "Registro",
      date: "2025-08-12T08:00:00-05:00",
      iconName: "WavingHand",
    },
    {
      title: "Bienvenida",
      date: "2025-08-12T08:30:00-05:00",
      iconName: "Diversity",
    },
    {
      title: "¿El Testing te frena? Rompe el ciclo y acelera tu negocio, con Testing Continuo.",
      speakers: [
        { name: "Oscar Motta", image: "https://placehold.co/64x64/222/FFF?text=O" }
      ],
      date: "2025-08-12T09:55:00-05:00"
    },
    {
      title: "From none to done: how to design and led an AppSec Program in a mid of a Digital Transformation",
      speakers: [
        { name: "Max Alejandro", image: "https://placehold.co/64x64/222/FFF?text=M" }
      ],
      date: "2025-08-12T10:30:00-05:00"
    },
    {
      title: "DevOps en búsqueda del verdadero valor al cliente",
      speakers: [
        { name: "David Anyar", image: "https://placehold.co/64x64/222/FFF?text=D" }
      ],
      date: "2025-08-12T11:20:00-05:00"
    },
    {
      title: "Es más fácil destruir algo que arreglarlo dijo un Dios",
      speakers: [
        { name: "Javier Blanco", image: "https://placehold.co/64x64/222/FFF?text=J" }
      ],
      date: "2025-08-12T11:55:00-05:00"
    },
    {
      title: "De Días a minutos: El Onboarding Automatizado en Plataforma de Ingeniería",
      speakers: [
        { name: "Verónica Rodríguez", image: "https://placehold.co/64x64/222/FFF?text=V" },
        { name: "Tadeo Mena", image: "https://placehold.co/64x64/222/FFF?text=T" }
      ],
      date: "2025-08-12T12:30:00-05:00"
    }
  ],
  "Sala 2": [
    {
      title: "Registro Sala 2",
      speakers: [
        { name: "Staff", image: "https://placehold.co/64x64/8e44ad/FFF?text=R2" }
      ],
      date: "2025-08-12T08:00:00-05:00"
    }
  ]
};


export default {
  title: "Sections/AgendaSectionAsync",
  component: AgendaSectionAsync,
};

export const Default = () => (
  <AgendaSectionAsync talksByRoom={mockAgenda} />
);
