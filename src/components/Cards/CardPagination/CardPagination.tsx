import React, {useEffect} from 'react';
import Box from '@mui/material/Box';
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from '@mui/material';
import s from './CardPagination.module.css'
import { useAppDispatch, useAppSelector } from '../../../bll/store';
import {setCurrentPageAC, setPageCountAC} from '../../../bll/packReducer';
import {RequestStatusType} from "../../../bll/appReducers";

const CardPagination = () => {


    const dispatch = useAppDispatch()
    const cardTotalCount = useAppSelector<number | undefined>((state) => state.singlePackReducer.cardsTotalCount)
    const currentPage = useAppSelector<number | undefined>((state) => state.singlePackReducer.page)
    const pageCount = useAppSelector<number | undefined>((state) => state.singlePackReducer.pageCount)
    const appStatus = useAppSelector<RequestStatusType>((state)=>state.appReducer.status)

    let totalPages: number | undefined

    const getPagesForPagination = () => {

        totalPages = (cardTotalCount && pageCount && Math.ceil(cardTotalCount / pageCount))
        let pagesForPagination: number[] = []
        if (!totalPages) {
            return [1]
        }
        if (totalPages && totalPages < 11) {
            for (let i = 1; i <= totalPages; i++) {
                pagesForPagination.push(i)
            }
            return pagesForPagination
        } else {
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
    }

    const onSpanClickHandler = (page: number) => {
        appStatus !=='loading' && dispatch(setCurrentPageAC(page))
    }


    return (
        <div className={s.content}>
            <div className={s.pagination}>
                <span onClick={() => {
                    appStatus !=='loading' && dispatch(setCurrentPageAC(1))
                }}>{'<'}</span>
                {getPagesForPagination().map((p,i) => <span key={i} onClick={() => onSpanClickHandler(p)}
                                                          className={p === currentPage ? s.selected : s.span}>{p}</span>)}
                <span className={s.span} onClick={() => {
                    appStatus !=='loading' && cardTotalCount && totalPages && dispatch(setCurrentPageAC(totalPages))
                }}>{'>'}</span>
            </div>
            <SelectorNumberCardsForCard/>
        </div>
    );
};


const SelectorNumberCardsForCard = () => {



    const dispatch = useAppDispatch()
    const [pageAmount, setPageAmount] = React.useState(4);
    const appStatus = useAppSelector<RequestStatusType>((state)=>state.appReducer.status)

    useEffect(() => {
        dispatch(setCurrentPageAC(1))
        dispatch(setPageCountAC(pageAmount))
    }, [pageAmount, dispatch])


    const handleChange = (event: SelectChangeEvent) => {
        setPageAmount(Number(event.target.value));
    };


    return (
        <div className={s.selector}>
            <Box sx={{width: 80, margin: '10px 0 10px 0'}}>
                <FormControl fullWidth>
                    <InputLabel id="label">Pages</InputLabel>
                    <Select
                        value={String(pageAmount)}
                        onChange={handleChange}
                        size={"small"}
                        disabled={appStatus==='loading'}
                    >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                    </Select>
                </FormControl>
            </Box>

        </div>
    );
};

export default CardPagination;
