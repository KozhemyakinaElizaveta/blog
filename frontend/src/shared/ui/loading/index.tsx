import { Center, Spinner } from '@chakra-ui/react'

export const Loader = () => {
  return (
    <Center w="100%" h="100%">
      <Spinner w="50px" h="50px" color="blue.300" />
    </Center>
  )
}
