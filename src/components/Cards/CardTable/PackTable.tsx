import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../bll/store";
import {CardsType, deleteCardTC, getSinglePackDataTC} from "../../../bll/packReducer";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {Rating} from "../../Raiting/Raiting";
import {UpdateFormat} from "../../common/UpdateData_Format/UpdateFormat";
import {SortButton} from "../../CardPack/SortButton";
import {prepareSingleDataForSearchRequest} from "../../../utils/dataPrepare/searchSinglePackDataPrepare";
import {Button} from "@mui/material";
import s from "../../CardPack/CardsPacksTable.module.css";
import Modal from "../../Modal_windows/Modal";


interface IPackTable {
    edit?: boolean
}

const COLUMNS = [
    {
        Header: 'Question',
        accessor: 'question',
        type: 'sorted',
    },
    {
        Header: 'Answer',
        accessor: 'answer',
        type: 'noSorted',
    },
    {
        Header: 'Last update',
        accessor: 'updated',
        type: 'sorted',
    },
    {
        Header: 'Grade',
        accessor: 'grade',
        type: 'sorted',
    },

]

const PackTable: React.FC<IPackTable> = ({edit}) => {


    const card = useAppSelector<CardsType[] | undefined>(state => state.singlePackReducer.cards)
    const [sortDir, setSortDir] = useState({direction: ''})
    const dispatch = useAppDispatch()
    const packID = useAppSelector<string>(state => state.singlePackReducer.cardPackId)
    //Сортировка
    const sortButtonHandler = (newDirection: string, accessor: string) => {
        if (newDirection === '1') {
            setSortDir({...sortDir, direction: newDirection})
            dispatch(getSinglePackDataTC(prepareSingleDataForSearchRequest({
                sortType: '0' + accessor,
                cardsPack_id: packID
            })))
        } else if (newDirection === '0') {
            setSortDir({...sortDir, direction: newDirection})
            dispatch(getSinglePackDataTC(prepareSingleDataForSearchRequest({
                sortType: '1' + accessor,
                cardsPack_id: packID
            })))
        } else if (newDirection === '') {
            setSortDir({...sortDir, direction: ''})
            dispatch(getSinglePackDataTC(prepareSingleDataForSearchRequest({sortType: 'delete', cardsPack_id: packID})))
        }
    }
    const [show, setShow] = useState<boolean>(false)
    return (
        <div>
            <TableContainer component={Paper}>
                <Table
                    sx={{'&:last-child td, &:last-child th': {border: 0, textAlign: 'right'}}}>
                    <TableHead>
                        <TableRow>
                            {COLUMNS.map((c) => <TableCell>
                                <SortButton accessor={c.accessor} header={c.Header} type={c.type} sortDir={sortDir}
                                            onClick={sortButtonHandler}
                                />
                            </TableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {card?.map((c) => {

                            const onDeleteButtonClickHandler = () => {
                                setShow(true)
                            }
                            const yesButtonClickHandler = () => {
                                dispatch(deleteCardTC(c._id))
                                setShow(false)
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
                                    key={c._id}
                                    sx={{'&:last-child td, &:last-child th': {border: 0, textAlign: 'right'}}}
                                >
                                    <TableCell component="th" scope="row">
                                        {c.question}
                                    </TableCell>
                                    <TableCell align="right">{c.answer}</TableCell>
                                    <TableCell align="right"><UpdateFormat time={c.updated}/></TableCell>
                                    <TableCell>
                                        <Rating rating={c.grade}/>
                                    </TableCell>
                                    {edit &&
                                        <TableCell>
                                            <Button variant="contained" color="error" sx={{marginRight: '5px'}}
                                                    onClick={onDeleteButtonClickHandler}
                                            >DELETE</Button>
                                            <Button variant="contained" color="success">EDIT</Button>
                                        </TableCell>
                                    }

                                </TableRow>
                                </>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>

    );
};

export default PackTable;