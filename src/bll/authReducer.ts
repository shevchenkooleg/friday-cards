import {AppAPI} from "../api/cards-api";
import { setAppError } from "./appReducers";
import { setAuthData } from "./profileReducer";
import {AppThunk} from "./store";

type AuthReducerStateType = {
    isAuth: boolean
}
const initState = {
    isAuth: false
}
export type AuthReducerType = SetAuthStatusACType
export const authReducer = (state: AuthReducerStateType = initState, action: AuthReducerType): any => {
    switch (action.type) {
        case "AUTH-REDUCER/SET-AUTH-STATUS": {
            return {...state, isAuth: action.isAuth}
        }
        default: {
            return state
        }
    }
}
export type SetAuthStatusACType = ReturnType<typeof setAuthStatus>
export const setAuthStatus = (isAuth: boolean) => {
    return {
        type: 'AUTH-REDUCER/SET-AUTH-STATUS',
        isAuth
    } as const
}

//THUNK
export const pingServerTC = ():AppThunk => {
    return async (dispatch) => {
        try {
            let response = await AppAPI.ping()
            console.log(response)
        }
        catch (error: any) {
            console.log(error)
            dispatch(setAppError(error.response.data.error))
        }
    }
}

export const registerUserTC = (data: RegistrationDataType): AppThunk => {
    return async (dispatch) => {
        try {
            let response = await AppAPI.register(data)
            console.log(response)
            if (response.status === 201) {

            }
        }
        catch (error: any) {
            console.log(error)
            dispatch(setAppError(error.response.data.error))
        }
    }
}
export const logInTC = (data: LoginDataType):AppThunk => {
    return async (dispatch) => {
        try {
            let response = await AppAPI.login(data)
            console.log(response)
            if (response.status === 200) {
                dispatch(authMeTC())
            }
        }
        catch (error: any) {
            console.log(error)
            dispatch(setAppError(error.response.data.error))
        }
    }
}
export const logOutTC = ():AppThunk => {
    return async (dispatch) => {
        try {
            let response = await AppAPI.logOut()
            console.log(response)
            if (response.status === 200) {
                dispatch(setAuthStatus(false))
                dispatch(setAuthData('', ''))
            }
        }
        catch (error: any) {
            console.log(error)
            dispatch(setAppError(error.response.data.error))
        }
    }
}

export const authMeTC = ():AppThunk => {
    return async (dispatch) => {
        AppAPI.me().then((response)=>{
            console.log(response)
            if (response.status === 200) {
                alert('me')
                dispatch(setAuthStatus(true))
                dispatch(setAuthData(response.data.email, response.data.name))
            }
        })
    }
}



//types
export type RegistrationDataType = {
    email: string
    password: string
}
export type LoginDataType = {
    email: string
    password: string
    rememberMe: boolean
}