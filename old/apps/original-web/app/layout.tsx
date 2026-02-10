import type { Metadata } from 'next';
import ClientWrapper from './ClientWrapper';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://devopsdays.pe'),
  title: {
    default: 'DevOpsDays Perú 2025 | La Principal Conferencia DevOps en Latinoamérica',
    template: '%s | DevOpsDays Perú 2024',
  },
  description: 'El evento internacional de DevOps que está transformando la industria llega a Perú.',
  keywords: [
    'Conferencia DevOps',
    'DevOpsDays Perú',
    'DevOpsDays Lima',
    'Cloud Native',
    'SRE',
    'DevSecOps',
    'Infraestructura como Código',
    'CI/CD',
    'Kubernetes',
    'Computación en la Nube',
    'Conferencia Tecnológica Lima',
    'DevOps Latinoamérica',
  ],
  authors: [{ name: 'Equipo DevOpsDays Perú' }],
  creator: 'DevOpsDays Lima',
  publisher: 'DevOpsDays Lima',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@300&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="favicon/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="favicon/apple-touch-icon.png" />
        {/* <link rel="manifest" href="manifest.json" /> */}
        <link rel="preload" href="img/devopsbird.svg" as="image" type="image/svg+xml" />
      </head>
      <body>
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
