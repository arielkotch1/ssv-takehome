import { theme } from "@/styles/theme"
import { Box, Text, Flex, Image } from "rebass/styled-components"

interface CardProps {
  header: string
  subHeader: string
  description: string
  image: string
  onClick?: () => void
}

export const Card = ({ header, subHeader, onClick, description, image }: CardProps) => {
  return (
    <Box
      onClick={onClick}
      sx={
        onClick
          ? {
              cursor: "pointer",
            }
          : {
              cursor: "default",
            }
      }
      width={"100%"}
      variant={"card"}
    >
      <Image
        alt={""}
        sx={{ borderRadius: `${theme.radii.medium} ${theme.radii.medium} 0px 0px` }}
        width={1}
        height={300}
        minHeight={300}
        src={image}
      />

      <Flex sx={{ gap: 1 }} p={3} flexDirection={"column"}>
        <Text fontSize={2} opacity={0.7}>
          {subHeader}
        </Text>
        <Text fontSize={3} fontWeight={500}>
          {header}
        </Text>
        <Text pt={1} lineHeight={1.4} fontSize={2}>
          {description}
        </Text>
      </Flex>
    </Box>
  )
}
