import React, { useEffect, useState } from "react"
import { Select } from "@rebass/forms"
import { theme } from "@/styles/theme"
import { Flex } from "rebass/styled-components"

interface Option {
  key: string
  value: string
}

interface DropdownProps {
  options: Option[]
  activeKey: string
  onChange: (value: string) => void
}

const Dropdown = ({ activeKey, onChange, options }: DropdownProps) => {
  const [key, setKey] = useState(activeKey || options[0].key)

  useEffect(() => {
    onChange(key)
  }, [key])

  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      px={3}
      sx={{ bg: "white", border: theme.border, borderRadius: theme.radii.medium }}
    >
      <Select
        value={options.find((option) => option.key === activeKey)?.value} // Set the value attribute based on the key state
        onChange={(e) => {
          const found = options.find((option) => option.value === e.target.value)
          if (found) {
            setKey(found.key)
          }
        }}
        sx={{
          ":focus": {
            outline: "none",
          },
          border: "none",
          width: 200,
        }}
      >
        {options.map((option) => (
          <option key={option.key} value={option.value}>
            {option.value}
          </option>
        ))}
      </Select>
    </Flex>
  )
}

export default Dropdown
