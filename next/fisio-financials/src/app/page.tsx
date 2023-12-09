"use client"

import { ChakraProvider } from '@chakra-ui/react'
import { theme } from './theme/chakra/theme'
import { AuthProvider } from './contexts'

export default function Home() {
  return (
    <ChakraProvider theme={theme}>
      <main>
      </main>
    </ChakraProvider>
  )
}
