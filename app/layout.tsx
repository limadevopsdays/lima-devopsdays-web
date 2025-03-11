import type { Metadata } from 'next';
import ClientWrapper from './ClientWrapper';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://devopsday.pe'),
  title: {
    default: 'DevOpsDay Perú 2024 | La Principal Conferencia DevOps en Latinoamérica',
    template: '%s | DevOpsDay Perú 2024',
  },
  description:
    'Únete a la principal conferencia DevOps en Lima, Perú. Experimenta 2 días de charlas de expertos, talleres y networking con profesionales líderes en DevOps. Aprende sobre Cloud Native, SRE, DevSecOps y más. 15-16 de Junio, 2024.',
  keywords: [
    'Conferencia DevOps',
    'DevOpsDay Perú',
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
  authors: [{ name: 'Equipo DevOpsDay Perú' }],
  creator: 'DevOpsDay Perú',
  publisher: 'DevOpsDay Perú',
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
        <link rel="icon" href="favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="apple-touch-icon.png" />
        <link rel="manifest" href="manifest.json" />
        <link rel="preload" href="devopsbird.svg" as="image" type="image/svg+xml" />
      </head>
      <body>
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
