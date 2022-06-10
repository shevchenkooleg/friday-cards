import {AppThunk} from "./store";
import {CardsAPI} from "../api/cards-api";
import {setAppError, setAppStatus} from "./appReducers";

export type SingleCardPackRequestDataType = {
    cardAnswer?: string
    cardsQuestion?: string
    cardsPack_id?: string
    min?: number
    max?: number
    sortCards?: string
    page?: number
    pageCount?: number
}
export type CardsType = {
    answer: string
    answerImg: string
    answerVideo: string
    cardsPack_id: string
    comments: string
    created: string
    grade: 0
    more_id: string
    question: string
    questionImg: string
    questionVideo: string
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    __v: number
    _id: string
}
export type InitialStateType = {
    cardPackId: string
    title: string
    cards: CardsType[] | undefined
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    packUserId: string
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}
export type ActionsType =
    CardsActionACType |
    setCardsPackTitleAC
export const initialState: InitialStateType = {title: ''} as InitialStateType

export const packReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "SINGLE-PACK-REDUCER/GET-PACK": {
            const newState = action.data
            return {...state, ...newState}
        }
        case "SINGLE-PACK-REDUCER/SET-NAME": {
            return {...state, title: action.title, cardPackId: action.packID}
        }

        default:
            return {...state}
    }

}


//ACTIONS

export type CardsActionACType = ReturnType<typeof getCardsActionAC>
export const getCardsActionAC = (data: InitialStateType) => ({
    type: 'SINGLE-PACK-REDUCER/GET-PACK',
    data,
} as const)
export type setCardsPackTitleAC = ReturnType<typeof setCardsPackTitleAC>
export const setCardsPackTitleAC = (title: string, packID: string) => ({
    type: 'SINGLE-PACK-REDUCER/SET-NAME',
    title,
    packID
} as const)

//THUNK
export const getSinglePackDataTC = (data: SingleCardPackRequestDataType): AppThunk => {
    return async (dispatch) => {
        try {
            dispatch(setAppStatus('loading'))
            let response = await CardsAPI.getSingleCardPack(data)
            dispatch(getCardsActionAC(response.data))

            console.log(response)
        } catch (error: any) {
            dispatch(setAppError(error.response.data.error))
        } finally {
            dispatch(setAppStatus('idle'))
        }
    }
}