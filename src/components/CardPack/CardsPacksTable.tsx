import React, {useState} from 'react';
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
import {CardPacksType, deleteCardsPackTC, getCardsPacksTableTC, SearchSettingsType} from "../../bll/cardPacksReducer";
import {prepareDataForSearchRequest} from "../../utils/dataPrepare/searchDataPrepare";
import {setCardsPackTitleAC} from "../../bll/packReducer";
import {useNavigate} from "react-router-dom";
import {UpdateFormat} from "../common/UpdateData_Format/UpdateFormat";
import {SortButton} from "./SortButton";


const COLUMNS = [
    {
        Header: 'Name',
        accessor: 'name',
        type: 'sorted',
    },
    {
        Header: 'Cards',
        accessor: 'cardsCount',
        type: 'sorted',
    },
    {
        Header: 'Last Updated',
        accessor: 'updated',
        type: 'sorted',
    },
    {
        Header: 'Created by',
        accessor: 'created_by',
        type: 'noSorted',
    },
    {
        Header: 'Action',
        accessor: 'actions',
        type: 'noSorted',
    },

]

type PropsType = {
    id?: string
}

export const CardsPacksTable = (props: PropsType) => {
    const [sortDir, setSortDir] = useState({direction: ''})

    const cardPacks = useAppSelector<CardPacksType[]>((state) => state.cardPacksReducer.cardPacks)
    const dispatch = useAppDispatch()
    const searchSettings = useAppSelector<SearchSettingsType>((state) => state.cardPacksReducer.searchSettings)
    const navigate = useNavigate()

//Сортировка
    const sortButtonHandler = (newDirection: string, accessor: string) => {
        if (newDirection === '1') {
            setSortDir({...sortDir, direction: newDirection})
            dispatch(getCardsPacksTableTC(prepareDataForSearchRequest(searchSettings, {sortType: '0' +accessor})))
        } else if (newDirection === '0') {
            setSortDir({...sortDir, direction: newDirection})
            dispatch(getCardsPacksTableTC(prepareDataForSearchRequest(searchSettings, {sortType: '1'+accessor})))
        } else if (newDirection === '') {
            setSortDir({...sortDir, direction: ''})
            dispatch(getCardsPacksTableTC(prepareDataForSearchRequest(searchSettings, {sortType: 'delete'})))
        }
    }

    return (

        <div className={s.container}>
            <TableContainer component={Paper}>
                <Table
                    sx={{'&:last-child td, &:last-child th': {border: 0, textAlign: 'right'}}}>
                    <TableHead>
                        <TableRow>

                            {COLUMNS.map((c, i) => <TableCell key={i}
                                                              className={c.type === 'sorted' ? s.sortedHeader : ''}>
                                <SortButton header={c.Header}
                                            accessor={c.accessor}
                                            type={c.type}
                                            sortDir={sortDir}
                                            onClick={sortButtonHandler}/>
                            </TableCell>)}

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cardPacks.map((pack) => {
                            const onTitleClickHandler = () => {
                                dispatch(setCardsPackTitleAC(pack.name, pack._id))
                                navigate(`/card-list/${pack._id}`)
                            }
                            const onDeleteButtonClickHandler = () => {
                                dispatch(deleteCardsPackTC(pack._id, prepareDataForSearchRequest(searchSettings, {user_id: props.id})))
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
                                    <TableCell align="right"><UpdateFormat time={pack.updated}/></TableCell>
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


