import { chakra, Flex, FormControl, FormErrorMessage } from '@chakra-ui/react'
import { Button, Input, PasswordInput, Text } from 'shared/ui'
import { useLoginForm } from '../lib'
import { LoginLogo } from 'shared/iconpack'
import { useNavigate } from 'react-router-dom'
import { PageRoutes } from 'pages/PageRoutes'

export const LoginForm = () => {
  const formik = useLoginForm()
  const navigate = useNavigate()
  return (
    <chakra.form onSubmit={formik.handleSubmit}>
      <Flex
        bgColor={'white'}
        borderRadius={'20px'}
        w={'673px'}
        h={'421px'}
        flexDirection={'column'}
        alignItems={'center'}
        justify={'center'}
        gap={'16px'}
      >
        <Flex align={'center'} gap={'5px'}>
          <LoginLogo />
          <Text fontSize={'36px'} fontWeight={700}>
            Blog
          </Text>
        </Flex>
        <Flex
          flexDirection={'column'}
          w={'266px'}
          gap={'16px'}
          align={'center'}
        >
          <FormControl
            isRequired
            isInvalid={
              (!!formik.touched.login && !!formik.errors.login) ||
              !!formik.errors.isErrorLogin
            }
          >
            <Input
              id="login"
              name="login"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.login}
              w={'100%'}
              placeholder="Введите логин"
            />
            <FormErrorMessage>{formik.errors.login}</FormErrorMessage>
          </FormControl>
          <FormControl
            isRequired
            isInvalid={!!formik?.touched.password && !!formik?.errors.password}
          >
            <PasswordInput
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
          </FormControl>
        </Flex>
        <Button
          isDisabled={!(formik.values.login && formik.values.password)}
          type="submit"
        >
          Войти
        </Button>
        <Text fontWeight={600} fontSize={'14px'} color={'gray.500'}>
          Нет аккаунта?{' '}
          <chakra.span
            fontWeight={600}
            fontSize={'14px'}
            color={'black.100'}
            cursor={'pointer'}
            _hover={{ color: 'blue.300' }}
            onClick={() => navigate(PageRoutes.Registration)}
          >
            Регистрация
          </chakra.span>
        </Text>
      </Flex>
    </chakra.form>
  )
}
