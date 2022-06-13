import {AppAPI} from "../api/cards-api";
import {AppThunk} from "./store";
import {setAppError, setAppStatus} from "./appReducers";
import {setUserData} from "./profileReducer";
import {Params} from "react-router-dom";

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
            await AppAPI.logOut()
                dispatch(setAuthStatus(false))
        } catch (error: any) {
            dispatch(setAppError(error.response.data.error))
        } finally {
            dispatch(setAppStatus('idle'))
        }
    }
}
//LogIn todo: 1. Добавить после логинизации запрос на  /auth/me - загрузить данные пользователя; 2. нужен лоудер
export const logInTC = (data: LogInDataType): AppThunk => {
    return async (dispatch) => {
        try {
            dispatch(setAppStatus('loading'))
            let response = await AppAPI.logIn(data)
                dispatch(setAuthStatus(true))
                dispatch(setUserData(response.data.name, response.data.email, response.data._id))
        } catch (error: any) {
            dispatch(setAppError(error.response.data.error))
        } finally {
            dispatch(setAppStatus('idle'))
        }
    }
}

export const pingServerTC = (): AppThunk => {
    return async (dispatch) => {
        try {
            dispatch(setAppStatus('loading'))
            await AppAPI.ping()
        } catch (error: any) {
            dispatch(setAppError(error.response.data.error))
        } finally {
            dispatch(setAppStatus('idle'))
        }
    }
}

export const registerUserTC = (data: RegistrationDataType): AppThunk => {
    return async (dispatch) => {
        try {
            dispatch(setAppStatus('loading'))
            await AppAPI.register(data)
        } catch (error: any) {
            dispatch(setAppError(error.response.data.error))
        } finally {
            dispatch(setAppStatus('idle'))
        }
    }
}

export const restorePassword = (data: RestorePasswordDataType): AppThunk => {
    return async (dispatch) => {
        try {
            dispatch(setAppStatus('loading'))
            await AppAPI.restorePassword(data)
        } catch (error: any) {
            dispatch(setAppError(error.response.data.error))
        } finally {
            dispatch(setAppStatus('idle'))
        }
    }
}
export const updatePasswordTC = (password: string, resetPasswordToken: string): AppThunk => {
    return async (dispatch) => {
        try {
            dispatch(setAppStatus('loading'))
            let response = await AppAPI.updatePassword(password, resetPasswordToken)
            if (response.data.info === 'setNewPassword success —ฅ/ᐠ.̫ .ᐟฅ—') {
                dispatch(setAppStatus('succeeded'))
            }
        } catch (error: any) {
            dispatch(setAppError(error.response.data.error))
        } finally {
            dispatch(setAppStatus('idle'))
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
export type RestorePasswordDataType = {
    email: string
    from: string
    message: string
}
export type UpdatePasswordDataType = {
     password: string, resetPasswordToken: Readonly<Params<string>>
}



