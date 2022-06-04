import {AppThunk} from "./store";
import {CardsAPI} from "../api/cards-api";

export type CardPacksType = {
    _id: string
    user_id: string
    name: string
    cardsCount: number
    created: string
    updated: string
}
export type initialStateType = CardPacksType[]
export const initialState: initialStateType = []


export type AppReducerActionsType = setCarsPacksTableACType
export const cardReducer = (state: initialStateType = initialState, action: AppReducerActionsType): initialStateType => {
    switch (action.type) {
        case "CARDS-REDUCER/SET-CARDS-PACKS-TABLE": {
            return {...action.cardPacks}
        }
        default: {
            return state
        }
    }
}
export type setCarsPacksTableACType = ReturnType<typeof setCarsPacksTableAC>
export const setCarsPacksTableAC = (cardPacks: CardPacksType[]) => ({
    type: 'CARDS-REDUCER/SET-CARDS-PACKS-TABLE',
    cardPacks,
} as const)


//THUNK
export const setCardsPacksTableTC = (data:CardsPacksDataType):AppThunk => {
    return async (dispatch) => {
        try {
            let response = await CardsAPI.getCardPacks(data)
            dispatch(setCarsPacksTableAC(response.data))
            console.log(response)
        }
        catch (error) {
            console.log(error)
        }
    }
}

export type CardsPacksDataType = {
    packName?: string // не обязательно
    min?:number // не обязательно
    max?:number // не обязательно
    sortPacks?: string // не обязательно
    page?: number // не обязательно
    pageCount?: number // не обязательно
    user_id?:string
}