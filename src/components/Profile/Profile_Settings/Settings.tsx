import React from 'react';
import {IconButton} from "@mui/material";
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import {useNavigate} from 'react-router-dom';
import { PATH } from '../../../App';



export const Settings = () => {
    const navigate = useNavigate();
    const onClickHandler = () => {
      navigate(PATH.PROFILE.SETTINGS)
    }

    return (
        <IconButton aria-label="logOut" color={"secondary"} size={"small"}>
            <SettingsApplicationsIcon onClick={onClickHandler}/>
        </IconButton>
    );
};

