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
        const defaultSearchSettings = {
            packName: '',
                minMax: [0, 103],
                sortPacks: '',
                page: 1,
                pageCount: 10,
                user_id: '',
        }
        maxCardsCount && dispatch(resetCardPacksFilterAC(maxCardsCount))
        // dispatch(getCardReducerData(prepareDataForSearchRequest(defaultSearchSettings, '')))
        //вынес подготовку объекта для отправки в отдельную функцию prepareDataForSearchRequest
        //два диспатча выполняются как хотят (в произвольном порядке)
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