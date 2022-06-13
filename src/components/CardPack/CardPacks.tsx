import React, {useEffect} from 'react';
import {CardsPacksTable} from "./CardsPacksTable";
import {useAppDispatch, useAppSelector} from "../../bll/store";
import {getCardsPacksTableTC, SearchSettingsType} from '../../bll/cardPacksReducer';
import s from './CardPacks.module.css'
import {SideBar} from "../SideBar/SideBar";
import SearchBlock from "./SearchBlock";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import Pagination from "../Pagination/Pagination";
import { prepareDataForSearchRequest } from '../../utils/dataPrepare/searchDataPrepare';
import {Loader} from "../common/Loader/Loader";
import {RequestStatusType} from "../../bll/appReducers";

const CardPacks = () => {

    const dispatch = useAppDispatch();
    const searchSettings = useAppSelector<SearchSettingsType>((state)=>state.cardPacksReducer.searchSettings)
    const appStatus = useAppSelector<RequestStatusType>((state)=>state.appReducer.status)



    useEffect(()=>{
        dispatch(getCardsPacksTableTC(prepareDataForSearchRequest(searchSettings)))
    },[searchSettings.user_id,
        searchSettings.page,
        searchSettings.user_id,
        searchSettings.pageCount,
        searchSettings.packName,
        Array.isArray(searchSettings.minMax) && searchSettings.minMax[0],
        Array.isArray(searchSettings.minMax) && searchSettings.minMax[1],
        dispatch,])




    return (
        <>
            {appStatus === 'loading' && <Loader/>}
            <div className={s.container}>
                <div className={s.sideBar}>
                    <SideBar/>
                </div>
                <div className={s.content}>
                    <h2>Packs list</h2>
                    <SearchBlock/>
                    <CardsPacksTable/>
                    <Pagination/>
                </div>
            </div>
        </>

    );
};


export default compose<React.ComponentType>(withAuthRedirect)(CardPacks);

