import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import s from './CardPacks.module.css'
import {Button} from "@mui/material";


const COLUMNS = [
    {
        Header: 'ID',
        accessor: 'id',
    },
    {
        Header: 'Last Name',
        accessor: 'last_name',
    },
    {
        Header: 'First Name',
        accessor: 'first_name',
    },
    {
        Header: 'Age',
        accessor: 'age',
    },
    {
        Header: 'Action',
        accessor: 'actions'
    },

]

const rows = [
    {id: 1, lastName: 'Snow', firstName: 'Jon', age: 35},
    {id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42},
    {id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45},
    {id: 4, lastName: 'Stark', firstName: 'Arya', age: 16},
    {id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null},
    {id: 6, lastName: 'Melisandre', firstName: null, age: 150},
    {id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44},
    {id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36},
    {id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65},
];

export const CardsPacksTable = () => {
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
                        {rows.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{'&:last-child td, &:last-child th': { border: 0, textAlign: 'right' }}}
                            >
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell align="right">{row.lastName}</TableCell>
                                <TableCell align="right">{row.firstName}</TableCell>
                                <TableCell align="right">{row.age}</TableCell>
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

