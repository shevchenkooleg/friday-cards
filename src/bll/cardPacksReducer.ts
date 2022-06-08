import {AppThunk} from "./store";
import {CardsAPI} from "../api/cards-api";
import {setAppError} from "./appReducers";


export type InitialStateType = {
    cardPacks: CardPacksType[]
    cardPacksTotalCount: number | undefined
    maxCardsCount: number | undefined
    minCardsCount: number | undefined
    page: number | undefined
    pageCount: number | undefined
    token: string
    tokenDeathTime: number | undefined
    searchSettings: SearchSettingsType
}
export type CardPacksType = {
    cardsCount: number
    created: string
    grade: number
    more_id: string
    name: string
    path: string
    private: boolean
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    user_name: string
    __v: number
    _id: string
}
export type SearchSettingsType = {
    packName: string
    minMax: number | number[]
    sortPacks: string
    page: number
    pageCount: number
    user_id: string
}
export type AddPackDataType = {
    cardsPack: {
        name: string
        patch?: string
        grade?: number
        shots?: number
        rating?: number
        deckCover?: string
        private?: boolean
        type?: string
    }
}
export type CardsPacksDataType = {
    packName?: string // не обязательно
    min?: number // не обязательно
    max?: number // не обязательно
    sortPacks?: string // не обязательно
    page?: number // не обязательно
    pageCount?: number // не обязательно
    user_id?: string
}

export const initialState: InitialStateType = {
    cardPacks: [],
    cardPacksTotalCount: undefined,
    maxCardsCount: undefined,
    minCardsCount: undefined,
    page: undefined,
    pageCount: undefined,
    token: '',
    tokenDeathTime: undefined,
    searchSettings: {
        packName: '',
        minMax: [0, 100],
        sortPacks: '',
        page: 1,
        pageCount: 10,
        user_id: '',
    }
}
export type AppReducerActionsType =
    SetCarsPacksTableACType |
    SetCardsReducerDataACType |
    SetMinMaxSearchValueACType |
    SetUserIDForSearchACType |
    ResetCardPacksFilterACType |
    SetCurrentPageACType |
    SetPageInPaginationACType |
    SetPageCountACType

