import { useToast } from '@chakra-ui/react'
import { login } from 'entities/user/api'
import { useFormik, FormikProps } from 'formik'
import { PageRoutes } from 'pages/PageRoutes'
import { useNavigate } from 'react-router-dom'

export interface FormValues {
  login: string
  password: string
  isErrorLogin: string
}

export const useLoginForm = (): FormikProps<FormValues> => {
  const navigate = useNavigate()
  const toast = useToast()
  const validate = (values: FormValues) => {
    const errors: Partial<FormValues> = {}

    if (!values.login) {
      errors.login = 'Обязательное поле'
    } else if (values.login.length < 2) {
      errors.login = 'Логин должен быть больше 2 символов'
    }

    if (!values.password) {
      errors.password = 'Обязательное поле'
    } else if (values.password.length < 4) {
      errors.password = 'Пароль должен быть больше 4 символов'
    }

    return errors
  }

  const formik = useFormik<FormValues>({
    initialValues: {
      login: '',
      password: '',
      isErrorLogin: '',
    },
    validate,
    onSubmit: (values) => {
      submitLogin(values)
    },
  })

  const submitLogin = (values: FormValues) => {
    login(values.login, values.password)
      .then(({ data }) => {
        localStorage.setItem('refresh', data.refreshToken)
        localStorage.setItem('id', data.userId)
        if (data) {
          navigate(PageRoutes.Home)
        }
      })
      .catch(() => {
        formik.setErrors({
          password: 'Неверный логин или пароль',
          isErrorLogin: 'true',
        })
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
  }

  return formik
}