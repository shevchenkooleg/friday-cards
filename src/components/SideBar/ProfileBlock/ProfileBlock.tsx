import React from 'react';
import s from "../../Profile/EditProfile/EditProfile.module.css";
import {useAppSelector} from "../../../bll/store";
import { Button } from '@mui/material';
import {useNavigate} from "react-router-dom";

const ProfileBlock = () => {

    const avatar = useAppSelector<string>((state) => state.profileReducer.userData.avatar)
    const nickName = useAppSelector<string>((state) => state.profileReducer.userData.nickName)
    const navigate = useNavigate()

    const onEditButtonClickHandler = () => {
        navigate('/profile/edit')
    }


    return (
        <div className={s.content}>
            <img src={avatar} alt={'avatar'}/>
            <div>{nickName}</div>
            <div>Front-end developer</div>
            <Button variant={"contained"} onClick={onEditButtonClickHandler}>Edit profile</Button>
        </div>
    );
};

export default ProfileBlock;