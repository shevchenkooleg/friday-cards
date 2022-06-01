import * as Yup from 'yup';


export const RegisterValidationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Incorrect email')
        .required('Must be filled'),
    password: Yup.string()
        .min(8, 'At least 8 char')
        .required('Must be filled'),
    confirmPassword: Yup.string()
        .min(8, 'At least 8 char')
        .required('Must be filled')
        .oneOf([Yup.ref("password"), null], "Pass must match"),
});

export const ProfileValidationSchema = Yup.object().shape({
    nickName: Yup.string()
        .required('Must be filled')
        .min(2, 'At least 2 char'),
});

export const LoginValidationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Incorrect email')
        .required('Must be filled'),
    password: Yup.string()
        .min(8, 'At least 8 char')
        .required('Must be filled'),
})

export const RestorePasswordValidationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Incorrect email')
        .required('Must be filled'),
})