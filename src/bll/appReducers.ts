import {AppThunk} from "./store";
import {AppAPI} from "../api/cards-api";


export type AppDataType = {
    initialized: boolean
}

const initialState = {
    initialized: false
}
export type AppReducerActionsType = InitializedSuccessType
export const appReducer = (state: AppDataType = initialState, action:AppReducerActionsType) => {
    switch (action.type) {

        case "APP-REDUCER/INITIALIZED-SUCCESS": {
            return {...state, initialized: true}
        }
        default: {
            return state
        }
    }
}

type InitializedSuccessType = ReturnType<typeof initializedSuccess>
export const initializedSuccess = () => {
    return {
        type: 'APP-REDUCER/INITIALIZED-SUCCESS',
    } as const
}



//THUNK

export const initializeAppTC = (): AppThunk => {
    return async (dispatch) => {
        try {
            const response = await AppAPI.me()
            console.log(response)

        }
        catch (error) {
            console.log(error)
        }
        finally {
            dispatch(initializedSuccess())
        }
    }
}

