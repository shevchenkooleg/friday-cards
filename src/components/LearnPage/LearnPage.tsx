import React, {useEffect, useState} from 'react';
import s from './LearnPage.module.css'
import {Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";
import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../../bll/store";
import {CardsType, DataForPlotType, getPackInformation, gradeCardTC} from "../../bll/packReducer";
import {PATH} from '../../App';
import {AxiosResponse} from "axios";
import {setAppError} from "../../bll/appReducers";
import Modal from "../Modal_windows/Modal";
import { Chart } from './Chart/Chart';
import { prepareDataForPlot } from '../../utils/plotResults/plotResults';

let sessionResult:Array<number> = []
let dataForPlot: DataForPlotType = []

const LearnPage = () => {

    const packId = useAppSelector<string>((state)=>state.singlePackReducer.cardPackId)
    const packStatistic = useAppSelector<number[]>((state)=>state.singlePackReducer.packStatistic)
    const cardsArr = useAppSelector<CardsType[]>((state) => state.singlePackReducer.randomCards)
    const dispatch = useAppDispatch()
    const [card, setCard] = useState<CardsType>({
        _id: 'fake',
        cardsPack_id: '',

        answer: 'answer fake',
        question: 'question fake',
        grade: 0,
        shots: 0,

        type: '',
        rating: 0,
        more_id: '',

        created: '',
        updated: '',
    });

    const [show, setShow] = useState(false)
    const [grade, setGrade] = useState(1)
    const [first, setFirst] = useState(true);
    const [styleHover, setStyleHover] = useState(false)
    const [showResults, setShowResults] = useState(false)
    const [showPackStatistic, setShowPackStatistic] = useState(false)
    const [pageCount, setPageCount] = useState(1)
    const [totalPageCount, setTotalPageCount] = useState(0)
    const navigate = useNavigate()


    const getCard = () => {
        return (cardsArr.splice(Math.floor(Math.random() * cardsArr.length), 1))
    }

    useEffect(()=>{
        if (cardsArr.length > 0 && first) {
            setTotalPageCount(cardsArr.length)
            setFirst(false)
        }
    }, [cardsArr, first])


    useEffect(() => {
        // console.log('LearnContainer useEffect');
        setGrade(0)

        if (cardsArr.length > 0) {
            let [card] = getCard()
            setCard(card);
        } else {
            dispatch(setAppError('Not enough cards to learning session'))
            navigate(PATH.CARD.PACKS)
        }



        return () => {
            // console.log('LearnContainer useEffect off');
        }
    }, [cardsArr]);



    const onCheckClickHandler = () => {
        setShow(true)
    }

    const onNextClickHandler = () => {
        let promise = dispatch(gradeCardTC({card_id: card._id, grade: grade}))
        promise.then((response:AxiosResponse)=>{
            console.log(response)
            if (response.status){
                sessionResult.push(+grade)
                if (cardsArr.length > 0) {
                    console.log(sessionResult)
                    let [card] = getCard()
                    setCard(card)
                    setShow(false)
                    setGrade(0)
                    setPageCount(pageCount + 1)
                } else {
                    setShowResults(true)
                    console.log(sessionResult)
                    dataForPlot = prepareDataForPlot(sessionResult)
                }
            }
        })
    }

    const onRadioClickHandler = (e: any) => {
        setGrade(e.target.value)
    }

    const okButtonClickHandler = () => {
        setShowResults(false)
        setShowPackStatistic(false)
        navigate(PATH.CARD.PACKS)
        sessionResult=[]
    }

    const spanStyleResult = (hover:boolean) => {
        setStyleHover(hover)
    }
    const onMoreInformationClickHandler = () => {
        console.log('onMoreInformationClickHandler')
        setShowResults(false)
        let promise = dispatch(getPackInformation({cardsPack_id:packId}))
        promise.then(()=>{
            setShowPackStatistic(true)
        })
    }

    return (
        <>
            <Modal show={showResults} setShow={setShowResults}>
                <p className={s.titleModal}>Results of current session:</p>
                <div className={s.insideModal}>
                    <div className={s.chart}>
                        <Chart dataForPlot={dataForPlot}/>
                    </div>
                    <div>
                        <p className={s.titleModal}>Learn <span
                            className={styleHover ? s.textModalActive : s.textModal}
                            onClick={onMoreInformationClickHandler}
                            onMouseOver={()=>spanStyleResult(true)}
                            onMouseLeave={()=>spanStyleResult(false)}
                        >more information</span> about this pack</p>
                    </div>
                    <Button onClick={okButtonClickHandler} variant="contained"
                            color="success">Got it</Button>
                </div>
            </Modal>
            <Modal show={showPackStatistic} setShow={setShowPackStatistic}>
                <p className={s.titleModal}>Results for whole pack:</p>
                <div className={s.insideModal}>
                    <div className={s.chart}>
                        <Chart dataForPlot={packStatistic}/>
                    </div>
                    <Button onClick={okButtonClickHandler} variant="contained"
                            color="success">Got it</Button>
                </div>
            </Modal>
            <div className={s.container}>
                <h2>LearnPage</h2>
                <div className={s.question}>
                    Question: {card.question}
                </div>
                <Button onClick={onCheckClickHandler} disabled={show} size={"small"} variant={"outlined"}
                        sx={{width: '100px', margin: '0 auto'}}>Check</Button>

                {show &&
                    <>
                        <div className={s.question}>
                            Answer: {card.answer}
                        </div>

                        <FormControl sx={{margin: '0 auto'}}>
                            <FormLabel sx={{fontSize: '20px'}} id="grade">Please, rate your answer</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="grade-radio-buttons-group"
                                name="grade-radio-buttons-group"
                                sx={{margin: '10px 0 10px 0'}}
                            >
                                <FormControlLabel onClick={(e) => {
                                    onRadioClickHandler(e)
                                }} value="1" control={<Radio/>} label="Didn't know"/>
                                <FormControlLabel onClick={(e) => {
                                    onRadioClickHandler(e)
                                }} value="2" control={<Radio/>} label="Forgot"/>
                                <FormControlLabel onClick={(e) => {
                                    onRadioClickHandler(e)
                                }} value="3" control={<Radio/>} label="Thought to long"/>
                                <FormControlLabel onClick={(e) => {
                                    onRadioClickHandler(e)
                                }} value="4" control={<Radio/>} label="Confused"/>
                                <FormControlLabel onClick={(e) => {
                                    onRadioClickHandler(e)
                                }} value="5" control={<Radio/>} label="Knew"/>
                            </RadioGroup>
                        </FormControl>
                        <Button onClick={onNextClickHandler} sx={{margin: '10px 0 0 0'}} variant={"outlined"}
                                size={'small'} disabled={grade===0}>Next</Button>
                    </>
                }
                <div className={s.counter}>
                    question: {pageCount} of {totalPageCount}
                </div>
            </div>
        </>

    )
}

export default LearnPage;