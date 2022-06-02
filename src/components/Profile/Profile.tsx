import Button from '@mui/material/Button/Button';
import TextField from '@mui/material/TextField/TextField';
import {useFormik} from 'formik';
import React from 'react';
import {Navigate} from 'react-router-dom';
import {changeUserData, UserDataType} from '../../bll/profileReducer';
import {useAppDispatch, useAppSelector} from '../../bll/store';
import {ProfileValidationSchema} from '../../utils/validators/validators';
import s from './Profile.module.css'
import {PATH} from "../../App";


const Profile = () => {

    const nickName = useAppSelector<string>((state) => state.profileReducer.userData.nickName)
    const email = useAppSelector<string>((state) => state.profileReducer.userData.email)
    const avatar = useAppSelector<string>((state) => state.profileReducer.userData.avatar)
    const dispatch = useAppDispatch()
    const isAuth = useAppSelector<boolean>(state => state.authReducer.isAuth)
    const formik = useFormik({
        initialValues: {
            nickName: nickName,
            email: email,
        },
        validationSchema: ProfileValidationSchema,
        onSubmit: (values, actions) => {
            const nickName = values.nickName
            const email = values.email
            const data = {
                name: values.nickName,
                avatar: avatar
            }
            dispatch(changeUserData(data))

            actions.resetForm({values: {nickName: nickName, email: email}})
        }
    });

    if (!isAuth) {
        return <Navigate to={PATH.LOGIN.SIGN_IN}/>
    }
    return (
        <form onSubmit={formik.handleSubmit}>
            <div className={s.container}>
                <h2>Profile</h2>
                <div className={s.content}>
                    <img src={avatar}/>
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