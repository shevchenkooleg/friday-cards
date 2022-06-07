import {TextField} from '@mui/material';
import React, {ChangeEvent, useState} from 'react';
import {getCardsPacksTableTC, SearchSettingsType } from '../../../bll/cardPacksReducer';
import { useAppDispatch, useAppSelector } from '../../../bll/store';
import s from './SearchCardBlock.module.css'

const SearchCardBlock = () => {
    const searchSettings = useAppSelector<SearchSettingsType>((state) => state.cardPacksReducer.searchSettings)
    const [searchName, setSearchName] = useState<string>('')
    const dispatch = useAppDispatch()

    //Поиск по имени
    const onChangeHandle = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setSearchName(e.currentTarget.value)
        if (searchName.trim().length >= 0) {
            setTimeout(()=>{
                searchSettings.packName = searchName;
                dispatch(getCardsPacksTableTC(searchSettings))
            },1500)
        }
    }
    return (
        <div className={s.content}>
            <TextField id="outlined-basic" label="Search"
                       variant="outlined" sx={{width: '90%'}} size={'small'}
                       value={searchName} onChange={onChangeHandle}/>
        </div>
    );
};

export default SearchCardBlock;

