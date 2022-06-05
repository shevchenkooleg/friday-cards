import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import s from './CardsPacksTable.module.css'
import {Button} from "@mui/material";
import {useAppSelector} from "../../bll/store";
import {CardPacksType} from "../../bll/cardReducer";


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

export const CardsPacksTable = () => {

    const cardPacks = useAppSelector<CardPacksType[]>((state)=> state.cardReducer.cardPacks)

    return (

        <div className={s.container}>
            <TableContainer component={Paper}>
                <Table
                       sx={{'&:last-child td, &:last-child th': { border: 0, textAlign: 'right' }}}>
                    <TableHead>
                        <TableRow>
                            {COLUMNS.map((c) => <TableCell>{c.Header}</TableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cardPacks.map((pack) => (
                            <TableRow
                                key={pack._id}
                                sx={{'&:last-child td, &:last-child th': { border: 0, textAlign: 'right' }}}
                            >
                                <TableCell component="th" scope="row">
                                    {pack.name}
                                </TableCell>
                                <TableCell align="right">{pack.cardsCount}</TableCell>
                                <TableCell align="right">{pack.updated}</TableCell>
                                <TableCell align="right">{pack.user_name}</TableCell>
                                <TableCell>
                                    <Button>Delete</Button>
                                    <Button>Edit</Button>
                                    <Button>Learn</Button>
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

