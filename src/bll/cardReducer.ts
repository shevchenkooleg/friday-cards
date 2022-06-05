import {AppThunk} from "./store";
import {CardsAPI} from "../api/cards-api";


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
export type DeletePackDataType = {
    _id: string
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
    resetCardPacksFilterACType |
    deleteCardsPackAC

export const cardReducer = (state: InitialStateType = initialState, action: AppReducerActionsType): InitialStateType => {
    switch (action.type) {
        case "CARDS-REDUCER/RESET-FILTER": {
            return {...state,
                searchSettings: {
                    ...state.searchSettings,
                    minMax: [0, 100],
                    packName: '',
                    page: 1,
                    pageCount: 10,
                    user_id: '',
                    sortPacks: ''
                }
            }
        }
        case "CARDS-REDUCER/DELETE-CARDS-PACK": {
            return {...state, cardPacks: [...state.cardPacks.filter((pack)=>pack._id !== action.id)]}
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
        default: {
            return state
        }
    }
}

export type deleteCardsPackAC = ReturnType<typeof deleteCardsPackAC>
export const deleteCardsPackAC = (id: string) => ({
    type: 'CARDS-REDUCER/DELETE-CARDS-PACK',
    id
} as const)
export type resetCardPacksFilterACType = ReturnType<typeof resetCardPacksFilterAC>
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


//THUNK
export const deleteCardsPackTC = (data: string): AppThunk => {
  return async (dispatch)=> {
      try {
          let response = await CardsAPI.deleteCardPack(data)
          console.log(response)
      }
      catch (e) {
          console.log(e)
      }
  }
}

export const getCardsPacksTableTC = (data: CardsPacksDataType): AppThunk => {
    return async (dispatch) => {
        try {
            let response = await CardsAPI.getCardPacks(data)
            dispatch(setCarsPacksTableAC(response.data.cardPacks))
        } catch (error) {
            console.log(error)
        }
    }
}


export const getCardReducerData = (data: CardsPacksDataType): AppThunk => {
    return async (dispatch) => {
        try {
            const response = await CardsAPI.getCardPacks(data)
            dispatch(setCardsReducerDataAC(response.data))
            dispatch(setMinMaxSearchValueAC([response.data.minCardsCount, response.data.maxCardsCount]))
        } catch (error) {
            console.log(error)
        }
    }
}

export const addCardPack = (data: AddPackDataType): AppThunk => {
    return async (dispatch) => {
        try {
            const response = await CardsAPI.addCardPack(data)
            console.log(response)
            dispatch(getCardReducerData({pageCount: 10, user_id: ''}))
        } catch (error) {
            console.log(error)
        }
    }
}

