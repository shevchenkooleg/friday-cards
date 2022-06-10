import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import s from './CardsPacksTable.module.css'
import {Button, Link} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../bll/store";
import {CardPacksType, deleteCardsPackTC, SearchSettingsType} from "../../bll/cardPacksReducer";
import {prepareDataForSearchRequest} from "../../utils/dataPrepare/searchDataPrepare";
import {getSinglePackDataTC, setCardsPackTitleAC} from "../../bll/packReducer";
import {useNavigate} from "react-router-dom";


const COLUMNS = [
    {
        Header: 'Name',
        accessor: 'name',
    },
    {
        Header: 'Cards',
        accessor: 'cards',
    },
    {
        Header: 'Last Updated',
        accessor: 'last_updated',
    },
    {
        Header: 'Created by',
        accessor: 'created_by',
    },
    {
        Header: 'Action',
        accessor: 'actions'
    },

]

type PropsType = {
    id?: string
}

export const CardsPacksTable = (props: PropsType) => {

    const cardPacks = useAppSelector<CardPacksType[]>((state) => state.cardPacksReducer.cardPacks)
    const dispatch = useAppDispatch()
    const searchSettings = useAppSelector<SearchSettingsType>((state) => state.cardPacksReducer.searchSettings)
    const navigate = useNavigate()
    return (

        <div className={s.container}>
            <TableContainer component={Paper}>
                <Table
                    sx={{'&:last-child td, &:last-child th': {border: 0, textAlign: 'right'}}}>
                    <TableHead>
                        <TableRow>
                            {COLUMNS.map((c,i) => <TableCell key={i}>{c.Header}</TableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cardPacks.map((pack) => {
                            // let packTitle = pack.name
                            const onTitleClickHandler = () => {

                                dispatch(getSinglePackDataTC({cardsPack_id:pack._id, page: 1}))
                                dispatch(setCardsPackTitleAC(pack.name, pack._id))
                                navigate('/card-list')
                            }
                            const onDeleteButtonClickHandler = () => {
                                dispatch(deleteCardsPackTC(pack._id, prepareDataForSearchRequest(searchSettings, '', props.id)))
                            }
                            return (
                                <TableRow
                                    key={pack._id}
                                    sx={{'&:last-child td, &:last-child th': {border: 0, textAlign: 'right'}}}
                                >
                                    <TableCell component="th" scope="row" onClick={onTitleClickHandler}>
                                        <Link
                                            component="button"
                                            variant="body2"
                                        >
                                            {pack.name}
                                        </Link>
                                    </TableCell>

                                    <TableCell align="right">{pack.cardsCount}</TableCell>
                                    <TableCell align="right">{pack.updated}</TableCell>
                                    <TableCell align="right">{pack.user_name}</TableCell>
                                    <TableCell>
                                        <Button onClick={onDeleteButtonClickHandler}>Delete</Button>
                                        <Button>Edit</Button>
                                        <Button>Learn</Button>
                                    </TableCell>
                                </TableRow>)
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}


