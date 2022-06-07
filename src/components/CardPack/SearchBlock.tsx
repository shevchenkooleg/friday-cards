import {Button, TextField} from '@mui/material';
import React, {ChangeEvent, useState} from 'react';
import s from './SearchBlock.module.css'
import {useAppDispatch, useAppSelector} from "../../bll/store";
import {addCardPack, CardsPacksDataType, getCardsPacksTableTC, SearchSettingsType} from "../../bll/cardPacksReducer";

const SearchBlock = () => {

    const dispatch = useAppDispatch()
    const searchSettings = useAppSelector<SearchSettingsType>((state) => state.cardPacksReducer.searchSettings)
    const [searchName, setSearchName] = useState<string>('')

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

    const onAddCardPackClickHandler = () => {
        console.log('Pack added')
        dispatch(addCardPack({cardsPack: {name: 'My Pack'}}))
    }
    const onSearchClickHandler = () => {
        let data = {} as CardsPacksDataType & { minMax?: number | number[] }
        for (let key in searchSettings) {
            // @ts-ignore
            if (searchSettings[key]) {
                // @ts-ignore
                data = {...data, [key]: searchSettings[key]}
            }
        }
        if (data.minMax) {
            // @ts-ignore
            data = {...data, min: data.minMax[0], max: data.minMax[1]}
            delete data.minMax
        }
        if (searchName.trim().length >= 0) data={...data, packName: searchName} //Добавил для поиска по имени
        dispatch(getCardsPacksTableTC(data))
    }
    return (
        <div className={s.content}>
            <TextField id="outlined-basic" label="Search"
                       variant="outlined" sx={{width: '60%'}} size={'small'}
                       value={searchName} onChange={onChangeHandle}/>
            <Button sx={{width: '100px', marginLeft: '20px'}} variant={"contained"}
                    onClick={onSearchClickHandler}>Search</Button>
            <Button sx={{width: '150px', marginLeft: '20px'}} variant={"contained"}
                    onClick={onAddCardPackClickHandler}>Add new pack</Button>

        </div>
    );
};

export default SearchBlock;