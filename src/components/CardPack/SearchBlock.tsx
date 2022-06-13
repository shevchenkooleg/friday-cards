import {Button, TextField} from '@mui/material';
import React, {ChangeEvent, useEffect} from 'react';
import s from './SearchBlock.module.css'
import {useAppDispatch, useAppSelector} from "../../bll/store";
import {
    addCardPack, SearchSettingsType,
    setPackNameForSearchAC, setSearchAreaValueAC
} from "../../bll/cardPacksReducer";
import { useDebounce } from 'use-debounce';
import {prepareDataForSearchRequest} from "../../utils/dataPrepare/searchDataPrepare";
import {RequestStatusType} from "../../bll/appReducers";


type SearchBlockPropsType = {
    id?: string
}

const SearchBlock = (props: SearchBlockPropsType) => {
    const dispatch = useAppDispatch()
    const searchAreaValue = useAppSelector<string>((state)=>state.cardPacksReducer.searchAreaValue)
    const [debouncedSearchAreaValue, func] = useDebounce<string>(searchAreaValue, 700)
    const searchSettings = useAppSelector<SearchSettingsType>((state)=>state.cardPacksReducer.searchSettings)
    const appStatus = useAppSelector<RequestStatusType>((state)=>state.appReducer.status)

    useEffect(() => {
        dispatch(setPackNameForSearchAC(debouncedSearchAreaValue))
    }, [debouncedSearchAreaValue, dispatch])
    const onChangeHandle = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        dispatch(setSearchAreaValueAC((e.currentTarget.value)))
    }
    const onAddCardPackClickHandler = () => {

        dispatch(addCardPack({cardsPack: {name: 'My Pack'}}, prepareDataForSearchRequest(searchSettings)))
    }

    return (
        <div className={s.content}>
            <TextField id="outlined-basic" label="Search"
                       variant="outlined" sx={{width: '60%'}} size={'small'}
                       value={searchAreaValue} onChange={onChangeHandle} disabled={appStatus==='loading'}/>
            <Button sx={{width: '150px', marginLeft: '20px'}} variant={"contained"}
                    onClick={onAddCardPackClickHandler} disabled={appStatus==='loading'}>Add new pack</Button>

        </div>
    );
};

export default SearchBlock;