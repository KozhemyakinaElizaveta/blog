import { Box, Button, Flex, Grid } from '@chakra-ui/react'
import { createPost, getPostsByUserId } from 'entities/post/api'
import { useEffect, useState } from 'react'
import { Loader } from 'shared/ui/loading'
import { Input, Text } from 'shared/ui'
import { Card } from 'shared/ui/card'

export interface Post {
  id: number
  message: string
  date: string
  authorId: number
}

export const Board = () => {
  const [valueInput, setValueInput] = useState('')
  const [posts, setPosts] = useState<Post[]>([])
  const userIdString = localStorage.getItem('id')
  const token = localStorage.getItem('refresh')
  const authorId = userIdString ? parseInt(userIdString, 10) : null
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchPosts = async () => {
    if (authorId === null || token === null) return
    try {
      const response = await getPostsByUserId(authorId, token)
      setPosts(response.data)
    } catch (error) {
      console.error('Failed to fetch posts:', error)
    }
  }

  const handleCreatePost = async () => {
    if (!valueInput || !authorId) {
      console.error('Message and author ID are required.')
      return
    }

    setLoading(true)
    if (token === null) return
    try {
      const date = new Date().toISOString()
      await createPost(valueInput, date, authorId, token)
      setValueInput('')
      fetchPosts()
    } catch (error) {
      console.error('Failed to create post:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Flex
      w={'100%'}
      h={'100%'}
      px={'25px'}
      position="relative"
      flexDir={'column'}
    >
      <Flex gap={'10px'} pb={'20px'}>
        <Input
          borderRadius={'10px'}
          w={'500px'}
          value={valueInput}
          onChange={(e) => setValueInput(e.target.value)}
          placeholder={'Напишите что-нибудь...'}
        />
        <Button onClick={handleCreatePost}>Добавить</Button>
      </Flex>
      {posts && !loading && (
        <Flex w={'100%'} h={'100%'} justifyContent={'flex-start'}>
          <Grid
            templateColumns={['repeat(auto-fill, minmax(324px, 1fr))']}
            gridRowGap={'20px'}
            gridColumnGap={'20px'}
          >
            {posts?.map((el) => {
              return (
                <Box key={el?.id} w={'minmax(324px, 1fr)'}>
                  <Card
                    title={el.message}
                    date={new Date(el.date).toLocaleString()}
                    id={el.id}
                  />
                </Box>
              )
            })}
          </Grid>
        </Flex>
      )}
      {loading && <Loader />}
      {posts.length === 0 && (
        <Flex w={'100%'} h={'100%'} align={'center'} justify={'center'}>
          <Text fontSize={'24px'} fontWeight={600}>
            Здесь пока что пусто
          </Text>
        </Flex>
      )}
    </Flex>
  )
}
