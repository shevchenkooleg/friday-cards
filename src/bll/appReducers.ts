import {AppThunk} from "./store";
import {AppAPI} from "../api/cards-api";
import {authMeTC, LoginDataType, setAuthStatus } from "./authReducer";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppDataType = {
    initialized: boolean
    status: RequestStatusType
    error: string | null
}

const initialState: AppDataType = {
    initialized: false,
    status: 'idle',
    error: null
}
export type AppReducerActionsType = InitializedSuccessType | SetAppErrorACType
export const appReducer = (state: AppDataType = initialState, action:AppReducerActionsType) => {
    switch (action.type) {

        case "APP-REDUCER/INITIALIZED-SUCCESS": {
            return {...state, initialized: true}
        }
        case "APP-REDUCER/SET-APP-ERROR": {
            return {...state, error: action.error}
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

type SetAppErrorACType =  ReturnType<typeof setAppError>
export const setAppError = (error: string | null) => {
    return {
        type: 'APP-REDUCER/SET-APP-ERROR',
        error
    } as const
}



//THUNK

export const initializeAppTC = (): AppThunk => {
    return async (dispatch) => {
        try {
            dispatch(authMeTC())
        }
        catch (error: any) {
            console.log(error)
            dispatch(setAppError(error.response.data.error))
        }
        finally {
            dispatch(initializedSuccess())
        }
    }
}



