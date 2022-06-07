import React, {useEffect} from 'react';
import {CardsPacksTable} from "./CardsPacksTable";
import {useAppDispatch} from "../../bll/store";
import { getCardReducerData } from '../../bll/cardPacksReducer';
import s from './CardPacks.module.css'
import {SideBar} from "../SideBar/SideBar";
import SearchBlock from "./SearchBlock";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

const CardPacks = () => {
    const dispatch = useAppDispatch();
    useEffect(()=>{
        dispatch(getCardReducerData({pageCount:10, user_id: ''}))
    }, [dispatch])
    return (
        <div className={s.container}>
            <div className={s.sideBar}>
                <SideBar/>
            </div>
            <div className={s.content}>
                <h2>Packs list</h2>
                <SearchBlock/>
                <CardsPacksTable/>
            </div>
        </div>
    );
};


export default compose<React.ComponentType>(withAuthRedirect)(CardPacks);

