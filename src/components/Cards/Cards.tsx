import React, {useEffect} from 'react';
import s from "./Cards.module.css";
import SearchCardBlock from './SearchCardBlock/SearchCardBlock';
import PackTable from "./CardTable/PackTable";
import {Button} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../bll/store";
import {getSinglePackDataTC, setPackIdAC, SinglePackSearchSettingsType} from "../../bll/packReducer";
import {
    prepareSinglePackDataForSearchRequest
} from "../../utils/dataPrepare/searchSinglePackDataPrepare";
import {addCardTC} from "../../bll/packReducer";
import CardPagination from './CardPagination/CardPagination';
import {Loader} from "../common/Loader/Loader";
import {RequestStatusType} from "../../bll/appReducers";

const Cards = () => {

    const dispatch = useAppDispatch()
    const cardsPack_id = useAppSelector<string>((state) => state.singlePackReducer.cardPackId)
    const packUserId = useAppSelector<string>((state)=>state.singlePackReducer.packUserId)
    const user_id = useAppSelector<string>((state)=>state.profileReducer.userData.id)
    const singlePackSearchSettings = useAppSelector<SinglePackSearchSettingsType>((state)=>state.singlePackReducer.searchSettings)
    const appStatus = useAppSelector<RequestStatusType>((state)=>state.appReducer.status)
    const data = {card:{cardsPack_id}}

    console.log(packUserId)
    console.log(user_id)

    const navigate = useNavigate();
    const onClickBackHandler = () => {
      navigate('/cards_packs')
    }
    const onAddCardClickHandler = () => {
        dispatch(addCardTC(data))
    }
    const title = useAppSelector<string>(state => state.singlePackReducer.title)



    let pack_ID = useParams().pack_ID;

    useEffect(()=>{
        pack_ID && dispatch(setPackIdAC(pack_ID))
        dispatch(getSinglePackDataTC(prepareSinglePackDataForSearchRequest(singlePackSearchSettings, {cardsPack_id:pack_ID})))
    },[
        singlePackSearchSettings.page,
        singlePackSearchSettings.cardsPack_id,
        singlePackSearchSettings.pageCount,
        singlePackSearchSettings.cardQuestion,
        singlePackSearchSettings.cardAnswer,
        pack_ID,
        dispatch
    ], )

    return (
        <>
            {appStatus === 'loading' && <Loader/>}
            <div className={s.container}>
                <Button onClick={onClickBackHandler} variant='contained'>Back</Button>
                <h2>{title}</h2>
                <div className={s.button}>
                    {packUserId === user_id && <Button variant={"contained"} sx={{width: '200px'}} onClick={onAddCardClickHandler}>Add
                        Card</Button>}
                </div>
                <SearchCardBlock/>
                <PackTable/>
                <CardPagination/>
            </div>
        </>

    );
};

export default Cards;