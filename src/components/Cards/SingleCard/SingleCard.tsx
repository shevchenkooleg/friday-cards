import React, {ChangeEvent, useEffect, useState} from 'react';
import {CardsType, deleteCardTC, editCardTC} from "../../../bll/packReducer";
import Modal from "../../Modal_windows/Modal";
import s from "../../CardPacks/PackTable/CardsPacksTable.module.css";
import {Button, TextField} from "@mui/material";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {UpdateFormat} from "../../common/UpdateData_Format/UpdateFormat";
import {Rating} from "../../Raiting/Raiting";
import {useAppDispatch, useAppSelector} from "../../../bll/store";
import {RequestStatusType} from "../../../bll/appReducers";
type SingleCardPropsType = {
    card: CardsType
    edit?: boolean
}

const SingleCard = (props: SingleCardPropsType) => {

    const dispatch = useAppDispatch()
    const appStatus = useAppSelector<RequestStatusType>((state) => state.appReducer.status)

    const [show, setShow] = useState<boolean>(false)
    const [showEdit, setShowEdit] = useState<boolean>(false)
    const [question, setQuestion] = useState<string>()
    const [answer, setAnswer] = useState<string>()


    useEffect(()=>{
        setQuestion(props.card.question)
        setAnswer(props.card.answer)
    },[props.card.question, props.card.answer])


    const onDeleteButtonClickHandler = () => {
        setShow(true)
    }
    const yesButtonClickHandler = () => {
        dispatch(deleteCardTC(props.card._id))
        setShow(false)
    }
    const onChangeQuestion = (e: ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.currentTarget.value)
    }
    const onChangeAnswer = (e: ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.currentTarget.value)
    }
    const onEditButtonClickHandler = () => {
        setShowEdit(true)
    }
    const saveButtonClickHandler = () => {
        dispatch(editCardTC({card: {question, answer, _id: props.card._id}}))
        setShowEdit(false)
    }


    return (
        <>
            <Modal show={showEdit} setShow={setShowEdit}>
                <div className={s.modalContainer}>
                    <p className={s.modalTitle}>Edit <span
                        className={s.modalMainWord}>question</span> or <span
                        className={s.modalMainWord}>answer</span></p>
                    <TextField
                        onChange={onChangeQuestion}
                        sx={{marginTop: '20px'}}
                        id="filled-multiline-static"
                        label="Question"
                        multiline
                        rows={4}
                        defaultValue={props.card.question}
                        value={question}
                        variant="filled"/>
                    <TextField
                        onChange={onChangeAnswer}
                        sx={{marginTop: '20px'}}
                        id="filled-multiline-static"
                        label="Answer"
                        multiline
                        rows={4}
                        defaultValue={props.card.answer}
                        value={answer}
                        variant="filled"/>
                    <div className={s.modalButtons}>
                        <Button onClick={() => setShowEdit(false)} variant="outlined"
                                color="error">Cancel</Button>
                        <Button onClick={saveButtonClickHandler} variant="contained"
                                color="success">Save</Button>
                    </div>
                </div>
            </Modal>
            <Modal show={show} setShow={setShow}>
                <p className={s.titleModal}>Do you wont to <span
                    className={s.textModal}>DELETE</span> this card?</p>
                <div className={s.insideModal}>
                    <Button onClick={yesButtonClickHandler} variant="contained"
                            color="success">Yes</Button>
                    <Button onClick={() => setShow(false)} variant="outlined"
                            color="error">No</Button>
                </div>
            </Modal>
            <TableRow
                key={props.card._id}
                sx={{'&:last-child td, &:last-child th': {border: 0, textAlign: 'right'}}}
            >
                <TableCell component="th" scope="row">
                    {props.card.question}
                </TableCell>
                <TableCell align="right">{props.card.answer}</TableCell>
                <TableCell align="right"><UpdateFormat time={props.card.updated}/></TableCell>
                <TableCell>
                    <Rating rating={props.card.grade}/>
                </TableCell>
                {props.edit &&
                    <TableCell>
                        <Button variant="contained" color="error" sx={{marginRight: '5px'}}
                                disabled={appStatus === 'loading'} onClick={onDeleteButtonClickHandler}
                        >DELETE</Button>
                        <Button variant="contained" color="success"
                                disabled={appStatus === 'loading'} onClick={onEditButtonClickHandler}>EDIT</Button>
                    </TableCell>
                }

            </TableRow>
        </>
    )

};

export default SingleCard;