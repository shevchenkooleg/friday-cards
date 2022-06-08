import React from 'react';
import s from './SideBar.module.css'
import OwnCardsSelector from "./OwnCardsSelector/OwnCardsSelector";
import DoubleRange from "./DoubleRange/DoubleRange";
import {useAppDispatch, useAppSelector} from "../../bll/store";
import {resetCardPacksFilterAC} from "../../bll/cardPacksReducer";
import {Button} from "@mui/material";
import ProfileBlock from "./ProfileBlock/ProfileBlock";

type PropsType = {
    id?: string
}

export const SideBar = (props: PropsType) => {
    const dispatch = useAppDispatch();
    const maxCardsCount = useAppSelector<number | undefined>((state => state.cardPacksReducer.maxCardsCount))

    const resetButtonHandler = () => {
        maxCardsCount && dispatch(resetCardPacksFilterAC(maxCardsCount))
    };


    return (
        <>
            <div className={s.content}>
                {props.id ? <ProfileBlock/> : <OwnCardsSelector/>}
                <DoubleRange/>
            </div>
            <Button sx={{width: '140px', marginLeft: '20px'}}
                    variant={"contained"} color="secondary" onClick={resetButtonHandler}>Reset filter
            </Button>
        </>
    );
}