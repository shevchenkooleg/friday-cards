import React from 'react';
import {NavLink} from "react-router-dom";
import {PATH} from "../../App";
import s from './Navbar.module.css'
import {useAppDispatch, useAppSelector} from "../../bll/store";
import {LogOut} from '../Login/Logout';
import {Settings} from "../Profile/Profile_Settings/Settings";
import {setUserIDForSearchAC} from "../../bll/cardPacksReducer";


export const Navbar = () => {
    const isAuth = useAppSelector<boolean>(state => state.authReducer.isAuth)
    const userId = useAppSelector<string>((state)=>state.profileReducer.userData.id)
    const dispatch = useAppDispatch()

    const onProfileLinkClick = () => {
        dispatch(setUserIDForSearchAC(userId))
    }
    const onPacksListLinkClick = () => {
        dispatch(setUserIDForSearchAC(''))
    }

    return (
        <div className={s.content}>
            {isAuth && <NavLink to={PATH.CARD.PACKS} onClick={onPacksListLinkClick} className={s.lnk}>Packs list</NavLink>}
            {isAuth && <NavLink to={PATH.PROFILE.MAIN} onClick={onProfileLinkClick} className={s.lnk}>Profile</NavLink>}
            {/*{isAuth && <NavLink to={PATH.TESTING_PAGE} className={s.lnk}>Testing Page</NavLink>}*/}
            {/*{!isAuth && <NavLink to={PATH.LOGIN.SIGN_UP} className={s.lnk}>Sign up</NavLink>}
            {!isAuth && <NavLink to={PATH.LOGIN.SIGN_IN} className={s.lnk}>Sign in</NavLink>}
            {!isAuth && <NavLink to={PATH.LOGIN.UPDATE_PASS} className={s.lnk}>Update password</NavLink>}
            {!isAuth && <NavLink to={PATH.LOGIN.RESTORE_PASS} className={s.lnk}>Restore password</NavLink>}*/}
            {isAuth && <span className={s.span}><Settings/><LogOut/></span>}
        </div>
    );
};