import React from 'react';
import s from "./Cards.module.css";
import SearchCardBlock from './SearchCardBlock/SearchCardBlock';
import PackTable from "./CardTable/PackTable";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../bll/store";

const Cards = () => {
    const navigate = useNavigate();
    const onClickBackHandler = () => {
      navigate('/cards_packs')
    }
    const title = useAppSelector<string>(state => state.singlePackReducer.title)
    return (
        <div className={s.container}>
            <Button onClick={onClickBackHandler} variant='contained'>Back</Button>
            <h2>{title}</h2>
            <SearchCardBlock/>
            <PackTable/>
        </div>
    );
};

export default Cards;