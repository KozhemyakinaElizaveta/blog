import { Flex } from '@chakra-ui/react'
import { Text } from '..'
import { useNavigate } from 'react-router-dom'
import { deletePost } from 'entities/post/api'

interface CardProps {
  title: string
  date: string
  id: number
}

export const Card = ({ title, date, id }: CardProps) => {
  const navigate = useNavigate()
  const token = localStorage.getItem('refresh')

  const handleDeleteClick = () => {
    if (token === null) return
    deletePost(id, token)
    navigate(0)
  }

  return (
    <Flex
      flexDirection={'column'}
      bgColor={'gray.100'}
      w={'100%'}
      h={'100%'}
      borderRadius={'20px'}
      p={'20px'}
      gap={'10px'}
      justifyContent={'space-between'}
    >
      <Text fontWeight={500} lineHeight={'20px'} fontSize={'17px'}>
        {title}
      </Text>
      <Flex alignItems={'center'} justifyContent={'space-between'}>
        <Text fontSize={'12px'} fontWeight={400}>
          {date}
        </Text>
        <Text
          fontSize={'12px'}
          cursor={'pointer'}
          color={'red.400'}
          _hover={{ color: 'red.500' }}
          onClick={handleDeleteClick}
        >
          Удалить
        </Text>
      </Flex>
    </Flex>
  )
}
