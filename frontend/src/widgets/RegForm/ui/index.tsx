import { chakra, Flex, FormControl, FormErrorMessage } from '@chakra-ui/react'
import { Button, Input, PasswordInput, Text } from 'shared/ui'
import { LoginLogo } from 'shared/iconpack'
import { useRegistrationForm } from '../lib'

export const RegistrationForm = () => {
  const formik = useRegistrationForm()

  return (
    <chakra.form onSubmit={formik.handleSubmit}>
      <Flex
        bgColor={'white'}
        borderRadius={'20px'}
        w={'673px'}
        h={'500px'}
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
            isInvalid={!!formik.touched.username && !!formik.errors.username}
          >
            <Input
              id="username"
              name="username"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              w={'100%'}
              placeholder="Введите username"
            />
            <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
          </FormControl>

          <FormControl
            isRequired
            isInvalid={!!formik.touched.password && !!formik.errors.password}
          >
            <PasswordInput
              id="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
          </FormControl>

          <FormControl
            isRequired
            isInvalid={
              !!formik.touched.confirmPassword &&
              !!formik.errors.confirmPassword
            }
          >
            <PasswordInput
              id="confirmPassword"
              name="confirmPassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              placeholder="Повторите пароль"
            />
            <FormErrorMessage>{formik.errors.confirmPassword}</FormErrorMessage>
          </FormControl>

          <Button disabled={!formik.isValid} type="submit">
            Зарегистрироваться
          </Button>
        </Flex>
      </Flex>
    </chakra.form>
  )
}
