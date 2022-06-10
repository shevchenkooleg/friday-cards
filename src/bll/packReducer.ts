import {AppThunk} from "./store";
import {CardsAPI} from "../api/cards-api";
import {setAppError, setAppStatus} from "./appReducers";

export type SingleCardPackRequestDataType = {
    cardAnswer?: string
    cardsQuestion?: string
    cardsPack_id: string
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
    token?: string
    tokenDeathTime?: number
}
export type AddCardDataType = {
    card: {
        cardsPack_id: string
        question?: string
        answer?: string
        garde?: number
        shots?: number
        rating?: number
        answerImg?: string
        questionImg?: string
        questionVideo?: string
        answerVideo?: string
        type?: string
    }
}

const initialState: InitialStateType = {
    title: '',
    cardPackId: '',
    cards: [],
    cardsTotalCount: 0,
    maxGrade: 0,
    minGrade: 0,
    packUserId: '',
    page: 1,
    pageCount: 1,
}
export type ActionsType =
    CardsActionACType |
    SetCardsPackTitleAC |
    SetCurrentPageACType |
    SetPageAmountACType
// searchByQuestionACType
// export const initialState: InitialStateType = {title: ''} as InitialStateType

export const packReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        // case "SINGLE-PACK-REDUCER/SEARCH-BY-QUESTION": {
        //     return { ...state, cards: state.cards?.map((c)=>)}

        case "SINGLE-PACK-REDUCER/GET-PACK": {
            const newState = action.data
            return {...state, ...newState}
        }
        case "SINGLE-PACK-REDUCER/SET-NAME": {
            return {...state, title: action.title, cardPackId: action.packID}
        }
        case "SINGLE-PACK-REDUCER/SET-CURRENT-PAGE": {
            return {...state, page: action.page}
        }
        case "SINGLE-PACK-REDUCER/SET-PAGE-AMOUNT": {
            return {...state, pageCount: action.pageAmount}
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
export type SetCardsPackTitleAC = ReturnType<typeof setCardsPackTitleAC>
export const setCardsPackTitleAC = (title: string, packID: string) => ({
    type: 'SINGLE-PACK-REDUCER/SET-NAME',
    title,
    packID
} as const)
export type SetCurrentPageACType = ReturnType<typeof setCurrentPageAC>
export const setCurrentPageAC = (page: number) => {
    return {
        type: 'SINGLE-PACK-REDUCER/SET-CURRENT-PAGE',
        page
    } as const
}
export type SetPageAmountACType = ReturnType<typeof setPageAmountAC>
export const setPageAmountAC = (pageAmount: number) => {
    return {
        type: 'SINGLE-PACK-REDUCER/SET-PAGE-AMOUNT',
        pageAmount
    } as const
}

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

export const addCardTC = (data: AddCardDataType): AppThunk => {
    return async (dispatch) => {
        try {
            dispatch(setAppStatus('loading'))
            let response = await CardsAPI.addCard(data)
            console.log(response.data)
            dispatch(getSinglePackDataTC({cardsPack_id: data.card.cardsPack_id}))

        } catch (error: any) {
            dispatch(setAppError(error.response.data.error))
        }
    }
}