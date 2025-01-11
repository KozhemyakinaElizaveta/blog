import { useToast } from '@chakra-ui/react'
import { useFormik, FormikProps } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { registerUser } from 'entities/user/api'
import { PageRoutes } from 'pages/PageRoutes'

export interface RegistrationFormValues {
  username: string
  password: string
  confirmPassword: string
}

export const useRegistrationForm = (): FormikProps<RegistrationFormValues> => {
  const toast = useToast()
  const navigate = useNavigate()

  const validationSchema = Yup.object({
    username: Yup.string().required('Введите username'),
    password: Yup.string().required('Введите пароль'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Пароли должны совпадать')
      .required('Повторите пароль'),
  })

  const formik = useFormik<RegistrationFormValues>({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: (values) => {
      const userData = {
        username: values.username,
        password: values.password,
      }
      registerUser(userData)
        .then(() => {
          navigate(PageRoutes.Login)
          toast({
            title: 'Успех',
            description: 'Регистрация прошла успешно!',
            status: 'success',
            duration: 9000,
            isClosable: true,
            variant: 'top-accent',
          })
        })
        .catch(() => {
          toast({
            position: 'bottom-right',
            title: 'Ошибка',
            description: 'Неверный логин или пароль',
            status: 'error',
            duration: 9000,
            isClosable: true,
            variant: 'top-accent',
          })
        })
    },
  })

  return formik
}
