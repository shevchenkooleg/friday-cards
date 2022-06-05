import React from 'react';
import s from './SideBar.module.css'
import OwnCardsSelector from "./OwnCardsSelector/OwnCardsSelector";
import DoubleRange from "./DoubleRange/DoubleRange";
import {useAppDispatch, useAppSelector} from "../../bll/store";
import {getCardsPacksTableTC, resetCardPacksFilterAC, SearchSettingsType} from "../../bll/cardReducer";
import {Button} from "@mui/material";



export const SideBar = () => {
    const dispatch = useAppDispatch();
    const searchSettings = useAppSelector<SearchSettingsType>((state) => state.cardReducer.searchSettings)
    const resetButtonHandler = () => {
        dispatch(resetCardPacksFilterAC())
        dispatch(getCardsPacksTableTC(searchSettings))
    }
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
};

