import { Input } from '@mui/material';
import Button from '@mui/material/Button/Button';
import TextField from '@mui/material/TextField/TextField';
import { useFormik } from 'formik';
import React from 'react';
import { Navigate } from 'react-router-dom';
import {initializeAppTC} from '../../bll/appReducers';
import {authMeTC, logInTC, logOutTC } from '../../bll/authReducer';
import { useAppDispatch, useAppSelector } from '../../bll/store';


export const SignIn = () => {

    const dispatch = useAppDispatch()
    const isAuth = useAppSelector<boolean>((state) => state.authReducer.isAuth)


    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validationSchema: null,
        onSubmit: (values, actions) => {
            console.log(values)
            dispatch(logInTC(values))
            actions.resetForm({values: {email: '', password: '', rememberMe: false}})
        }
    })

    if (isAuth) {
        return <Navigate to={'/profile'}></Navigate>
    }

    
    return (
        <form onSubmit={formik.handleSubmit}>
            <h2>Login</h2>

            <TextField
                label="Email"
                id="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                sx={{margin: '40px 10px 20px 10px'}}
                onBlur={formik.handleBlur}
            />
            <TextField
                label="Password"
                id="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                sx={{margin: '40px 10px 20px 10px'}}
                onBlur={formik.handleBlur}
            />
            <input type="checkbox"
                   id="rememberMe"
                   name="rememberMe"
                   onChange={formik.handleChange}
                   checked={formik.values.rememberMe}/>
            <div>
                <Button variant='contained' type="reset" onClick={formik.handleReset} sx={{marginRight: '30px'}}>
                    Cancel
                </Button>
                <Button variant='contained' type="submit">
                    Login
                </Button>

            </div>
            <Button variant='contained' type="button" sx={{margin: '30px 10px 10px 0px'}} onClick={()=>{
                dispatch(authMeTC())
            }}>Me</Button>
            <Button variant='contained' type="button" sx={{margin: '30px 10px 10px 20px'}} onClick={()=>{
                dispatch(logOutTC())
            }}>LogOut</Button>

        </form>
    );
};