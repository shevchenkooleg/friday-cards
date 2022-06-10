import {Button, TextField} from '@mui/material';
import React, {ChangeEvent, useState} from 'react';
import s from './SearchBlock.module.css'
import {useAppDispatch, useAppSelector} from "../../bll/store";
import {addCardPack, getCardsPacksTableTC, SearchSettingsType} from "../../bll/cardPacksReducer";
import {prepareDataForSearchRequest} from "../../utils/dataPrepare/searchDataPrepare";

type PropsType = {
    id?: string
}

const SearchBlock = (props: PropsType) => {
    const dispatch = useAppDispatch()
    const searchSettings = useAppSelector<SearchSettingsType>((state) => state.cardPacksReducer.searchSettings)
    const [searchName, setSearchName] = useState<string>('')

    //Поиск по имени

    const onChangeHandle = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setSearchName(e.currentTarget.value)
        if (searchName.trim().length >= 0) {
            setTimeout(() => {
                searchSettings.packName = searchName;
                // dispatch(getCardsPacksTableTC(searchSettings))
            }, 1500)
        }
    }

    const onAddCardPackClickHandler = () => {

        dispatch(addCardPack({cardsPack: {name: 'My Pack'}}, props.id))
    }
    const onSearchClickHandler = () => {
        dispatch(getCardsPacksTableTC(prepareDataForSearchRequest(searchSettings)))
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