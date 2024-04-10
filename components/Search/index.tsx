import { theme } from "@/styles/theme"
import { Input } from "@rebass/forms"
import { Flex } from "rebass/styled-components"

interface SearchProps {
  onChange: (value: string) => void
}

export const Search = ({ onChange }: SearchProps) => {
  return (
    <Flex
      px={3}
      py={2}
      bg="white"
      sx={{ border: theme.border, borderRadius: theme.radii.medium }}
      width={1}
    >
      <Input
        sx={{
          border: "none",
          ":focus": {
            outline: "none",
          },
        }}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        placeholder="Search for a city"
      />
    </Flex>
  )
}
