import {AppAPI} from "../api/cards-api";
import {AppThunk} from "./store";
import {setAppError, setAppStatus} from "./appReducers";
import { setUserData } from "./profileReducer";

type AuthReducerStateType = {
    isAuth: boolean
}

const initState = {
    isAuth: false
}
export type AuthReducerType = SetAuthDataACType
export const authReducer = (state: AuthReducerStateType = initState, action: AuthReducerType): AuthReducerStateType => {
    switch (action.type) {
        case "AUTH-REDUCER/SET-AUTH-DATA": {
            return {
                ...state, isAuth: action.isAuth
            }
        }

        default: {
            return state
        }
    }
}
//Action creators
export type SetAuthDataACType = ReturnType<typeof setAuthStatus>
export const setAuthStatus = (isAuth: boolean) => {
    return {
        type: 'AUTH-REDUCER/SET-AUTH-DATA',
        
        isAuth
    } as const
}

//THUNK

//LogOut todo: 1. Сделать окошко уточнения!!
export const LogOutTC = (): AppThunk => {
    return async (dispatch) => {
        try {
            dispatch(setAppStatus('loading'))
            let response = await AppAPI.logOut()
            if (response.status === 200) {
                dispatch(setAuthStatus(false))
            }
        } catch (error:any) {
            dispatch(setAppError(error.response.data.error))
        } finally {
            dispatch(setAppStatus('succeeded'))
        }
    }
}
//LogIn todo: 1. Добавить после логинизации запрос на  /auth/me - загрузить данные пользователя; 2. нужен лоудер
export const logInTC = (data: LogInDataType): AppThunk => {
    return async (dispatch) => {
        try {
            dispatch(setAppStatus('loading'))
            let response = await AppAPI.logIn(data)
            if (response.status === 200) {
                dispatch(setAuthStatus(true))
                dispatch(setUserData(response.data.name, response.data.email))
            }
        } catch (error: any) {
            dispatch(setAppError(error.response.data.error))
        } finally {
            dispatch(setAppStatus('succeeded'))
        }
    }
}

export const pingServerTC = (): AppThunk => {
    return async (dispatch) => {
        try {
            let response = await AppAPI.ping()
            console.log(response)
        } catch (error: any) {
            dispatch(setAppError(error.response.data.error))
        }
    }
}

export const registerUserTC = (data: RegistrationDataType): AppThunk => {
    return async (dispatch) => {
        try {
            let response = await AppAPI.register(data)
            console.log(response)
        } catch (error: any) {
            dispatch(setAppError(error.response.data.error))
        }
    }
}


//types
export type RegistrationDataType = {
    email: string,
    password: string
}
export type LogInDataType = {
    email: string,
    password: string,
    rememberMe: boolean,
}
export type LogOutType = {}


