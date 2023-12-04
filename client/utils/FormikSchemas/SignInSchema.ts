import * as yup from 'yup'

export const SignInSchema = yup.object({
    email: yup
        .string()
        .trim('Name is missing')
        .email('Please provide a valid email')
        .required('You have to provide your email'),
    password: yup
        .string()
        .trim('Name is missing')
        .min(8,'Password is too short')
        .required('You will have to provide a password')
  })
  