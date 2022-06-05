import React from 'react';
import s from "../../Profile/Profile.module.css";
import {useAppSelector} from "../../../bll/store";

const ProfileBlock = () => {

    const avatar = useAppSelector<string>((state) => state.profileReducer.userData.avatar)
    const nickName = useAppSelector<string>((state) => state.profileReducer.userData.nickName)

    return (
        <div className={s.content}>
            <img src={avatar} alt={'avatar'}/>
            <div>{nickName}</div>
            <div>Front-end developer</div>
        </div>
    );
};

export default ProfileBlock;