import React, {useEffect} from 'react';
import Box from '@mui/material/Box';
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from '@mui/material';
import s from './Pagination.module.css'
import {useAppDispatch, useAppSelector} from "../../bll/store";
import {
    getCardsPacksTableTC,
    SearchSettingsType,
    setCurrentPageAC, setPagesAmountAC
} from "../../bll/cardPacksReducer";
import { prepareDataForSearchRequest } from '../../utils/dataPrepare/searchDataPrepare';

const Pagination = () => {



    const dispatch = useAppDispatch()
    const searchSettings = useAppSelector<SearchSettingsType>((state)=>state.cardPacksReducer.searchSettings)
    const searchSettingsCurrentPage = useAppSelector<number>((state)=>state.cardPacksReducer.searchSettings.page)
    const cardPacksTotalCount = useAppSelector<number | undefined>((state) => state.cardPacksReducer.cardPacksTotalCount)
    const currentPage = useAppSelector<number | undefined>((state) => state.cardPacksReducer.page)
    const pageCount = useAppSelector<number | undefined>((state) => state.cardPacksReducer.pageCount)

    useEffect(()=>{
        dispatch(getCardsPacksTableTC(prepareDataForSearchRequest(searchSettings)))
    },[dispatch, searchSettingsCurrentPage, pageCount])
    //
    // useEffect(()=>{
    //     dispatch(setCurrentPageAC(1))
    // },[pageCount, dispatch])

    let totalPages: number | undefined

    const getPagesForPagination = () => {
        totalPages = (cardPacksTotalCount && pageCount && Math.ceil(cardPacksTotalCount / pageCount))
        let pagesForPagination: number[] = []
        if (currentPage && currentPage < 6) {
            for (let i = 1; i <= 11; i++) {
                pagesForPagination.push(i)
            }
        } else if (currentPage && totalPages && (totalPages - currentPage) < 6) {

            for (let i = totalPages - 10; i < totalPages + 1; i++) {
                pagesForPagination.push(i)
            }
        } else if (currentPage) {
            for (let i = currentPage - 5; i < currentPage + 6; i++) {
                pagesForPagination.push(i)
            }
        }
        return pagesForPagination
    }

    const onSpanClickHandler = (page: number) => {
        dispatch(setCurrentPageAC(page))
    }


    return (
        <div className={s.content}>
            <div className={s.pagination}>
                <span onClick={()=>{dispatch(setCurrentPageAC(1))}}>{'<'}</span>
                {getPagesForPagination().map((p)=><span onClick={()=>onSpanClickHandler(p)} className={p === currentPage ? s.selected : ''}>{p}</span>)}
                <span onClick={()=>{cardPacksTotalCount && totalPages && dispatch(setCurrentPageAC(totalPages))}}>{'>'}</span>
            </div>
            <SelectorNumberCards/>
        </div>
    );
};


const SelectorNumberCards = () => {

    const dispatch = useAppDispatch()
    const [pageAmount, setPageAmount] = React.useState(10);

    useEffect(()=>{
        dispatch(setCurrentPageAC(1))
        dispatch(setPagesAmountAC(pageAmount))
    }, [pageAmount, dispatch])


    const handleChange = (event: SelectChangeEvent) => {
        setPageAmount(Number(event.target.value));
    };


    return (
        <div className={s.selector}>
            <Box sx={{width: 80, margin: '10px 0 10px 0'}} >
                <FormControl fullWidth>
                    <InputLabel id="label">Pages</InputLabel>
                    <Select
                        value={String(pageAmount)}
                        onChange={handleChange}
                        size={"small"}
                    >
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                    </Select>
                </FormControl>
            </Box>

        </div>
    );
};

export default Pagination;
