
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../bll/store';
import {setMinMaxSearchValueAC} from "../../../bll/cardPacksReducer";

const DoubleRange = () => {

    const dispatch = useAppDispatch()
    const ninMaxValue = useAppSelector<number | number[]>((state)=>state.cardPacksReducer.searchSettings.minMax)
    const minAmount = useAppSelector<number | undefined>((state)=>state.cardPacksReducer.minCardsCount)
    const maxAmount = useAppSelector<number | undefined>((state)=>state.cardPacksReducer.maxCardsCount)

    const handleChange = (event: Event, value: number | number[]) => {
        dispatch(setMinMaxSearchValueAC(value))
    };

    return (
        <div>
            <h4>Number of cards</h4>
            <Box  sx={{ width: '70%' , margin: '0 auto'}}>
                <Slider
                    value={ninMaxValue}
                    min={minAmount}
                    step={1}
                    max={maxAmount}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    size={'medium'}
                />
            </Box>

        </div>
    );
};

export default DoubleRange;

