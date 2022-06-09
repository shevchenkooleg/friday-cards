import React, {useEffect} from 'react';
import s from "./Profile.module.css";
import {SideBar} from "../SideBar/SideBar";
import SearchBlock from "../CardPack/SearchBlock";
import {CardsPacksTable} from "../CardPack/CardsPacksTable";
import {useAppDispatch, useAppSelector} from "../../bll/store";
import {getCardReducerData} from "../../bll/cardPacksReducer";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import Pagination from "../Pagination/Pagination";

const Profile = () => {
    const user_id = useAppSelector<string>((state)=> state.profileReducer.userData.id)
    const dispatch = useAppDispatch()

    useEffect(()=>{
        dispatch(getCardReducerData({user_id}))
    },[dispatch, user_id])

    return (
        <div className={s.container}>
            <div className={s.sideBar}>
                <SideBar id={user_id}/>
            </div>
            <div className={s.content}>
                <h2>My packs list</h2>
                <SearchBlock id={user_id}/>
                <CardsPacksTable id={user_id}/>
                <Pagination/>
            </div>
        </div>
    );
};

// export default Profile;
export default compose<React.ComponentType>(withAuthRedirect)(Profile);