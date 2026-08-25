import { createBrowserRouter, Navigate } from 'react-router'
import { RootLayout, StandaloneLayout } from './layouts/RootLayout'
import HomePage from './pages/HomePage'
import SponsorsPage from './pages/SponsorsPage'
import TicketsPage from './pages/TicketsPage'
import SorteoEntradasPage from './pages/SorteoEntradasPage'
import SpeakersPage from './pages/SpeakersPage'
import CodeOfConductPage from './pages/CodeOfConductPage'
import ShopPage from './pages/ShopPage'
import ScheduleAmPage from './pages/ScheduleAmPage'
import Schedule27PmPage from './pages/Schedule27PmPage'
import Schedule28AmPage from './pages/Schedule28AmPage'
import Schedule28PmPage from './pages/Schedule28PmPage'
import NotFoundPage from './pages/NotFoundPage'

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
        Component: SorteoEntradasPage
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
        path: 'shop',
        Component: ShopPage
      },
      {
        path: 'codigo-de-conducta',
        Component: LegacyCodeOfConductRedirect,
      },
      {
        path: '*', 
        Component: NotFoundPage 
      },
    ],
  },
  {
    path: '/',
    Component: StandaloneLayout,
    children: [
      {
        path: 'schedule-am',
        Component: ScheduleAmPage
      },
      {
        path: 'schedule-27-agosto',
        Component: ScheduleAmPage
      },
      {
        path: 'schedule-27-am',
        Component: ScheduleAmPage
      },
      {
        path: 'cronograma',
        Component: ScheduleAmPage
      },
      {
        path: 'schedule-27-pm',
        Component: Schedule27PmPage
      },
      {
        path: 'schedule-27-tarde',
        Component: Schedule27PmPage
      },
      {
        path: 'cronograma-27-tarde',
        Component: Schedule27PmPage
      },
      {
        path: 'schedule-28-am',
        Component: Schedule28AmPage
      },
      {
        path: 'schedule-28-manana',
        Component: Schedule28AmPage
      },
      {
        path: 'cronograma-28-manana',
        Component: Schedule28AmPage
      },
      {
        path: 'schedule-28-pm',
        Component: Schedule28PmPage
      },
      {
        path: 'schedule-28-tarde',
        Component: Schedule28PmPage
      },
      {
        path: 'cronograma-28-tarde',
        Component: Schedule28PmPage
      },
    ],
  },
])
