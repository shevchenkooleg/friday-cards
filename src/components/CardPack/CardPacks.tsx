import React, {useEffect} from 'react';
import {CardsPacksTable} from "./CardsPacksTable";
import {setCardsPacksTableTC} from "../../bll/cardReducer";
import {useAppDispatch} from "../../bll/store";

export const CardPacks = () => {
    const dispatch = useAppDispatch();
    useEffect(()=>{
        dispatch(setCardsPacksTableTC({}))
    }, [])
    return (
        <div>
            <CardsPacksTable/>
        </div>
    );
};

