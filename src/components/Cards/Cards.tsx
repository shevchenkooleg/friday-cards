import React, {ChangeEvent, useEffect, useState} from 'react';
import s from "./Cards.module.css";
import SearchCardBlock from './SearchCardBlock/SearchCardBlock';
import PackTable from "./CardTable/PackTable";
import {Button, TextField} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../bll/store";
import {getSinglePackDataTC, setPackIdAC, SinglePackSearchSettingsType} from "../../bll/packReducer";
import {
    prepareSinglePackDataForSearchRequest
} from "../../utils/dataPrepare/searchSinglePackDataPrepare";
import {addCardTC} from "../../bll/packReducer";
import CardPagination from './CardPagination/CardPagination';
import {Loader} from "../common/Loader/Loader";
import {RequestStatusType} from "../../bll/appReducers";
import Modal from "../Modal_windows/Modal";


interface ICards {
    edit?: boolean
}
const Cards:React.FC<ICards> = ({edit}) => {

    const dispatch = useAppDispatch()
    const cardsPack_id = useAppSelector<string>((state) => state.singlePackReducer.cardPackId)
    const packUserId = useAppSelector<string>((state) => state.singlePackReducer.packUserId)
    const user_id = useAppSelector<string>((state) => state.profileReducer.userData.id)
    const singlePackSearchSettings = useAppSelector<SinglePackSearchSettingsType>((state) => state.singlePackReducer.searchSettings)
    const appStatus = useAppSelector<RequestStatusType>((state) => state.appReducer.status)
    const data = {card: {cardsPack_id}}
    const navigate = useNavigate();


    const [show, setShow] = useState<boolean>(false)
    const [question, setQuestion] = useState<string>('')
    const [answer, setAnswer] = useState<string>('')


    const onAddCardClickHandler = () => {
        setShow(true)
    }
    const onChangeQuestion = (e: ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.currentTarget.value)
    }
    const onChangeAnswer = (e: ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.currentTarget.value)
    }

    const saveButtonHandler = () => {
        dispatch(addCardTC({card: {cardsPack_id: data.card.cardsPack_id, question, answer}}))
        setShow(false)
        setQuestion('')
        setAnswer('')
    }
    const cancelButtonHandler = () => {
        setShow(false)
        setAnswer('')
        setQuestion('')
    }
    const onClickBackHandler = () => {
        navigate('/cards_packs')
    }
    const title = useAppSelector<string>(state => state.singlePackReducer.title)


    let pack_ID = useParams().pack_ID;

    useEffect(() => {
        pack_ID && dispatch(setPackIdAC(pack_ID))
        dispatch(getSinglePackDataTC(prepareSinglePackDataForSearchRequest(singlePackSearchSettings, {cardsPack_id: pack_ID})))
    }, [
        singlePackSearchSettings.page,
        singlePackSearchSettings.cardsPack_id,
        singlePackSearchSettings.pageCount,
        singlePackSearchSettings.cardQuestion,
        singlePackSearchSettings.cardAnswer,
        pack_ID,
        dispatch,
    ],)

    return (
        <>
            <Modal show={show} setShow={setShow}>
                <div className={s.modalContainer}>
                    <p className={s.modalTitle}>Add new <span className={s.modalMainWord}>question</span></p>
                    <TextField
                        onChange={onChangeQuestion}
                        sx={{marginTop: '20px'}}
                        id="filled-multiline-static"
                        label="Question"
                        multiline
                        rows={4}
                        defaultValue={question}
                        value={question}
                        variant="filled"/>
                    <TextField
                        onChange={onChangeAnswer}
                        sx={{marginTop: '20px'}}
                        id="filled-multiline-static"
                        label="Answer"
                        multiline
                        rows={4}
                        defaultValue={answer}
                        value={answer}
                        variant="filled"/>
                    <div className={s.modalButtons}>
                        <Button onClick={cancelButtonHandler} variant="outlined" color="error">Cancel</Button>
                        <Button onClick={saveButtonHandler} variant="contained" color="success">Save</Button>
                    </div>
                </div>
            </Modal>
            {appStatus === 'loading' && <Loader/>}
            <div className={s.container}>
                <Button disabled={appStatus === 'loading'} onClick={onClickBackHandler} variant='contained'>Back</Button>
                <h2>{title}</h2>
                <div className={s.button}>
                    {packUserId === user_id && <Button variant={"contained"}
                                                       sx={{width: '200px'}}
                                                       disabled={appStatus === 'loading'}
                                                       onClick={onAddCardClickHandler}>
                        Add Card
                    </Button>}
                </div>
                <SearchCardBlock/>
                <PackTable edit={edit}/>
                <CardPagination/>
            </div>
        </>

    );
};

export default Cards;