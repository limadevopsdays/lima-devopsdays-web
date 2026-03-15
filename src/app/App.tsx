import { RouterProvider } from 'react-router'
import { router } from './routes'
import styles from './App.module.css'

export default function App() {
  return (
    <div className={styles.app}>
      <RouterProvider router={router} />
    </div>
  )
}