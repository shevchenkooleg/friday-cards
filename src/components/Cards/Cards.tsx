import React, {useEffect} from 'react';
import s from "./Cards.module.css";
import SearchCardBlock from './SearchCardBlock/SearchCardBlock';
import PackTable from "./CardTable/PackTable";
import {Button} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../bll/store";
import {getSinglePackDataTC, setPackIdAC} from "../../bll/packReducer";
import {prepareSingleDataForSearchRequest} from "../../utils/dataPrepare/searchSinglePackDataPrepare";
import {addCardTC} from "../../bll/packReducer";
import CardPagination from './CardPagination/CardPagination';

const Cards = () => {

    const dispatch = useAppDispatch()
    const cardsPack_id = useAppSelector<string>((state) => state.singlePackReducer.cardPackId)
    const page = useAppSelector(state => state.singlePackReducer.page)

    const data = {card:{cardsPack_id}}

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
        dispatch(getSinglePackDataTC(prepareSingleDataForSearchRequest({page, cardsPack_id: pack_ID})))
    },[page, pack_ID, dispatch], )

    return (
        <div className={s.container}>
            <Button onClick={onClickBackHandler} variant='contained'>Back</Button>
            <h2>{title}</h2>
            <div className={s.button}>
                <Button variant={"contained"} sx={{width:'200px'}} onClick={onAddCardClickHandler}>Add Card</Button>
            </div>
            <SearchCardBlock/>
            <PackTable/>
            <CardPagination/>
        </div>
    );
};

export default Cards;