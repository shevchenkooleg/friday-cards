import {AppThunk} from "./store";
import {AppAPI} from "../api/cards-api";
import { setUserData } from "./profileReducer";
import { setAuthStatus } from "./authReducer";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed' // Используем для LOADING
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
export type AppReducerActionsType = InitializedSuccessType | SetAppErrorACType | SetAppStatusACType
export const appReducer = (state: AppDataType = initialState, action: AppReducerActionsType) => {
    switch (action.type) {
        case "APP-REDUCER/SET-APP-STATUS": {
            return {...state, status: action.status}
        }
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
export type SetAppStatusACType = ReturnType<typeof setAppStatus>
export const setAppStatus = (status: RequestStatusType) => ({
    type: 'APP-REDUCER/SET-APP-STATUS',
    status
}as const)

type InitializedSuccessType = ReturnType<typeof initializedSuccess>
export const initializedSuccess = () => {
    return {
        type: 'APP-REDUCER/INITIALIZED-SUCCESS',
    } as const
}

type SetAppErrorACType = ReturnType<typeof setAppError>
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
            const response = await AppAPI.me()
                dispatch(setUserData(response.data.name, response.data.email))
                dispatch(setAuthStatus(true))
        } catch (error: any) {
            dispatch(setAppError(error.response.data.error))
        } finally {
            dispatch(initializedSuccess())
        }
    }
}

