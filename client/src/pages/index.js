import styles from './index.module.scss'
import Searchbox from '@/components/searchbox'
import '../app/globals.css'


export default function Home() {

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        Weather App
      </div>
      <Searchbox/>
    </main>
  )
}


