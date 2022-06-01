import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../bll/store";
import {useFormik} from "formik";
import {LoginValidationSchema} from "../../utils/validators/validators";
import {logInTC} from "../../bll/authReducer";
import s from "./SignUp.module.css";
import {Button, Checkbox, FormControlLabel, InputAdornment, TextField} from "@mui/material";
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import {Link, Navigate, NavLink, useNavigate} from "react-router-dom";
import {Loader} from "../common/Loader/Loader";
import {RequestStatusType} from "../../bll/appReducers";



export const SignIn = () => {
    const dispatch = useAppDispatch()
// Переключатель для показа пороля
    const [showHide, setShowHide] = useState<boolean>(false);
    const onClickShowPassword = () => {
        setShowHide(!showHide)
    }
// логика перехода на профайл в случае удачной Логинизации
    const isAuth = useAppSelector<boolean>(state => state.authReducer.isAuth)
    const status = useAppSelector<RequestStatusType>(state => state.appReducer.status)

    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validationSchema: LoginValidationSchema,
        onSubmit: (values, actions) => {
            const email = values.email
            const password = values.password
            const rememberMe = values.rememberMe
            dispatch(logInTC({email, password, rememberMe}))
            if (isAuth) {
                navigate('/')
            }
            actions.resetForm({values: {email: '', password: '', rememberMe: false}})
        }
    })
    if (isAuth) {
       return  <Navigate to={'/'}/>
    }
    return (
        <>
            {status === 'loading' && <Loader/>}
            <div className={s.container}>
                <h2>Sign in</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className={s.form}>
                        <TextField
                            {...formik.getFieldProps('email')}
                            size='small'
                            type="string"
                            label="Email"
                            sx={{margin: '10px', width: '204px'}}
                            error={!!formik.errors.email && formik.touched.email}
                            helperText={formik.touched.email ? formik.errors.email : null}/>
                        <TextField
                            {...formik.getFieldProps('password')}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        {!showHide
                                            ? <VisibilityIcon onClick={onClickShowPassword}/>
                                            : <VisibilityOffIcon onClick={onClickShowPassword}/>}
                                    </InputAdornment>
                                ),
                            }}
                            className={s.passwordField}
                            sx={{width: '204px'}}
                            size='small'
                            type={showHide ? 'text' : 'password'}
                            label="Password"
                            error={!!formik.errors.password && formik.touched.password}
                            helperText={formik.touched.password ? formik.errors.password : null}
                        />

                        <FormControlLabel
                            control={<Checkbox/>}
                            checked={formik.values.rememberMe}
                            name={"rememberMe"}
                            label={'remember'}
                            onChange={formik.handleChange}
                        />
                        <div className={s.forgot}><Link to={'/sign_in'} >Forgot Password?</Link></div>

                        <div className={s.buttons}>
                            <Button variant='contained' type="reset" onClick={formik.handleReset}
                                    sx={{marginRight: '30px'}}>
                                Cancel
                            </Button>
                            <Button variant='contained' type='submit'>
                                Sign in
                            </Button>
                        </div>
                        <span>Don't have account?</span>
                        <NavLink to={'/sign_up'} className={s.signLink}>Sign up</NavLink>
                    </div>
                </form>
            </div>
        </>
    );
};