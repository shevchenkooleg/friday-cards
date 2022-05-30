import {InputAdornment} from '@mui/material';
import Button from '@mui/material/Button/Button';
import TextField from '@mui/material/TextField/TextField';
import {useFormik} from 'formik';
import React, {ChangeEvent, useState} from 'react';
import {useSelector} from 'react-redux';
import {compose} from 'redux';
import {UserDataType} from '../../bll/profileReducer';
import {useAppSelector} from '../../bll/store';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import { ProfileValidationSchema } from '../../utils/validators/validators';
import {Return} from "../Error404/Return";
import s from './Profile.module.css'

const Profile = () => {

    const userData = useAppSelector<UserDataType>((state) => state.profileReducer.userData)

    const formik = useFormik({
        initialValues: {
            nickName: userData.nickname,
            email: userData.email,
        },
        validationSchema: ProfileValidationSchema,
        onSubmit: (values, actions) => {
            // props.makeSignUp(values.email, values.password, values.confirmPassword, actions.setStatus)
            console.log(values)
            // const email = values.email
            // const password = values.password
            // dispatch(registerUserTC({email, password}))
            actions.resetForm({values: {nickName: userData.nickname, email: userData.email}})
        }
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className={s.container}>
                <h2>Profile</h2>
                <div className={s.content}>
                    <img src={userData.avatar}/>
                </div>

                <TextField
                    label="NickName"
                    id="nickName"
                    value={formik.values.nickName}
                    onChange={formik.handleChange}
                    sx={{margin: '40px 10px 20px 10px'}}
                    onBlur={formik.handleBlur}
                    error={!!formik.errors.nickName && formik.touched.nickName}
                    helperText={formik.touched.nickName ? formik.errors.nickName : null}
                />
                <TextField
                    label="Email"
                    id="email"
                    value={formik.values.email}
                    sx={{margin: '0px 10px 0px 10px'}}
                />

                <div className={s.buttons}>
                    <Button variant='contained' type="reset" onClick={formik.handleReset} sx={{marginRight: '30px'}}>
                        Cancel
                    </Button>
                    <Button variant='contained' type="submit">
                        Save
                    </Button>

                </div>

            </div>
        </form>
    );
};
export default Profile
// export default compose<React.ComponentType>(withAuthRedirect)(Profile);