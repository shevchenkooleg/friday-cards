import React from 'react';
import s from './SideBar.module.css'
import OwnCardsSelector from "./OwnCardsSelector/OwnCardsSelector";
import DoubleRange from "./DoubleRange/DoubleRange";
import {useAppDispatch, useAppSelector} from "../../bll/store";
import {resetCardPacksFilterAC, setSearchAreaValueAC} from "../../bll/cardPacksReducer";
import {Button} from "@mui/material";
import ProfileBlock from "./ProfileBlock/ProfileBlock";
import {RequestStatusType} from "../../bll/appReducers";

type PropsType = {
    id?: string
}

export const SideBar = (props: PropsType) => {
    const dispatch = useAppDispatch();
    const maxCardsCount = useAppSelector<number | undefined>((state => state.cardPacksReducer.maxCardsCount))
    const appStatus = useAppSelector<RequestStatusType>((state)=>state.appReducer.status)

    const resetButtonHandler = () => {
        maxCardsCount && dispatch(resetCardPacksFilterAC(maxCardsCount))
        dispatch(setSearchAreaValueAC(''))
    };


    return (
        <>
            <div className={s.content}>
                {props.id ? <ProfileBlock/> : <OwnCardsSelector/>}
                <DoubleRange/>
            </div>
            <Button sx={{width: '140px', margin:'10px 0 0 0'}}
                    variant={"contained"} color="secondary" onClick={resetButtonHandler} disabled={appStatus === 'loading'}>Reset filter
            </Button>
        </>
    );
}