import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../bll/store';
import {setMinMaxSearchValueAC} from "../../../bll/cardPacksReducer";
import {RequestStatusType} from "../../../bll/appReducers";

const DoubleRange = () => {

    const dispatch = useAppDispatch()
    const ninMaxValue = useAppSelector<number | number[]>((state) => state.cardPacksReducer.searchSettings.minMax)
    const minAmount = useAppSelector<number | undefined>((state) => state.cardPacksReducer.minCardsCount)
    const maxAmount = useAppSelector<number | undefined>((state) => state.cardPacksReducer.maxCardsCount)
    const appStatus = useAppSelector<RequestStatusType>((state)=>state.appReducer.status)

    let [value, setValue] = useState(ninMaxValue)

    useEffect(() => {
        if (Number.isInteger(minAmount) && (minAmount !== undefined) && Number.isInteger(maxAmount) && (maxAmount !== undefined)) {
            dispatch(setMinMaxSearchValueAC([minAmount, maxAmount]))
        }
    }, [minAmount, maxAmount, dispatch])

    useEffect(() => {
        console.log('setValue effect')
        setValue(ninMaxValue)
    }, [ninMaxValue])


    const handleChangeUseState = (event: Event, value: number | number[]) => {
        setValue(value)
    };
    const handleChangeMinMax = () => {
        dispatch(setMinMaxSearchValueAC(value))
    }


    return (
        <div>
            <h4 style={{margin: '40px 0 10px 0'}}>Number of cards</h4>
            <Box sx={{width: '70%', margin: '0 auto'}}>
                <Slider
                    value={value}
                    min={minAmount}
                    step={1}
                    max={maxAmount}
                    onChange={handleChangeUseState}
                    onMouseUp={handleChangeMinMax}
                    valueLabelDisplay="auto"
                    size={'medium'}
                    disabled={appStatus==='loading'}
                />
            </Box>

        </div>
    );
};

export default DoubleRange;