export const cardPacksReducer = (state: InitialStateType = initialState, action: AppReducerActionsType): InitialStateType => {
    switch (action.type) {
        case "CARDS-REDUCER/RESET-FILTER": {
            return {...state, searchSettings: {...state.searchSettings, minMax: [0,103], packName: '', page: 1, pageCount: 10, user_id: '', sortPacks:''}}
        }
        case 'CARDS-REDUCER/SET-CARDS-PACKS-TABLE': {
            return {...state, cardPacks: [...action.cardPacks]}
        }
        case "CARDS-REDUCER/SET-CARDS-REDUCER-DATA": {
            return {...state, ...action.cardReducerData}
        }
        case "CARDS-REDUCER/SET-MIN-MAX-SEARCH-VALUE": {
            return {...state, searchSettings: {...state.searchSettings, minMax: action.value}}
        }
        case "CARDS-REDUCER/SET-USER-ID-FOR-SEARCH": {
            return {...state, searchSettings: {...state.searchSettings, user_id: action.id}}
        }
        case "CARDS-REDUCER/SET-CURRENT-PAGE": {
            return {...state, searchSettings: {...state.searchSettings, page: action.page}}
        }
        case "CARDS-REDUCER/SET-PAGE-IN-PAGINATION": {
            return {...state, page: action.page}
        }
        case "CARDS-REDUCER/SET-PAGE-COUNT": {
            return {...state, pageCount: action.amount, searchSettings:{...state.searchSettings, pageCount:action.amount}}
        }
        default: {
            return state
        }
    }
}
export type ResetCardPacksFilterACType = ReturnType<typeof resetCardPacksFilterAC>
export const resetCardPacksFilterAC = () => ({
    type: 'CARDS-REDUCER/RESET-FILTER'
} as const)
export type SetCarsPacksTableACType = ReturnType<typeof setCarsPacksTableAC>
export const setCarsPacksTableAC = (cardPacks: CardPacksType[]) => ({
    type: 'CARDS-REDUCER/SET-CARDS-PACKS-TABLE',
    cardPacks,
} as const)
export type SetCardsReducerDataACType = ReturnType<typeof setCardsReducerDataAC>
export const setCardsReducerDataAC = (cardReducerData: InitialStateType) => {
    return {
        type: 'CARDS-REDUCER/SET-CARDS-REDUCER-DATA',
        cardReducerData
    } as const
}
export type SetMinMaxSearchValueACType = ReturnType<typeof setMinMaxSearchValueAC>
export const setMinMaxSearchValueAC = (value: number | number[]) => {
    return {
        type: 'CARDS-REDUCER/SET-MIN-MAX-SEARCH-VALUE',
        value
    } as const
}
type SetUserIDForSearchACType = ReturnType<typeof setUserIDForSearchAC>
export const setUserIDForSearchAC = (id: string) => {
    return {
        type: 'CARDS-REDUCER/SET-USER-ID-FOR-SEARCH',
        id
    } as const
}
export type SetCurrentPageACType = ReturnType<typeof setCurrentPageAC>
export const setCurrentPageAC = (page: number) => {
    return {
        type: 'CARDS-REDUCER/SET-CURRENT-PAGE',
        page
    } as const
}
export type SetPageInPaginationACType = ReturnType<typeof setPageInPaginationAC>
export const setPageInPaginationAC = (page: number) => {
    return {
        type: 'CARDS-REDUCER/SET-PAGE-IN-PAGINATION',
        page
    } as const
}
export type SetPageCountACType = ReturnType<typeof setPageCountAC>
export const setPageCountAC = (amount: number) => {
    return {
        type: 'CARDS-REDUCER/SET-PAGE-COUNT',
        amount
    } as const
}


//THUNK
export const getCardsPacksTableTC = (data: CardsPacksDataType): AppThunk => {
    return async (dispatch) => {
        try {
            let response = await CardsAPI.getCardSPacks(data)
            dispatch(setCarsPacksTableAC(response.data.cardPacks))
            dispatch(setPageInPaginationAC(response.data.page))
        } catch (error: any) {
            console.log(error)
            // dispatch(setAppError(error.response.data.error))
        }
    }
}


export const getCardReducerData = (data: CardsPacksDataType): AppThunk => {
    return async (dispatch) => {
        try {
            const response = await CardsAPI.getCardSPacks(data)
            dispatch(setCardsReducerDataAC(response.data))
            dispatch(setMinMaxSearchValueAC([response.data.minCardsCount, response.data.maxCardsCount]))
        } catch (error: any) {
            dispatch(setAppError(error.response.data.error))
        }
    }
}

export const addCardPack = (data: AddPackDataType, user_id?: string): AppThunk => {
    return async (dispatch) => {
        try {
            await CardsAPI.addCardsPack(data)
            user_id
                ? dispatch(getCardReducerData({pageCount: 10, user_id}))
                : dispatch(getCardReducerData({pageCount: 10, user_id: ''}))
        } catch (error: any) {
            dispatch(setAppError(error.response.data.error))
        }
    }
}
/*
export const getSinglePackDataTC = (data: SingleCardPackRequestDataType): AppThunk => {
    return async (dispatch) => {
        try {
            let response = await CardsAPI.getSingleCardPack(data)
            console.log(response)
        } catch (error:any) {
            dispatch(setAppError(error.response.data.error))
        }
    }
}*/
export const deleteCardsPackTC = (card_id: string, data: CardsPacksDataType): AppThunk => {
    return async (dispatch) => {
        try {
            await CardsAPI.deleteCardsPack(card_id)
            dispatch(getCardReducerData(data))

        } catch (error: any) {
            dispatch(setAppError(error.response.data.error))
        }
    }
}
