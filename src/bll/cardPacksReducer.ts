import {AppThunk} from "./store";
import {CardsAPI} from "../api/cards-api";
import {setAppError, setAppStatus} from "./appReducers";


export type InitialStateType = {
    cardPacks: CardPacksType[]
    cardPacksTotalCount: number | undefined
    maxCardsCount: number | undefined
    minCardsCount: number | undefined
    page: number | undefined
    searchAreaValue: string
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
    cardPacksTotalCount: 0,
    maxCardsCount: 100,
    minCardsCount: 0,
    page: 1,
    searchAreaValue: '',
    pageCount: 10,
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
    SetMaxCardsValueAC |
    SetMinMaxSearchValueACType |
    SetUserIDForSearchACType |
    ResetCardPacksFilterACType |
    SetCurrentPageACType |
    SetPageInPaginationACType |
    SetPageAmountACType |
    SetCardPacksTotalCountACType |
    SetPackNameForSearchACType |
    SetSearchAreaValueACType

export const cardPacksReducer = (state: InitialStateType = initialState, action: AppReducerActionsType): InitialStateType => {
    switch (action.type) {
        case "CARDS-REDUCER/RESET-FILTER": {
            return {...state, pageCount:10, searchSettings: {...state.searchSettings, minMax: [0, action.maxCardsCount], packName: '', page: 1, pageCount: 10, sortPacks:''}}
        }
        case 'CARDS-REDUCER/SET-CARDS-PACKS-TABLE': {
            return {...state, cardPacks: [...action.cardPacks]}
        }
        case "CARDS-REDUCER/SET-CARDS-REDUCER-DATA": {
            return {...state, ...action.cardReducerData}
        }
        case "CARDS-REDUCER/SET-MAX-CARDS-VALUE": {
            // return {...state, minCardsCount:0, maxCardsCount:action.maxCardValue}
            return {...state, maxCardsCount:action.maxCardValue}
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
        case "CARDS-REDUCER/SET-PAGES-AMOUNT": {
            return {...state, pageCount: action.amount, searchSettings:{...state.searchSettings, pageCount:action.amount}}
        }
        case "CARDS-REDUCER/SET-CARD-PACKS-TOTAL-COUNT": {
            return {...state, cardPacksTotalCount: action.totalCount}
        }
        case "CARDS-REDUCER/SET-PACK-NAME-FOR-SEARCH": {
            return {...state, searchSettings:{...state.searchSettings, packName: action.packName}}
        }
        case "CARDS-REDUCER/SET-SEARCH-AREA-VALUE": {
            return {...state, searchAreaValue: action.value}
        }
        default: {
            return state
        }
    }
}

export type ResetCardPacksFilterACType = ReturnType<typeof resetCardPacksFilterAC>
export const resetCardPacksFilterAC = (maxCardsCount: number) => ({
    type: 'CARDS-REDUCER/RESET-FILTER',
    maxCardsCount
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
export type SetMaxCardsValueAC = ReturnType<typeof setMaxCardsValueAC>
export const setMaxCardsValueAC = (maxCardValue: number) => {
    return {
        type: 'CARDS-REDUCER/SET-MAX-CARDS-VALUE',
        maxCardValue
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
export type SetPageAmountACType = ReturnType<typeof setPagesAmountAC>
export const setPagesAmountAC = (amount: number) => {
    return {
        type: 'CARDS-REDUCER/SET-PAGES-AMOUNT',
        amount
    } as const
}
export type SetCardPacksTotalCountACType = ReturnType<typeof setCardPacksTotalCountAC>
export const setCardPacksTotalCountAC = (totalCount: number) => {
    return {
        type: 'CARDS-REDUCER/SET-CARD-PACKS-TOTAL-COUNT',
        totalCount
    } as const
}
export type SetPackNameForSearchACType = ReturnType<typeof setPackNameForSearchAC>
export const setPackNameForSearchAC = (packName: string) => {
    return {
        type: 'CARDS-REDUCER/SET-PACK-NAME-FOR-SEARCH',
        packName
    } as const
}
export type SetSearchAreaValueACType = ReturnType<typeof setSearchAreaValueAC>
export const setSearchAreaValueAC = (value: string) => {
    return {
        type: 'CARDS-REDUCER/SET-SEARCH-AREA-VALUE',
        value
    } as const
}

//THUNK

export const getFirstCardsPacksTableTC = (data: CardsPacksDataType): AppThunk => {
    return async (dispatch) => {
        try {
            dispatch(setAppStatus('loading'))
            let response = await CardsAPI.getCardSPacks(data)
            dispatch(setCarsPacksTableAC(response.data.cardPacks))
            dispatch(setPageInPaginationAC(response.data.page))
            dispatch(setCardPacksTotalCountAC(response.data.cardPacksTotalCount))
            dispatch(setMaxCardsValueAC(response.data.maxCardsCount))
            dispatch(setMinMaxSearchValueAC([0,response.data.maxCardsCount]))
        } catch (error: any) {
            dispatch(setAppError(error.response.data.error))
        } finally {
            dispatch(setAppStatus('idle'))
        }
    }
}

export const getCardsPacksTableTC = (data: CardsPacksDataType): AppThunk => {
    return async (dispatch) => {
        try {
            dispatch(setAppStatus('loading'))
            let response = await CardsAPI.getCardSPacks(data)
            dispatch(setCarsPacksTableAC(response.data.cardPacks))
            dispatch(setPageInPaginationAC(response.data.page))
            dispatch(setCardPacksTotalCountAC(response.data.cardPacksTotalCount))
            dispatch(setMaxCardsValueAC(response.data.maxCardsCount))
        } catch (error: any) {
            dispatch(setAppError(error.response.data.error))
        } finally {
            dispatch(setAppStatus('idle'))
        }
    }
}

export const addCardPack = (addPackData: AddPackDataType, data: CardsPacksDataType): AppThunk => {
    return async (dispatch) => {
        try {
            dispatch(setAppStatus('loading'))
            await CardsAPI.addCardsPack(addPackData)
            dispatch(getCardsPacksTableTC(data))
        } catch (error: any) {
            dispatch(setAppError(error.response.data.error))
        } finally {
            dispatch(setAppStatus('idle'))
        }
    }
}
export const deleteCardsPackTC = (card_id: string, data: CardsPacksDataType): AppThunk => {
    return async (dispatch) => {
        try {
            dispatch(setAppStatus('loading'))
            await CardsAPI.deleteCardsPack(card_id)
            dispatch(getCardsPacksTableTC(data))

        } catch (error: any) {
            dispatch(setAppError(error.response.data.error))
        } finally {
            dispatch(setAppStatus('idle'))
        }
    }
}

