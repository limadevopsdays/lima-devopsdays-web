import { RouterProvider } from 'react-router'
import { router } from './routes'
import { LocaleProvider } from './i18n'
import styles from './App.module.css'

export default function App() {
  return (
    <LocaleProvider>
      <div className={styles.app}>
        <RouterProvider router={router} />
      </div>
    </LocaleProvider>
  )
}