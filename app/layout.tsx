import type { Metadata } from 'next';
import ClientWrapper from './ClientWrapper';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://devopsdays.pe'),
  title: {
    default: 'DevOpsDay Perú 2025 | La Principal Conferencia DevOps en Latinoamérica',
    template: '%s | DevOpsDays Perú 2024'
  },
  description: 'Únete a la principal conferencia DevOps en Lima, Perú. Experimenta 2 días de charlas de expertos, talleres y networking con profesionales líderes en DevOps. Aprende sobre Cloud Native, SRE, DevSecOps y más. 15-16 de Junio, 2024.',
  keywords: [
    'Conferencia DevOps', 'DevOpsDays Perú',  'DevOpsDays Lima', 'Cloud Native', 'SRE', 'DevSecOps',
    'Infraestructura como Código', 'CI/CD', 'Kubernetes', 'Computación en la Nube',
    'Conferencia Tecnológica Lima', 'DevOps Latinoamérica'
  ],
  authors: [{ name: 'Equipo DevOpsDays Perú' }],
  creator: 'DevOpsDay Lima',
  publisher: 'DevOpsDay Lima',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}