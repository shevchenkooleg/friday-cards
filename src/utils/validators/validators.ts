import * as Yup from 'yup';


export const RegisterValidationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Incorrect email')
        .required('Must be filled'),
    password: Yup.string()
        .min(8, 'More than 8 char')
        .required('Must be filled'),
    confirmPassword: Yup.string()
        .min(8, 'More than 8 char')
        .required('Must be filled')
        .oneOf([Yup.ref("password"), null], "Pass must match"),
});