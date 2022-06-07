import React from 'react';
import s from './SideBar.module.css'
import OwnCardsSelector from "./OwnCardsSelector/OwnCardsSelector";
import DoubleRange from "./DoubleRange/DoubleRange";
import {useAppDispatch} from "../../bll/store";
import {getCardReducerData,resetCardPacksFilterAC} from "../../bll/cardPacksReducer";
import {Button} from "@mui/material";
import {prepareDataForSearchRequest} from "../../utils/dataPrepare/searchDataPrepare";


export const SideBar = () => {
    const dispatch = useAppDispatch();

    const resetButtonHandler = () => {
        const defaultSearchSettings = {
            packName: '',
                minMax: [0, 103],
                sortPacks: '',
                page: 1,
                pageCount: 10,
                user_id: '',
        }
        dispatch(resetCardPacksFilterAC())
        dispatch(getCardReducerData(prepareDataForSearchRequest(defaultSearchSettings, '')))
        //вынес подготовку объекта для отправки в отдельную функцию prepareDataForSearchRequest
        //два диспатча выполняются как хотят (в произвольном порядке)
    };


    return (
        <>
            <div className={s.content}>
                <OwnCardsSelector/>
                <DoubleRange/>
            </div>
            <Button sx={{width: '140px', marginLeft: '20px'}}
                    variant={"contained"} color="secondary" onClick={resetButtonHandler}>Reset filter
            </Button>
        </>
    );
}