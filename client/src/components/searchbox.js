import styles from './searchbox.module.scss'
import { useState, useEffect } from 'react'
import { useRouter } from "next/router"
import cx from 'classnames'
import { Oval } from "react-loader-spinner";


export default function Searchbox() {
  const router = useRouter()
  const [ location, setLocation ] = useState('')
  const [ error, setError ] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    router.isReady && setIsLoading(false)
  }, [])

  const handletextChange = (e) => {
    setError('')
    setLocation(e.target.value)
  }

  const handleGetWeatherClick = () => {
    if (location) {
        router.push(`/weather/${location}`)
    }
    else {
        setError('Please enter the city name')
    }
  }

  const handleKeypress = (e) => {
    if (location) {
        if (e.keyCode === 13 || e.which === 13 && router.pathname == '/') {
            handleGetWeatherClick();
        }
    }
    else {
        setError('Please enter the city name')
    }
  };

  return (
    <div className={cx(styles.searchbox, router.pathname == '/' ? styles.homepage : '')}>
        <div className={styles.inputContainer}>
            <input onChange={handletextChange} value={location} className={styles.inputBox} onKeyPress={handleKeypress}/>
            <div className={styles.error}>{error}</div>
        </div>
        <button onClick={handleGetWeatherClick}  className={styles.submitButton} disabled={isLoading}>Get Weather</button>
    </div>
  )
}