import {TextField} from '@mui/material';
import React, {ChangeEvent, useEffect, useState} from 'react';
import {useAppDispatch} from '../../../bll/store';
import s from './SearchCardBlock.module.css'
import {
    setCardAnswerForSearchRequestAC,
    setCardQuestionForSearchRequestAC,
} from "../../../bll/packReducer";
import { useDebounce } from 'use-debounce';

const SearchCardBlock = () => {

    const [searchQuestion, setSearchQuestion] = useState<string>('')
    const [searchAnswer, setSearchAnswer] = useState<string>('')
    const dispatch = useAppDispatch()
    const [debouncedSearchQuestionValue, func1] = useDebounce<string>(searchQuestion, 700)
    const [debouncedSearchAnswerValue, func2] = useDebounce<string>(searchAnswer, 700)

    //Поиск по вопросу

    useEffect(() => {
        dispatch(setCardQuestionForSearchRequestAC(debouncedSearchQuestionValue))
    }, [debouncedSearchQuestionValue, dispatch])
    useEffect(() => {
        dispatch(setCardAnswerForSearchRequestAC(debouncedSearchAnswerValue))
    }, [debouncedSearchAnswerValue, dispatch])

    const setSearchQuestionHandle = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setSearchQuestion(e.currentTarget.value)
    }
    const setSearchAnswerHandle = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setSearchAnswer(e.currentTarget.value)
    }

    const requestSearchByQuestion = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (searchQuestion.trim().length >= 0) {
                dispatch(setCardQuestionForSearchRequestAC(searchQuestion))
            }
        }
    }

    const requestSearchByAnswer = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (searchAnswer.trim().length >= 0) {
                dispatch(setCardAnswerForSearchRequestAC(searchAnswer))
            }
        }
    }

    return (
        <div className={s.content}>
            <TextField id="outlined-basic" label="Search by question"
                       variant="outlined" sx={{width: '90%'}} size={'small'} onKeyPress={requestSearchByQuestion}
                       value={searchQuestion} onChange={setSearchQuestionHandle}/>
            <TextField id="outlined-basic" label="Search by answer"
                       variant="outlined" sx={{width: '90%'}} size={'small'}
                       value={searchAnswer} onChange={setSearchAnswerHandle} onKeyPress={requestSearchByAnswer}/>

        </div>
    );
};

export default SearchCardBlock;

