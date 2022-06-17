import React, {useState} from 'react';
import {
    learnPackModeTC,
    RandomSettingsType,
    setCardsPackTitleAC,
    SinglePackSearchSettingsType
} from "../../../bll/packReducer";
import {CardPacksType, deleteCardsPackTC, SearchSettingsType} from "../../../bll/cardPacksReducer";
import {prepareDataForSearchRequest} from "../../../utils/dataPrepare/searchDataPrepare";
import Modal from "../../Modal_windows/Modal";
import s from "../PackTable/CardsPacksTable.module.css";
import {Button, Link} from "@mui/material";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {UpdateFormat} from "../../common/UpdateData_Format/UpdateFormat";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../bll/store";
import {RequestStatusType} from "../../../bll/appReducers";
import { prepareSinglePackDataForSearchRequest } from '../../../utils/dataPrepare/searchSinglePackDataPrepare';

type SinglePackPropsType = {
    pack: CardPacksType
    id?: string
}

const SinglePack = (props:SinglePackPropsType) => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [show, setShow] = useState<boolean>(false)
    const searchSettings = useAppSelector<SearchSettingsType>((state) => state.cardPacksReducer.searchSettings)
    const appStatus = useAppSelector<RequestStatusType>((state) => state.appReducer.status)
    const userId = useAppSelector<string>((state) => state.profileReducer.userData.id)
    const singlePackSearchSettings = useAppSelector<SinglePackSearchSettingsType>((state)=>state.singlePackReducer.searchSettings)
    const randomSettings = useAppSelector<RandomSettingsType>((state)=>state.singlePackReducer.randomSettings)

    const onTitleClickHandler = () => {
        dispatch(setCardsPackTitleAC(props.pack.name, props.pack._id))
        navigate(`/card-list/${props.pack._id}`)
    }
    const onClickEditButton = () => {
        dispatch(setCardsPackTitleAC(props.pack.name, props.pack._id))
        navigate(`/card-list-edit/${props.pack._id}`)
    }
    const onDeleteButtonClickHandler = () => {
        setShow(true)
    }
    const yesButtonClickHandler = () => {
        dispatch(deleteCardsPackTC(props.pack._id, prepareDataForSearchRequest(searchSettings, {user_id: props.id})))
        setShow(false)
    }
    const onClickLearnButtonHandler = () => {
        dispatch(learnPackModeTC(prepareSinglePackDataForSearchRequest(singlePackSearchSettings, {cardsPack_id: props.pack._id}), randomSettings))
        navigate('/learn/')// smartRandom()
    }


    return (
        <>
            <Modal show={show} setShow={setShow}>
                <p className={s.titleModal}>Do wont to <span
                    className={s.textModal}>DELETE</span> pack list?</p>
                <div className={s.insideModal}>
                    <Button onClick={yesButtonClickHandler} variant="contained"
                            color="success">Yes</Button>
                    <Button onClick={() => setShow(false)} variant="outlined"
                            color="error">No</Button>
                </div>
            </Modal>
            <TableRow
                key={props.pack._id}
                sx={{'&:last-child td, &:last-child th': {border: 0, textAlign: 'right'}}}
            >
                <TableCell component="th" scope="row" onClick={onTitleClickHandler}>
                    {(appStatus !== 'loading')
                        ? <Link
                            component="button"
                            variant="body2"
                        >
                            {props.pack.name}
                        </Link>
                        : <span>{props.pack.name}</span>}
                </TableCell>

                <TableCell align="right">{props.pack.cardsCount}</TableCell>
                <TableCell align="right"><UpdateFormat time={props.pack.updated}/></TableCell>
                <TableCell align="right">{props.pack.user_name}</TableCell>
                <TableCell>
                    {userId === props.pack.user_id && <Button onClick={onDeleteButtonClickHandler}
                                                        disabled={appStatus === 'loading'}>Delete</Button>}
                    {userId === props.pack.user_id &&
                        <Button disabled={appStatus === 'loading'} onClick={onClickEditButton}>Edit</Button>}
                    <Button disabled={appStatus === 'loading'} onClick={onClickLearnButtonHandler}>Learn</Button>
                </TableCell>
            </TableRow>
        </>
    )
};

export default SinglePack;