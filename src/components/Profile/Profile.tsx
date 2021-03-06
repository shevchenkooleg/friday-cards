import React, {useEffect} from 'react';
import s from "./Profile.module.css";
import {SideBar} from "../SideBar/SideBar";
import {useAppDispatch, useAppSelector} from "../../bll/store";
import {getCardsPacksTableTC, SearchSettingsType} from "../../bll/cardPacksReducer";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import Pagination from "../Pagination/Pagination";
import {prepareDataForSearchRequest} from "../../utils/dataPrepare/searchDataPrepare";
import SearchBlock from '../CardPacks/SearchPackBlock/SearchBlock';
import { CardsPacksTable } from '../CardPacks/PackTable/CardsPacksTable';

const Profile = () => {
    const user_id = useAppSelector<string>((state)=> state.profileReducer.userData.id)
    const searchSettings = useAppSelector<SearchSettingsType>((state)=>state.cardPacksReducer.searchSettings)
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