import { Box, Flex, Image, Text } from "rebass/styled-components"

interface TemperatureCardProps {
  icon: string
  city: string
  temp: number
  degree: string
  feelsLike: number
  speed: string
  uv: number
  windSpeed: number
  precip: number
  amount: string
}

export const TemperatureCard = ({
  icon,
  city,
  temp,
  feelsLike,
  degree,
  speed,
  uv,
  precip,
  amount,
  windSpeed,
}: TemperatureCardProps) => {
  return (
    <Box width={"100%"} height={"100%"} p={3} variant={"card"}>
      <Image src={icon} />
      <Flex justifyContent={"space-between"}>
        <Flex px={3} sx={{ gap: 2 }} flexDirection={"column"}>
          <Text fontWeight={600} fontSize={4}>
            {city}
          </Text>
          <Flex sx={{ gap: 2 }} alignItems={"flex-end"}>
            <Text fontSize={72} fontWeight={600}>
              {temp || 0}
            </Text>
            <Text mb={2} fontWeight={600} opacity={0.7} fontSize={42}>
              {degree}
            </Text>
          </Flex>
          <Flex sx={{ gap: 2 }} flexDirection={"row"}>
            <Text fontSize={2} fontWeight={600}>
              Feels like
            </Text>
            <Text fontWeight={600} opacity={0.7} fontSize={2}>
              {feelsLike}
              {degree}
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex px={3} pt={3} flexDirection={"column"} sx={{ gap: 2 }}>
        <Flex sx={{ gap: 2 }} alignItems={"center"} justifyContent={"space-between"}>
          <Text fontSize={2} fontWeight={600}>
            Wind
          </Text>
          <Text mb={2} fontWeight={600} opacity={0.7} fontSize={2}>
            {windSpeed} {speed}
          </Text>
        </Flex>
        <Flex sx={{ gap: 2 }} alignItems={"center"} justifyContent={"space-between"}>
          <Text fontSize={2} fontWeight={600}>
            Precipitation
          </Text>
          <Text mb={2} fontWeight={600} opacity={0.7} fontSize={2}>
            {precip} {amount}
          </Text>
        </Flex>
        <Flex sx={{ gap: 2 }} alignItems={"center"} justifyContent={"space-between"}>
          <Text fontSize={2} fontWeight={600}>
            UV
          </Text>
          <Text mb={2} fontWeight={600} opacity={0.7} fontSize={2}>
            {uv}
          </Text>
        </Flex>
      </Flex>
    </Box>
  )
}
