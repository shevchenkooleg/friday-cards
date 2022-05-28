import {AppAPI} from "../api/cards-api";
import {AppThunk} from "./store";

type AuthReducerStateType = {
    isAuth: boolean
}
const initState = {
    isAuth: false
}
export type AuthReducerType = SetAuthDataACType
export const authReducer = (state: AuthReducerStateType = initState, action: AuthReducerType): any => {
    switch (action.type) {
        default: {
            return state
        }
    }
}
export type SetAuthDataACType = ReturnType<typeof setAuthData>
export const setAuthData = () => {
    return {
        type: 'AUTH-REDUCER/SET-AUTH-DATA'
    } as const
}

//THUNK
export const pingServerTC = ():AppThunk => {
    return async (dispatch) => {
        try {
            let response = await AppAPI.ping()
            console.log(response)
        }
        catch (error) {
            console.log(error)
        }
    }
}

export const registerUserTC = (data: RegistrationDataType): AppThunk => {
    return async (dispatch) => {
        try {
            let response = await AppAPI.register(data)
            console.log(response)
        }
        catch (error) {
            console.log(error)
        }
    }
}



//types
export type RegistrationDataType = {
    email: string,
    password: string
}