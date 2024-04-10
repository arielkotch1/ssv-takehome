import { ArrowLeft } from "react-feather"
import { Box } from "rebass/styled-components"

interface BackButtonProps {
  onClick: () => void
}
export const BackButton = ({ onClick }: BackButtonProps) => {
  return (
    <Box onClick={onClick} sx={{ cursor: "pointer" }}>
      <ArrowLeft />
    </Box>
  )
}
