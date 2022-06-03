import { AppAPI } from "../api/cards-api"
import {setAppError, setAppStatus} from "./appReducers"
import { AppThunk } from "./store"

export type UserDataType = {
    nickName: string,
    email: string,
    avatar: string,
}
export type UserdataForChangeType = {
    name: string,
    avatar: string
}
type InitStateType = {
    userData: UserDataType
}
const initState = {
    userData: {
        nickName: '',
        email: '',
        avatar: "https://png.pngtree.com/png-vector/20190504/ourmid/pngtree-vector-men-avatar-icon-png-image_1020927.jpg",
    }
}
export type ProfileReducerActionsType = SetAuthDataACType
export const profileReducer = (state: InitStateType = initState, action:ProfileReducerActionsType):InitStateType => {
    switch (action.type) {
        case "PROFILE-REDUCER/SET-AUTH-DATA": {
            return {...state, userData:{...state.userData, email:action.email, nickName:action.nickName}}
        }
        default: {
            return state
        }
    }
}
export type SetAuthDataACType = ReturnType<typeof setUserData>
export const setUserData = (nickName: string, email: string) => {
    return {
        type: 'PROFILE-REDUCER/SET-AUTH-DATA',
        nickName,
        email
    } as const
}


//THUNK

export const getUserData = (): AppThunk => {
    return async (dispatch) => {
        try {
            const response = await AppAPI.me()
                dispatch(setUserData(response.data.name, response.data.email))
        } catch (error:any) {
            dispatch(setAppError(error.response.data.error))
        }
    }
}

export const changeUserData = (data: UserdataForChangeType):AppThunk => {
    return async (dispatch) => {
        try {
            await AppAPI.changeUserData(data)
                dispatch(setAppStatus('succeeded'))
                dispatch(getUserData())
        } catch (error: any) {
            dispatch(setAppError(error.response.data.error))
        }
    }
}