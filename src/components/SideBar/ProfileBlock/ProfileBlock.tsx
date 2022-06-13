import React from 'react';
import s from "../../Profile/EditProfile/EditProfile.module.css";
import {useAppSelector} from "../../../bll/store";
import { Button } from '@mui/material';
import {useNavigate} from "react-router-dom";
import {RequestStatusType} from "../../../bll/appReducers";

const ProfileBlock = () => {

    const avatar = useAppSelector<string>((state) => state.profileReducer.userData.avatar)
    const nickName = useAppSelector<string>((state) => state.profileReducer.userData.nickName)
    const navigate = useNavigate()
    const appStatus = useAppSelector<RequestStatusType>((state)=>state.appReducer.status)

    const onEditButtonClickHandler = () => {
        navigate('/profile/edit')
    }


    return (
        <div className={s.content}>
            <img src={avatar} alt={'avatar'} style={{padding:'20px 0 10px 0'}}/>
            <div>{nickName}</div>
            <div style={{paddingBottom:'10px'}}>Front-end developer</div>
            <Button variant={"contained"} onClick={onEditButtonClickHandler} disabled={appStatus==='loading'}>Edit profile</Button>
        </div>
    );
};

export default ProfileBlock;