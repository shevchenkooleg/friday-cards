import React from 'react';
import s from "./SignUp.module.css";
import {Button, TextField} from "@mui/material";
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../bll/store";
import {useFormik} from "formik";
import {RestorePasswordValidationSchema} from "../../utils/validators/validators";
import {Loader} from "../common/Loader/Loader";
import {RequestStatusType} from "../../bll/appReducers";
import {PATH} from "../../App";
import {restorePassword} from "../../bll/authReducer";

export const RestorePass = () => {

    const dispatch = useAppDispatch()
    const status = useAppSelector<RequestStatusType>((state) => state.appReducer.status)
    const isAuth = useAppSelector<boolean>(state => state.authReducer.isAuth)
    const userMail = useAppSelector<string>(state => state.profileReducer.userData.email)

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: RestorePasswordValidationSchema,
        onSubmit: (values, actions) => {
            console.log(values)
            const data = {
                email: values.email,
                from: 'test-front-admin <ai73a@yandex.by>',
                message: `<div style="background-color: cornflowerblue; padding: 15px"> password recovery link:
                <a href='https://shevchenkooleg.github.io/friday-cards/#/update_pass/$token$'>link</a></div>`
            }
            dispatch(restorePassword(data))
            actions.resetForm({values: {email: ''}})
        }
    });

    return (
        <div>
            {status === 'loading' && <Loader/>}
            <div className={s.container}>
                <h2>{isAuth
                    ? `We send you instructions please
                              check your email`
                    : 'Forgot your password?'}</h2>

                <form onSubmit={formik.handleSubmit}>
                    <div className={s.form}>
                        <TextField
                            disabled={isAuth}
                            size='small'
                            type="string"
                            id="email"
                            label="Email"
                            sx={{margin: '10px'}}
                            onChange={formik.handleChange}
                            value={isAuth
                                ? userMail
                                : formik.values.email}
                            onBlur={formik.handleBlur}
                            error={!!formik.errors.email && formik.touched.email}
                            helperText={formik.touched.email ? formik.errors.email : null}/>
                        <div className={s.buttons}>
                            <Button variant='contained' type="submit">
                                Send Instructions
                            </Button>
                        </div>
                        {!isAuth &&
                            <>
                                < span> Did you remember your password?</span>
                                <Link to={PATH.LOGIN.SIGN_IN} className={s.signLink}>Try to login</Link>
                            </>
                        }

                    </div>
                </form>
            </div>
        </div>
    );
};