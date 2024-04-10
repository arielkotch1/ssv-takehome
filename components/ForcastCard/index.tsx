import { Box, Flex, Text, Image } from "rebass/styled-components"

export interface ForcastCardProps {
  icon: string
  avgTemp: number
  maxTemp: number
  minTemp: number
  uv: number
  degree: string
  condition: string
  day: string
}

export const ForcastCard = ({
  icon,
  avgTemp,
  condition,
  maxTemp,
  minTemp,
  uv,
  day,
  degree,
}: ForcastCardProps) => {
  return (
    <Box width={"100%"} p={3} variant={"card"}>
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        <Image src={icon} />
        <Flex alignItems={"flex-end"} sx={{ gap: 1 }} flexDirection={"column"}>
          <Text fontWeight={600}>{day}</Text>
          <Text> {condition}</Text>
        </Flex>
      </Flex>

      <Flex px={3} sx={{ gap: 2 }} flexDirection={"column"}>
        <Flex alignItems={"flex-end"}>
          <Text fontSize={6} fontWeight={600}>
            {avgTemp || 0}
          </Text>
          <Text mb={2} fontWeight={600} opacity={0.7} fontSize={2}>
            {degree}
          </Text>
        </Flex>
        <Flex sx={{ gap: 2 }} justifyContent={"space-between"} flexDirection={"row"}>
          <Text fontSize={1} fontWeight={600}>
            Max Temp
          </Text>
          <Text fontWeight={600} opacity={0.7} fontSize={2}>
            {maxTemp}
            {degree}
          </Text>
        </Flex>
        <Flex sx={{ gap: 2 }} justifyContent={"space-between"} flexDirection={"row"}>
          <Text fontSize={1} fontWeight={600}>
            Min Temp
          </Text>
          <Text fontWeight={600} opacity={0.7} fontSize={2}>
            {minTemp}
            {degree}
          </Text>
        </Flex>
        <Flex sx={{ gap: 2 }} justifyContent={"space-between"} flexDirection={"row"}>
          <Text fontSize={1} fontWeight={600}>
            UV Index
          </Text>
          <Text fontWeight={600} opacity={0.7} fontSize={2}>
            {uv}
          </Text>
        </Flex>
      </Flex>
    </Box>
  )
}
