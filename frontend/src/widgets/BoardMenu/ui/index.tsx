import { Box, Flex, useTheme, useToast } from '@chakra-ui/react'
import { logout } from 'entities/user/api'
import { PageRoutes } from 'pages/PageRoutes'
import { useMatch, useNavigate } from 'react-router-dom'
import { Logout, Tasks } from 'shared/iconpack'
import { ButtonsNavigations } from 'shared/ui'

function BoardMenu() {
  const navigate = useNavigate()
  const isLogin = useMatch(PageRoutes.Login)
  const isHome = useMatch(PageRoutes.Home)
  const theme = useTheme()
  const toast = useToast()
  const blue300 = theme.colors.blue['300']

  const userIdString = localStorage.getItem('id');
  const userId = userIdString ? parseInt(userIdString, 10) : null;

  if (isLogin) return null;

  const handleLogout = async () => {
    if (userId !== null) {
      try {
        await logout(userId);
        localStorage.removeItem('refresh');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('id');
        navigate(PageRoutes.Login);
      } catch {
        toast({
          position: 'bottom-right',
          title: 'Ошибка',
          description: 'Не удалось выполнить выход',
          status: 'error',
          duration: 9000,
          isClosable: true,
          variant: 'top-accent',
        });
      }
    } else {
      toast({
        position: 'bottom-right',
        title: 'Ошибка',
        description: 'Пользователь не авторизован',
        status: 'error',
        duration: 9000,
        isClosable: true,
        variant: 'top-accent',
      });
    }
  };

  return (
    <Flex
      flexDirection={'column'}
      justifyContent={'space-between'}
      align={'center'}
      h={'100%'}
      w={'100%'}
      pb={'30px'}
    >
      <Flex h={'100%'} flexDirection={'column'} align={'center'} gap="10px">
        <Box pt={isHome ? '47px' : 0} pb={isHome ? '50px' : 0}>
          <ButtonsNavigations
            title="Posts"
            Icon={<Tasks />}
            check={!!isHome}
            onClick={() => navigate(PageRoutes.Home)}
          />
        </Box>
      </Flex>
      <Flex flexDirection={'column'} gap={'10px'} align={'center'}>
        <ButtonsNavigations
          title="Выйти"
          Icon={<Logout color={blue300} />}
          check={false}
          onClick={handleLogout}
        />
      </Flex>
    </Flex>
  )
}

export { BoardMenu }