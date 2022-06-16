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
    cards: CardsType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    packUserId: string
    page: number
    pageCount: number
    token?: string
    tokenDeathTime?: number
    searchSettings: SinglePackSearchSettingsType
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
export type EditCardDataType = {
    card: {
        _id: string
        question?: string | undefined
        answer?: string | undefined
    }
}

export type SinglePackSearchSettingsType = {
    cardAnswer?: string
    cardQuestion?: string
    cardsPack_id: string
    min?: number
    max?: number
    sortCards?: string
    page?: number
    pageCount?: number
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
    searchSettings: {
        cardAnswer: '',
        cardQuestion: '',
        cardsPack_id: '',
        // min: 1,
        max: 6,
        sortCards: '',
        page: 1,
        pageCount: 4,
    }
}


export type ActionsType =
    SetCardsDataACType |
    SetCardsPackTitleAC |
    SetPackIdACType |
    SetCurrentPageACType |
    SetPageCountACType |
    SetCardQuestionForSearchRequestACType |
    SetCardAnswerForSearchRequestACType |
    deleteCardACType |
    editCardACType


export const packReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "SINGLE-PACK-REDUCER/SET-CARDS-DATA": {
            const newState = action.data
            return {
                ...state, ...newState,
                searchSettings: {
                    ...state.searchSettings,
                    min: action.data.minGrade,
                    max: action.data.maxGrade,
                    page: action.data.page,
                    pageCount: action.data.pageCount
                }
            }
        }
        case "SINGLE-PACK-REDUCER/DELETE-CARD": {
            return {...state, cards: state.cards?.filter(card => card._id !== action.id)}
        }
        // case "SINGLE-PACK-REDUCER/EDIT-CARD": {
        //     return {
        //         ...state, cards:
        //             state.cards?.map((card) =>
        //                 card._id === action.id ? {...card, question: action.question, answer: action.answer} : {...card})
        //         }
        // }

        case "SINGLE-PACK-REDUCER/SET-NAME": {
            return {
                ...state,
                title: action.title,
                cardPackId: action.packID,
                searchSettings: {...state.searchSettings, cardsPack_id: action.packID}
            }
        }
        case "SINGLE-PACK-REDUCER/SET-PACK-ID": {
            return {
                ...state, cardPackId: action.packID,
                searchSettings: {...state.searchSettings, cardsPack_id: action.packID}
            }
        }
        case "SINGLE-PACK-REDUCER/SET-CURRENT-PAGE": {
            return {...state, searchSettings: {...state.searchSettings, page: action.page}}
        }
        case "SINGLE-PACK-REDUCER/SET-PAGE-COUNT": {
            return {...state, searchSettings: {...state.searchSettings, pageCount: action.pageCount}}
        }
        case "SINGLE-PACK-REDUCER/SET-CARD-QUESTION-FOR-SEARCH-REQUEST": {
            return {...state, searchSettings: {...state.searchSettings, cardQuestion: action.question}}
        }
        case "SINGLE-PACK-REDUCER/SET-CARD-ANSWER-FOR-SEARCH-REQUEST": {
            return {...state, searchSettings: {...state.searchSettings, cardAnswer: action.answer}}
        }
        case "SINGLE-PACK-REDUCER/EDIT-CARD": {
            //@ts-ignore
            return {...state, cards: state.cards.map((c)=>c._id === action.id
                    ? {...c, _id:action.id, question:action.question, answer:action.answer}
                    : {...c})}
        }

        default:
            return {...state}
    }

}


//ACTIONS

