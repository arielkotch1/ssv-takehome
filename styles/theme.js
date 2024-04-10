// example theme.js

const border = "1px solid #EBEBEB"

export const theme = {
  colors: {
    background: "grey",
  },

  border,
  radii: {
    medium: "20px", // Another example of using borderRadius in theme
  },
  card: {
    bg: "white",
    borderRadius: "medium", // Using radii.medium value
    border,
  },

  forms: {
    select: {
      borderRadius: "medium", // Applying medium borderRadius to the Select component
    },
  },
}
