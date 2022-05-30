import { Logout } from '@mui/icons-material';
import React from 'react';
import {LogOutTC} from "../../bll/authReducer";
import {useAppDispatch} from "../../bll/store";
import {useNavigate} from "react-router-dom";
import {PATH} from "../../App";


export const LogOut = () => {
    const dispatch = useAppDispatch();

    const navigate = useNavigate();
    const logOutHandle = () => {
        dispatch(LogOutTC())
        navigate(PATH.LOGIN.SIGN_IN)
    }

    return (
        <Logout onClick={logOutHandle}/>
    );
};

