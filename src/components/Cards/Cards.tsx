import React, {useEffect, useState} from 'react';
import s from "./Cards.module.css";
import SearchCardBlock from './SearchCardBlock/SearchCardBlock';
import PackTable from "./CardTable/PackTable";
import {Button, Pagination, Stack} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../bll/store";
import Typography from "@mui/material/Typography";
import {getSinglePackDataTC} from "../../bll/packReducer";
import {prepareSingleDataForSearchRequest} from "../../utils/dataPrepare/searchSinglePackDataPrepare";
import {useAppDispatch, useAppSelector} from "../../bll/store";
import {addCardTC} from "../../bll/packReducer";
import CardPagination from './CardPagination/CardPagination';

const Cards = () => {

    const dispatch = useAppDispatch()
    const cardsPack_id = useAppSelector<string>((state) => state.singlePackReducer.cardPackId)

    // useEffect(()=>{
    //     dispatch(getSinglePackDataTC({cardsPack_id, page:currentPage}))
    // }, [currentPage])


    const data = {card:{cardsPack_id}}

    const navigate = useNavigate();
    const onClickBackHandler = () => {
      navigate('/cards_packs')
    }
    const onAddCardClickHandler = () => {
        dispatch(addCardTC(data))
    }
    const title = useAppSelector<string>(state => state.singlePackReducer.title)
    const pagesCount = useAppSelector<number>(state => Math.ceil(state.singlePackReducer.cardsTotalCount / state.singlePackReducer.pageCount))
    const packID = useAppSelector<string>(state => state.singlePackReducer.cardPackId)
    const [page, setPage] = useState<number>(1);


    useEffect(()=>{
        dispatch(getSinglePackDataTC(prepareSingleDataForSearchRequest({page, cardsPack_id: packID})))
    },[page])
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };
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