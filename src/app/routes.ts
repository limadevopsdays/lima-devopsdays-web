import { createBrowserRouter, Navigate } from 'react-router'
import { RootLayout } from './layouts/RootLayout'
import HomePage from './pages/HomePage'
import SponsorsPage from './pages/SponsorsPage'
import TicketsPage from './pages/TicketsPage'
import SpeakersPage from './pages/SpeakersPage'
import CodeOfConductPage from './pages/CodeOfConductPage'
import NotFoundPage from './pages/NotFoundPage'
import HomeSpacingMockupsPage from './pages/HomeSpacingMockupsPage'
import SorteoEntradasPage from './pages/SorteoEntradasPage'

function LegacyCodeOfConductRedirect() {
  return Navigate({ to: '/code-of-conduct', replace: true })
}

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      { 
        index: true, 
        Component: HomePage 
      },
      { 
        path: 'sponsors', 
        Component: SponsorsPage 
      },
      { 
        path: 'tickets', 
        Component: TicketsPage 
      },
      {
        path: 'sorteo-entradas',
        Component: SorteoEntradasPage,
      },
      { 
        path: 'speakers', 
        Component: SpeakersPage 
      },
      { 
        path: 'code-of-conduct',
        Component: CodeOfConductPage
      },
      {
        path: 'codigo-de-conducta',
        Component: LegacyCodeOfConductRedirect,
      },
      {
        path: 'mockups/home-spacing',
        Component: HomeSpacingMockupsPage,
      },
      { 
        path: '*', 
        Component: NotFoundPage 
      },
    ],
  },
])
