import {TextField} from '@mui/material';
import React, {ChangeEvent, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../bll/store';
import s from './SearchCardBlock.module.css'
import {getSinglePackDataTC, SingleCardPackRequestDataType} from "../../../bll/packReducer";

const SearchCardBlock = () => {
    const [searchQuestion, setSearchQuestion] = useState<string>('')
    const [searchAnswer, setSearchAnswer] = useState<string>('')
    const dispatch = useAppDispatch()

    //Поиск по вопросу

    const packID = useAppSelector<string>(state => state.singlePackReducer.cardPackId)
    const searchQuestionHandle = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setSearchQuestion(e.currentTarget.value)
        if (searchQuestion.trim().length >= 0) {
            setTimeout(() => {
                // searchSettings.packName = searchName;
                // dispatch(getCardsPacksTableTC(searchSettings))
            }, 1500)
        }
    }
    const setSearchAnswerHandle = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setSearchAnswer(e.currentTarget.value)
        if (searchAnswer.trim().length >= 0) {
            setTimeout(() => {
                // searchSettings.packName = searchName;
                // dispatch(getCardsPacksTableTC(searchSettings))
            }, 1500)
        }
    }
    const onKeyPressQuestion = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            let data = {cardQuestion: searchQuestion, cardsPack_id: packID} as SingleCardPackRequestDataType
            dispatch(getSinglePackDataTC(data))
        }
    }
    const onKeyPressAnswer = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            let data = {cardAnswer: searchAnswer, cardsPack_id: packID} as SingleCardPackRequestDataType
            dispatch(getSinglePackDataTC(data))
        }
    }


    return (
        <div className={s.content}>
            <TextField id="outlined-basic" label="Search by question"
                       variant="outlined" sx={{width: '90%'}} size={'small'} onKeyPress={onKeyPressQuestion}
                       value={searchQuestion} onChange={searchQuestionHandle}/>
            <TextField id="outlined-basic" label="Search by answer"
                       variant="outlined" sx={{width: '90%'}} size={'small'}
                       value={searchAnswer} onChange={setSearchAnswerHandle} onKeyPress={onKeyPressAnswer}/>

        </div>
    );
};

export default SearchCardBlock;

