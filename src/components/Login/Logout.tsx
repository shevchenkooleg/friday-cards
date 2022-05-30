import { Logout } from '@mui/icons-material';
import React from 'react';
import {LogOutTC} from "../../bll/authReducer";
import {useAppDispatch} from "../../bll/store";



export const LogOut = () => {
    const dispatch = useAppDispatch();

    const logOutHandle = () => {
        dispatch(LogOutTC())

    }

    return (
        <Logout onClick={logOutHandle}/>
    );
};

