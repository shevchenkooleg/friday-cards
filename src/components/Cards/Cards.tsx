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

const Cards = () => {
    const navigate = useNavigate();
    const onClickBackHandler = () => {
      navigate('/cards_packs')
    }
    const dispatch = useAppDispatch();
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
            <SearchCardBlock/>
            <PackTable/>
            <Stack spacing={2}>
                <Typography>Page: {page}</Typography>
                <Pagination count={pagesCount} page={page} onChange={handleChange} />
            </Stack>
        </div>
    );
};

export default Cards;