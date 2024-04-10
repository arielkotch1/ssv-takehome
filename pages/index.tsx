import { Card } from "@/components/Card"
import Dropdown from "@/components/Dropdown"
import { Placeholder } from "@/components/Placeholder"
import { Search } from "@/components/Search"
import Cities from "@/data/cities.json"
import { Sort, System } from "@/enums"
import { isEmpty, orderBy } from "lodash"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Box, Flex } from "rebass/styled-components"

export interface Coordinates {
  lat: number
  lng: number
}

export interface City {
  name: string
  continent: string
  active: boolean
  country: string
  description: string
  image: string
  coords: {
    lat: number
    lng: number
  }
}

function Home() {
  const router = useRouter()
  const [search, setSearch] = useState("")
  const [activeCities, setActiveCities] = useState(Cities.cities as Array<City>)
  const [filteredCities, setFilteredCities] = useState([] as Array<City>)

  useEffect(() => {
    if (isEmpty(router.query)) {
      router.push({ query: { unit: System.METRIC, sort: Sort.ALL } })
    } else {
      router.push({ query: { ...router.query } })
    }
    setActiveCities(Cities.cities.filter(({ active }) => active))
  }, [])

  useEffect(() => {
    setFilteredCities(
      activeCities.filter(
        ({ name, country }) =>
          name.toLowerCase().includes(search.toLowerCase()) ||
          country.toLowerCase().includes(search.toLowerCase())
      )
    )
  }, [search])

  useEffect(() => {
    const { sort } = router.query
    if (sort === Sort.ALL) {
      setFilteredCities(activeCities)
    }
    if (sort === Sort.NAME) {
      setFilteredCities(orderBy(activeCities, "name", ["asc", "desc"]))
    }
  }, [router])

  return (
    <Flex sx={{ gap: 2 }} flexDirection={"column"}>
      <Flex sx={{ gap: 2 }}>
        <Search
          onChange={(value) => {
            setSearch(value)
          }}
        />
        <Dropdown
          onChange={(key) => {
            let query = { ...router.query }
            query.sort = key
            router.push({ query })
          }}
          activeKey={router.query.sort?.toString() ?? ""}
          options={[
            {
              key: Sort.ALL,
              value: "Show All",
            },
            {
              key: Sort.NAME,
              value: "Name",
            },
            {
              key: Sort.LOCATION,
              value: "Location",
            },
          ]}
        />
        <Dropdown
          onChange={(key) => {
            let query = { ...router.query }
            query.unit = key
            router.push({ query })
          }}
          activeKey={router.query.unit?.toString() ?? ""}
          options={[
            {
              key: System.METRIC,
              value: "Metric",
            },
            {
              key: System.IMPERIAL,
              value: "Imperial",
            },
          ]}
        />
      </Flex>
      {filteredCities.length !== 0 && (
        <Box
          sx={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", columnGap: 2, rowGap: 2 }}
        >
          {filteredCities.map(({ name, country, description, image }, index) => (
            <Card
              onClick={() => {
                router.push({
                  pathname: `/city/${name}`,
                  query: { ...router.query },
                })
              }}
              key={index}
              header={name}
              subHeader={country}
              description={description}
              image={image}
            />
          ))}
        </Box>
      )}
      {filteredCities.length === 0 && <Placeholder />}
    </Flex>
  )
}

export default Home
