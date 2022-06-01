import {Logout} from '@mui/icons-material';
import {IconButton} from '@mui/material';
import React from 'react';
import {LogOutTC} from "../../bll/authReducer";
import {useAppDispatch} from "../../bll/store";


export const LogOut = () => {
    const dispatch = useAppDispatch();

    const logOutHandle = () => {
        dispatch(LogOutTC())

    }

    return (
        <IconButton aria-label="logOut" color={"secondary"} size={"small"}>
            <Logout onClick={logOutHandle}/>
        </IconButton>

    );
};

