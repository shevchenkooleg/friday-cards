import React, {useEffect} from 'react';
import s from "./Profile.module.css";
import {SideBar} from "../SideBar/SideBar";
import SearchBlock from "../CardPack/SearchBlock";
import {CardsPacksTable} from "../CardPack/CardsPacksTable";
import {useAppDispatch, useAppSelector} from "../../bll/store";
import {getCardsPacksTableTC, SearchSettingsType} from "../../bll/cardPacksReducer";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import Pagination from "../Pagination/Pagination";
import {prepareDataForSearchRequest} from "../../utils/dataPrepare/searchDataPrepare";
import {Loader} from "../common/Loader/Loader";
import {RequestStatusType} from "../../bll/appReducers";

const Profile = () => {
    const user_id = useAppSelector<string>((state)=> state.profileReducer.userData.id)
    const searchSettings = useAppSelector<SearchSettingsType>((state)=>state.cardPacksReducer.searchSettings)
    const appStatus = useAppSelector<RequestStatusType>((state)=>state.appReducer.status)
    const dispatch = useAppDispatch()

    useEffect(()=>{
        dispatch(getCardsPacksTableTC(prepareDataForSearchRequest(searchSettings)))
    },[dispatch, user_id,
        searchSettings.page,
        searchSettings.user_id,
        searchSettings.pageCount,
        searchSettings.packName,
        Array.isArray(searchSettings.minMax) && searchSettings.minMax[0],
        Array.isArray(searchSettings.minMax) && searchSettings.minMax[1]])

    return (
        <>
            {appStatus === 'loading' && <Loader/>}
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
        </>

    );
};

// export default Profile;
export default compose<React.ComponentType>(withAuthRedirect)(Profile);