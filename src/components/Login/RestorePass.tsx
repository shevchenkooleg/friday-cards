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
    const status = useAppSelector<RequestStatusType>((state)=> state.appReducer.status)

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: RestorePasswordValidationSchema,
        onSubmit: (values, actions) => {
            // props.makeSignUp(values.email, values.password, values.confirmPassword, actions.setStatus)
            console.log(values)
            const data = {
                email: values.email,
                from: 'test-front-admin <ai73a@yandex.by>',
                message: `<div style="background-color: lime; padding: 15px"> password recovery link:
                <a href='http://localhost:3000/#/set-new-password/$token$'>link</a></div>`
            }
            dispatch(restorePassword(data))
            actions.resetForm({values: {email: ''}})
        }
    });

    return (
        <div>
            {status === 'loading' && <Loader/>}
            <div className={s.container}>
                <h2>Forgot your password?</h2>

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
                            helperText={formik.touched.email ? formik.errors.email : null}/>
                        <div className={s.buttons}>
                            <Button variant='contained' type="submit">
                                Send Instructions
                            </Button>
                        </div>
                        <span>Did you remember your password?</span>
                        <Link to={PATH.LOGIN.SIGN_IN} className={s.signLink}>Try to login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};