import React from 'react';
import {NavLink} from "react-router-dom";
import {PATH} from "../../App";
import s from './Navbar.module.css'
import {useAppSelector} from "../../bll/store";
import {LogOut} from '../Login/Logout';


export const Navbar = () => {
    const isAuth = useAppSelector<boolean>(state => state.authReducer.isAuth)
    return (
        <div className={s.content}>
            <NavLink to={PATH.PROFILE} className={s.lnk}>Profile</NavLink>
            <NavLink to={PATH.TESTING_PAGE} className={s.lnk}>Testing Page</NavLink>
            <NavLink to={PATH.LOGIN.SIGN_UP} className={s.lnk}>Sign up</NavLink>
            {!isAuth && <NavLink to={PATH.LOGIN.SIGN_IN} className={s.lnk}>Sign in</NavLink>}
            <NavLink to={PATH.LOGIN.UPDATE_PASS} className={s.lnk}>Update password</NavLink>
            <NavLink to={PATH.LOGIN.RESTORE_PASS} className={s.lnk}>Restore password</NavLink>
            {isAuth && <span><LogOut/></span>}
        </div>
    );
};