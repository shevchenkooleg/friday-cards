import {Button, TextField} from '@mui/material';
import React, {ChangeEvent, useEffect} from 'react';
import s from './SearchBlock.module.css'
import {useAppDispatch, useAppSelector} from "../../bll/store";
import {
    addCardPack,
    setPackNameForSearchAC, setSearchAreaValueAC
} from "../../bll/cardPacksReducer";
import { useDebounce } from 'use-debounce';


type SearchBlockPropsType = {
    id?: string
}

const SearchBlock = (props: SearchBlockPropsType) => {
    const dispatch = useAppDispatch()
    const searchAreaValue = useAppSelector<string>((state)=>state.cardPacksReducer.searchAreaValue)
    const [debouncedSearchAreaValue, func] = useDebounce<string>(searchAreaValue, 700)

    useEffect(() => {
        dispatch(setPackNameForSearchAC(debouncedSearchAreaValue))
    }, [debouncedSearchAreaValue, dispatch])
    const onChangeHandle = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        dispatch(setSearchAreaValueAC((e.currentTarget.value)))
    }
    const onAddCardPackClickHandler = () => {

        dispatch(addCardPack({cardsPack: {name: 'My Pack'}}, props.id))
    }

    return (
        <div className={s.content}>
            <TextField id="outlined-basic" label="Search"
                       variant="outlined" sx={{width: '60%'}} size={'small'}
                       value={searchAreaValue} onChange={onChangeHandle}/>
            <Button sx={{width: '150px', marginLeft: '20px'}} variant={"contained"}
                    onClick={onAddCardPackClickHandler}>Add new pack</Button>

        </div>
    );
};

export default SearchBlock;