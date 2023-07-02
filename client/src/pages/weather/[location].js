import { useEffect, useState } from 'react'
import styles from './index.module.scss'
import Image from 'next/image'
import Searchbox from '@/components/searchbox'
import '../../app/globals.css'
import dotenv from 'dotenv';

export default function weather({data, location}) {
  const [ weatherInfo, setWeatherInfo] = useState({})
  const [ locationInfo, setLocationInfo] = useState('')
  const [ temperature, setTemperature] = useState('')
  const [ humidity, setHumidity] = useState('')
  const [ windSpeed, setWindSpeed] = useState('')
  const [ error, setError] = useState('')

  useEffect(() => {
    if (data?.cod == 200){
      setError('')
      if ((data?.weather)) {
        setWeatherInfo(data?.weather[0])
      }
      setLocationInfo(data?.name)
      setTemperature(data?.main?.temp)
      setHumidity(data?.main?.humidity)
      setWindSpeed(data?.wind?.speed)
    }
    else {
      setError(data?.message ? `${location} : ${data?.message} ` : "Server error encountered. Please retry")
    }
  }, [data])

  return (
    <main className={styles.main}>
      <Searchbox/>
      {!error ?
        <div className={styles.weatherInfo}>
          <div className={styles.heading}>
            Weather Info of <span>{locationInfo || location}</span>:
          </div>
          {weatherInfo ?
            <div className={styles.briefInfo}>
              <Image
                  src={`https://openweathermap.org/img/wn/${weatherInfo.icon}@2x.png`}
                  alt={`${weatherInfo.main} Icon`}
                  className={styles.weatherLogo}
                  width={100}
                  height={100}
                  priority
                />
              <div className={styles.value}>{weatherInfo.main}</div>
              <div className={styles.description}>[{weatherInfo.description}]</div>
            </div>
            :
            null
          }
          <div className={styles.otherInfo}>
            <div>Temperature : {temperature}° C</div>
            <div>Humidity : {humidity} %</div>
            <div>Wind Speed : {windSpeed} m/s</div>
          </div>
        </div>
      : 
      <div className={styles.respError}>{error}</div>
      }
    </main>
      
  )
}

export async function getServerSideProps({ query: { location } }) {
  try {
    // Fetch data from external API
    const res = await fetch(`http://0.0.0.0:${process.env.BE_PORT}/weather/${location}`);
    if (!res.ok) {
      throw new Error("Failed to fetch data from the server.");
    }
    const data = await res.json();

    // Pass data to the page via props
    return { props: { data, location } };
  } catch (error) {
    // Handle errors gracefully
    console.error("Error fetching data:", error.message);
    return { props: { data: null, location } };
  }
}

