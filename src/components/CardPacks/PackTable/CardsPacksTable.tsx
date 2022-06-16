import React, {useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import s from './CardsPacksTable.module.css'
import {useAppDispatch, useAppSelector} from "../../../bll/store";
import {CardPacksType, getCardsPacksTableTC, SearchSettingsType} from "../../../bll/cardPacksReducer";
import {prepareDataForSearchRequest} from "../../../utils/dataPrepare/searchDataPrepare";
import {SortButton} from "../SortButton/SortButton";
import SinglePack from "../SinglePack/SinglePack";
import {Loader} from "../../common/Loader/Loader";
import {RequestStatusType} from "../../../bll/appReducers";


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
    //стейт для модалки удаления Пака

    const cardPacks = useAppSelector<CardPacksType[]>((state) => state.cardPacksReducer.cardPacks)
    const dispatch = useAppDispatch()
    const searchSettings = useAppSelector<SearchSettingsType>((state) => state.cardPacksReducer.searchSettings)
    const appStatus = useAppSelector<RequestStatusType>((state)=>state.appReducer.status)

//Сортировка
    const sortButtonHandler = (newDirection: string, accessor: string) => {
        if (newDirection === '1') {
            setSortDir({...sortDir, direction: newDirection})
            dispatch(getCardsPacksTableTC(prepareDataForSearchRequest(searchSettings, {sortType: '0' + accessor})))
        } else if (newDirection === '0') {
            setSortDir({...sortDir, direction: newDirection})
            dispatch(getCardsPacksTableTC(prepareDataForSearchRequest(searchSettings, {sortType: '1' + accessor})))
        } else if (newDirection === '') {
            setSortDir({...sortDir, direction: ''})
            dispatch(getCardsPacksTableTC(prepareDataForSearchRequest(searchSettings, {sortType: 'delete'})))
        }
    }

    return (

        <>
            {appStatus === 'loading' && <Loader/>}
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
                            {cardPacks.map((pack, i) => <SinglePack key={`${pack._id}+${i}`} pack={pack} id={props.id}/>)}
                        </TableBody>
                    </Table>
                </TableContainer>

            </div>

        </>

    );
}