export type SetCardsDataACType = ReturnType<typeof setCardsDataAC>
export const setCardsDataAC = (data: InitialStateType) => ({
    type: 'SINGLE-PACK-REDUCER/SET-CARDS-DATA',
    data,
} as const)
export type SetCardsPackTitleAC = ReturnType<typeof setCardsPackTitleAC>
export const setCardsPackTitleAC = (title: string, packID: string) => {
    return {
        type: 'SINGLE-PACK-REDUCER/SET-NAME',
        title,
        packID
    } as const
}
export type SetPackIdACType = ReturnType<typeof setPackIdAC>
export const setPackIdAC = (packID: string) => {
    return {
        type: 'SINGLE-PACK-REDUCER/SET-PACK-ID',
        packID
    } as const
}
export type SetCurrentPageACType = ReturnType<typeof setCurrentPageAC>
export const setCurrentPageAC = (page: number) => {
    return {
        type: 'SINGLE-PACK-REDUCER/SET-CURRENT-PAGE',
        page
    } as const
}
export type SetPageCountACType = ReturnType<typeof setPageCountAC>
export const setPageCountAC = (pageCount: number) => {
    return {
        type: 'SINGLE-PACK-REDUCER/SET-PAGE-COUNT',
        pageCount
    } as const
}
export type SetCardQuestionForSearchRequestACType = ReturnType<typeof setCardQuestionForSearchRequestAC>
export const setCardQuestionForSearchRequestAC = (question: string) => {
    return {
        type: 'SINGLE-PACK-REDUCER/SET-CARD-QUESTION-FOR-SEARCH-REQUEST',
        question
    } as const
}
export type SetCardAnswerForSearchRequestACType = ReturnType<typeof setCardAnswerForSearchRequestAC>
export const setCardAnswerForSearchRequestAC = (answer: string) => {
    return {
        type: 'SINGLE-PACK-REDUCER/SET-CARD-ANSWER-FOR-SEARCH-REQUEST',
        answer
    } as const
}
export type deleteCardACType = ReturnType<typeof deleteCardAC>
export const deleteCardAC = (id: string) => ({
    type: 'SINGLE-PACK-REDUCER/DELETE-CARD',
    id,
} as const)
export type editCardACType = ReturnType<typeof editCardAC>
export const editCardAC = (question: string | undefined, answer: string | undefined, id: string) => ({
    type: 'SINGLE-PACK-REDUCER/EDIT-CARD',
    question,
    answer,
    id
} as const)
//THUNK
export const getSinglePackDataTC = (data: SingleCardPackRequestDataType): AppThunk => {
    return async (dispatch) => {
        try {
            dispatch(setAppStatus('loading'))
            let response = await CardsAPI.getSingleCardPack(data)
            dispatch(setCardsDataAC(response.data))
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
        } finally {
            dispatch(setAppStatus('idle'))
        }
    }
}

export const deleteCardTC = (id: string): AppThunk => {
    return async (dispatch) => {
        try {
            dispatch(setAppStatus('loading'))
            await CardsAPI.deleteCard(id);
            dispatch(deleteCardAC(id))
        } catch (error: any) {
            dispatch(setAppError(error.response.data.error))
        } finally {
            dispatch(setAppStatus('idle'))
        }
    }
}

export const editCardTC = (data: { card: { question?: string, answer?: string, _id: string } }): AppThunk => {
    return async (dispatch) => {
        try {
            dispatch(setAppStatus('loading'))
            await CardsAPI.putCard(data)
            dispatch(editCardAC(data.card.question, data.card.answer, data.card._id))
        } catch (error: any) {
            dispatch(setAppError(error.response.data.error))
        } finally {
            dispatch(setAppStatus('idle'))
        }
    }
}

export const learnPackModeTC = (data: SingleCardPackRequestDataType): AppThunk => {
    return async (dispatch) => {
        try {
            dispatch(setAppStatus('loading'))
            let response = await CardsAPI.getSingleCardPack(data)
            console.log(response)
            response = await CardsAPI.getSingleCardPack({...data, pageCount:response.data.cardsTotalCount})
            console.log(response.data.cards)


        } catch (error: any) {
            dispatch(setAppError(error.response.data.error))
        } finally {
            dispatch(setAppStatus('idle'))
        }
    }
}
