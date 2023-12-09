import { extendTheme } from "@chakra-ui/react"

const colors = {
  pink: {
    500: '#F288CD',
    600: '#A6638F'
  },
  gray: {
    500: '#888B8C'
  },
  white: {
    500: '#F2F2F2'
  },
  black: {
    500: '#262626'
  }
}

export const theme = extendTheme({ colors })
