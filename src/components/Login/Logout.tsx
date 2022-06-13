import {Logout} from '@mui/icons-material';
import {IconButton} from '@mui/material';
import React from 'react';
import {LogOutTC} from "../../bll/authReducer";
import {useAppDispatch, useAppSelector} from "../../bll/store";
import {RequestStatusType} from "../../bll/appReducers";


export const LogOut = () => {
    const dispatch = useAppDispatch();
    const appStatus = useAppSelector<RequestStatusType>((state)=>state.appReducer.status)
    const logOutHandle = () => {
        dispatch(LogOutTC())
    }
    return (
        <IconButton disabled={appStatus==='loading'} aria-label="logOut" color={"secondary"} size={"small"}>
            <Logout onClick={logOutHandle}/>
        </IconButton>

    );
};

