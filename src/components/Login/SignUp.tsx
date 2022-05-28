import {useFormik} from 'formik';
import React from 'react';
import s from './SignUp.module.css'
import {Button, TextField} from "@mui/material";
import {useAppDispatch} from "../../bll/store";
import {registerUserTC} from "../../bll/authReducer";
import {RegisterValidationSchema} from '../../utils/validators/validators';

export const SignUp = () => {

    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: RegisterValidationSchema,
        onSubmit: (values, actions) => {
            // props.makeSignUp(values.email, values.password, values.confirmPassword, actions.setStatus)
            console.log(values)
            const email = values.email
            const password = values.password
            dispatch(registerUserTC({email, password}))
            actions.resetForm({values: {email: '', password: '', confirmPassword: ''}})
        }
    });

    return (
        <div className={s.container}>
            <h2>Sign up</h2>

            <form onSubmit={formik.handleSubmit}>
                <div className={s.form}>
                    <TextField
                        size='small'
                        type="string"
                        id="email"
                        label="Email"
                        sx={{margin: '10px'}}
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        onBlur={formik.handleBlur}
                        error={!!formik.errors.email && formik.touched.email}
                        helperText={formik.errors.email}/>
                    <TextField
                        size='small'
                        type="password"
                        // type={false ? 'text' : 'password'}
                        id="password"
                        label="Password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        onBlur={formik.handleBlur}
                        error={!!formik.errors.password && formik.touched.password}
                        helperText={formik.errors.password}

                    />
                    <TextField
                        size='small'
                        type="password"
                        id="confirmPassword"
                        label="Confirm password"
                        sx={{margin: '10px'}}
                        onChange={formik.handleChange}
                        value={formik.values.confirmPassword}
                        onBlur={formik.handleBlur}
                        error={!!formik.errors.confirmPassword && formik.touched.confirmPassword}
                        helperText={formik.errors.confirmPassword}/>
                    {/*{(formik.status) ? <div className={s.error}>{formik.status.error.length > 0 ? formik.status.error[0] : 'Some error' }</div> : null}*/}
                    <div className={s.buttons}>
                        <Button variant='contained' type="submit" sx={{marginRight: '30px'}}>
                            Register
                        </Button>
                        <Button variant='contained' type="reset" onClick={formik.handleReset}>
                            Cancel
                        </Button>
                    </div>

                </div>

            </form>
        </div>
    );
};
