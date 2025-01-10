import { ChakraProvider } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { theme } from '../../shared/config/theme'

interface ChakraProviderProps {
  children: ReactNode
}

export const CustomChakraProvider = ({ children }: ChakraProviderProps) => (
  <ChakraProvider theme={theme}>{children}</ChakraProvider>
)