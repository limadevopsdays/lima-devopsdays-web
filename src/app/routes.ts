import { createBrowserRouter } from 'react-router'
import { RootLayout } from './layouts/RootLayout'
import HomePage from './pages/HomePage'
import SponsorsPage from './pages/SponsorsPage'
import TicketsPage from './pages/TicketsPage'
import SpeakersPage from './pages/SpeakersPage'
import CodeOfConductPage from './pages/CodeOfConductPage'
import NotFoundPage from './pages/NotFoundPage'
import HomeSpacingMockupsPage from './pages/HomeSpacingMockupsPage'

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
        path: 'speakers', 
        Component: SpeakersPage 
      },
      { 
        path: 'codigo-de-conducta', 
        Component: CodeOfConductPage 
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
