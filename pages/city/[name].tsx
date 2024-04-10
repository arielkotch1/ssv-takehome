import { BackButton } from "@/components/BackButton"
import { Card } from "@/components/Card"
import { ForcastCard } from "@/components/ForcastCard"
import { TemperatureCard } from "@/components/TemperatureCard"
import Cities from "@/data/cities.json"
import { System } from "@/enums"
import axios from "axios"
import { isEmpty } from "lodash"
import moment from "moment"
import { useParams } from "next/navigation"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Box, Flex } from "rebass/styled-components"
import { City } from ".."

const getWeather = async ({ system, lat, lng }: { system: System; lat: number; lng: number }) => {
  const { data } = await axios.get(`
  http://api.weatherapi.com/v1/forecast.json?key=70065ce635d54b1cb3b122616240904&q=${lat},${lng}&days=4&aqi=no&alerts=no`)
  const {
    current,
    forecast: { forecastday },
  } = data
  return {
    temp: system === System.METRIC ? current.temp_c : current.temp_f,
    degree: system === System.METRIC ? "°C" : "°F",
    feelsLike: system === System.METRIC ? current.feelslike_c : current.feelslike_f,
    icon: current.condition.icon,
    windSpeed: system === System.METRIC ? current.wind_kph : current.wind_mph,
    speed: system === System.METRIC ? "kph" : "mph",
    uv: current.uv,
    amount: system === System.METRIC ? "mm" : "in",
    precip: system === System.METRIC ? current.precip_mm : current.precip_in,
    condition: current.condition.text,
    forcast: forecastday.map(({ day, date }: any) => ({
      icon: day.condition.icon,
      condition: day.condition.text,
      day: moment(date, "YYYY-MM-DD").format("dddd"),
      maxTemp: system === System.METRIC ? day.maxtemp_c : day.maxtemp_f,
      minTemp: system === System.METRIC ? day.mintemp_c : day.mintemp_f,
      avgTemp: system === System.METRIC ? day.avgtemp_c : day.avgtemp_f,
      uv: day.uv,
    })),
  }
}

const City = () => {
  const router = useRouter()
  const params = useParams()
  const [weather, setWeather] = useState({} as any)
  const system = router.query.unit
  const [city, setCity] = useState({} as City)

  useEffect(() => {
    const found = Cities.cities.find(({ name }) => name === router.query.name)
    if (found) {
      setCity(found as any)
    }
  }, [params])

  useEffect(() => {
    if (!isEmpty(city)) {
      ;(async () => {
        setWeather(
          await getWeather({ system, lat: city.coords.lat, lng: city.coords.lng } as {
            system: System
            lat: number
            lng: number
          })
        )
      })()
    }
  }, [city])

  return (
    <Box>
      <BackButton
        onClick={() => {
          router.back()
        }}
      />

      <Flex sx={{ gap: 3 }} width={"100%"}>
        <Box width={12 / 16}>
          <TemperatureCard
            speed={weather.speed}
            uv={weather.uv}
            windSpeed={weather.windSpeed}
            icon={weather.icon}
            city={weather.city}
            temp={weather.temp || 0}
            degree={weather.degree}
            feelsLike={weather.feelsLike || 0}
            precip={weather.precip}
            amount={weather.amount}
          />
        </Box>
        <Box width={4 / 16}>
          <Card
            header={city?.name}
            subHeader={city?.country}
            description={city?.description}
            image={city?.image}
          />
        </Box>
      </Flex>

      <Box
        mt={3}
        sx={{ display: "grid", columnGap: 3, rowGap: 3, gridTemplateColumns: "repeat(4,1fr)" }}
      >
        {weather.forcast?.map((forcast: any, index: number) => (
          <ForcastCard
            key={index}
            icon={forcast.icon}
            condition={forcast.condition}
            maxTemp={forcast.maxTemp}
            minTemp={forcast.minTemp}
            avgTemp={forcast.avgTemp}
            uv={forcast.uv}
            day={forcast.day}
            degree={weather.degree}
          />
        ))}
      </Box>
    </Box>
  )
}
export default City
