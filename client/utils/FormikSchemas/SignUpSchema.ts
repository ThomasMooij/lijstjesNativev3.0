import * as yup from 'yup'


export const SignUpSchema = yup.object({
    firstname: yup
        .string()
        .trim('Name is missing')
        .min(1,'Please provide a valid name')
        .required('You have to provide your name'),
    lastname: yup
        .string()
        .trim('Name is missing')
        .min(1,'Please provide a valid name')
        .required('You have to provide your lastname'),
    email: yup
        .string()
        .trim('Name is missing')
        .email('Please provide a valid email')
        .required('You have to provide your email'),
    password: yup
        .string()
        .trim('Name is missing')
        .min(8,'Password is too short')
        .matches(
          /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])[a-zA-Z\d!@#\$%\^&\*]+$/,
          'Password is too simple!',
        )
        .required('You will have to provide a password')
  })

  