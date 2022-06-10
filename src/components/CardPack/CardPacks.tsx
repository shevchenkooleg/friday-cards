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

const CardPacks = () => {

    const dispatch = useAppDispatch();
    const searchSettings = useAppSelector<SearchSettingsType>((state)=>state.cardPacksReducer.searchSettings)
    const searchSettingsCurrentPage = useAppSelector<number>((state)=>state.cardPacksReducer.searchSettings.page)


    useEffect(()=>{
        dispatch(getCardsPacksTableTC(prepareDataForSearchRequest(searchSettings)))
    },[dispatch, searchSettingsCurrentPage])




    return (
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
    );
};


export default compose<React.ComponentType>(withAuthRedirect)(CardPacks);

