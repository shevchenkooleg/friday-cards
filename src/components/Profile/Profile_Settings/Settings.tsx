import React from 'react';
import {IconButton} from "@mui/material";
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import {useNavigate} from 'react-router-dom';
import { PATH } from '../../../App';
import {useAppSelector} from "../../../bll/store";
import {RequestStatusType} from "../../../bll/appReducers";



export const Settings = () => {
    const navigate = useNavigate();
    const appStatus = useAppSelector<RequestStatusType>((state)=>state.appReducer.status)
    const onClickHandler = () => {
      navigate(PATH.PROFILE.SETTINGS)
    }

    return (
        <IconButton disabled={appStatus==='loading'} aria-label="logOut" color={"secondary"} size={"small"}>
            <SettingsApplicationsIcon onClick={onClickHandler}/>
        </IconButton>
    );
};

