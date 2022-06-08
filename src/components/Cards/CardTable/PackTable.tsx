import React from 'react';
import {useAppSelector} from "../../../bll/store";
import {CardsType} from "../../../bll/packReducer";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {Rating} from "../../Raiting/Raiting";



const COLUMNS = [
    {
        Header: 'Question',
        accessor: 'question',
    },
    {
        Header: 'Answer',
        accessor: 'answer',
    },
     {
        Header: 'Last update',
        accessor: 'last_update',
    },
    {
        Header: 'Grade',
        accessor: 'grade',
    },

]

const PackTable = () => {


    const card = useAppSelector<CardsType[]|undefined>(state => state.singlePackReducer.cards)
    return (
        <div>
            <TableContainer component={Paper}>
                <Table
                    sx={{'&:last-child td, &:last-child th': {border: 0, textAlign: 'right'}}}>
                    <TableHead>
                        <TableRow>
                            {COLUMNS.map((c) => <TableCell>{c.Header}</TableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {card?.map((c)=>{

                            return (
                                <TableRow
                                    key={c._id}
                                    sx={{'&:last-child td, &:last-child th': {border: 0, textAlign: 'right'}}}
                                >
                                    <TableCell component="th" scope="row" >
                                        {c.question}
                                    </TableCell>
                                    <TableCell align="right">{c.answer}</TableCell>
                                    <TableCell align="right">{c.updated}</TableCell>
                                    <TableCell align="right">
                                        <Rating rating={c.grade}/>
                                    </TableCell>

                                </TableRow>)
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>

    );
};

export default PackTable;