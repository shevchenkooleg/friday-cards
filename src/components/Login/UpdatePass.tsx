import React, {useState} from 'react';
import {useFormik} from "formik";
import {useAppDispatch, useAppSelector} from "../../bll/store";
import {UserDataType} from "../../bll/profileReducer";
import {UpdatePasswordValidationSchema} from "../../utils/validators/validators";
import {InputAdornment, TextField} from "@mui/material";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import s from "./SignUp.module.css";
import {Button} from "@mui/material";
import {useParams} from "react-router-dom";
import {updatePasswordTC} from "../../bll/authReducer";



export const UpdatePass = () => {
    const profileData = useAppSelector<UserDataType>(state => state.profileReducer.userData)
    const [visibility, setVisibility] = useState<boolean>(false)
    const params = useParams()
    const dispatch = useAppDispatch();
    const formik = useFormik({
        initialValues: {
            email: profileData.email,
            password: '',
            confirmPassword: '',
        },
        validationSchema: UpdatePasswordValidationSchema,
        onSubmit: (values, actions) => {
            const password = values.password
            if (params.token !== undefined) {
                dispatch(updatePasswordTC(password, params.token))
            }
            actions.resetForm({values: {email: '', password: '', confirmPassword: ''}})
        },
        onReset: (values) => {
            values.password = ''
            values.confirmPassword = ''
        }
    })

    const changeVisibility = () => {
        setVisibility(!visibility)
    }

    return (
        <>
            <div className={s.container}>
                <h2>Update password</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className={s.form}>
                        <TextField
                            {...formik.getFieldProps('password')}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        {visibility
                                            ? <VisibilityIcon onClick={changeVisibility}/>
                                            : <VisibilityOffIcon onClick={changeVisibility}/>}
                                    </InputAdornment>
                                ),
                            }}
                            className={s.passwordField}
                            sx={{width: '204px', paddingBottom: '12px'}}
                            size='small'
                            type={visibility ? 'text' : 'password'}
                            label="Password"
                            error={!!formik.errors.password && formik.touched.password}
                            helperText={formik.touched.password ? formik.errors.password : null}
                        />
                        <TextField
                            {...formik.getFieldProps('confirmPassword')}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        {visibility
                                            ? <VisibilityIcon onClick={changeVisibility}/>
                                            : <VisibilityOffIcon onClick={changeVisibility}/>}
                                    </InputAdornment>
                                ),
                            }}
                            className={s.passwordField}
                            sx={{width: '204px'}}
                            size='small'
                            type={visibility ? 'text' : 'password'}
                            label="confirmPassword"
                            error={!!formik.errors.confirmPassword && formik.touched.confirmPassword}
                            helperText={formik.touched.confirmPassword ? formik.errors.confirmPassword : null}
                        />
                    </div>
                    <div className={s.buttons}>
                        <Button variant='contained' type="reset" onClick={formik.handleReset}
                                sx={{marginRight: '30px'}}>cancel</Button>
                        <Button variant='contained' type='submit'>apply</Button>
                    </div>
                </form>
            </div>
        </>
    );
};