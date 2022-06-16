import {Button, TextField} from '@mui/material';
import React, {ChangeEvent, useEffect, useState} from 'react';
import s from './SearchBlock.module.css'
import {useAppDispatch, useAppSelector} from "../../../bll/store";
import {
    addCardPack, SearchSettingsType,
    setPackNameForSearchAC, setSearchAreaValueAC
} from "../../../bll/cardPacksReducer";
import {useDebounce} from 'use-debounce';
import {prepareDataForSearchRequest} from "../../../utils/dataPrepare/searchDataPrepare";
import {RequestStatusType} from "../../../bll/appReducers";
import Modal from "../../Modal_windows/Modal";


type SearchBlockPropsType = {
    id?: string
}

const SearchBlock = (props: SearchBlockPropsType) => {
    const dispatch = useAppDispatch()
    const searchAreaValue = useAppSelector<string>((state) => state.cardPacksReducer.searchAreaValue)
    const [debouncedSearchAreaValue] = useDebounce<string>(searchAreaValue, 700)
    const searchSettings = useAppSelector<SearchSettingsType>((state) => state.cardPacksReducer.searchSettings)
    const appStatus = useAppSelector<RequestStatusType>((state) => state.appReducer.status)
    //стейт для модалки добавления Пака
    const [show, setShow] = useState<boolean>(false)
    const [packTitle, setPackTitle] = useState<string>('')

    useEffect(() => {
        dispatch(setPackNameForSearchAC(debouncedSearchAreaValue))
    }, [debouncedSearchAreaValue, dispatch])
    const onChangeHandle = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        dispatch(setSearchAreaValueAC((e.currentTarget.value)))
    }
    const onAddCardPackClickHandler = () => {
        setShow(true)
    }
    const onChangeAddHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPackTitle(e.currentTarget.value)
    }
    const onClickSaveHandler = () => {
        dispatch(addCardPack({cardsPack: {name: packTitle}}, prepareDataForSearchRequest(searchSettings)))
        setShow(false)
        setPackTitle('')
    }

    return (
        <div className={s.content}>
            <Modal show={show} setShow={setShow}>
                <div className={s.modalContainer}>
                    <p className={s.titleModal}>Add new pack</p>
                    <TextField label="Name Pack" variant="standard" onChange={onChangeAddHandler} value={packTitle}/>
                    <div className={s.buttonsModal}>
                        <Button onClick={() => setShow(false)} variant="outlined" color="error">Cancel</Button>
                        <Button onClick={onClickSaveHandler} variant="contained" color="success">Save</Button></div>
                </div>
            </Modal>
            <TextField id="outlined-basic" label="Search"
                       variant="outlined" sx={{width: '60%'}} size={'small'}
                       value={searchAreaValue} onChange={onChangeHandle} disabled={appStatus === 'loading'}/>
            <Button sx={{width: '150px', marginLeft: '20px'}} variant={"contained"}
                    onClick={onAddCardPackClickHandler} disabled={appStatus === 'loading'}>Add new pack</Button>

        </div>
    );
};

export default SearchBlock;