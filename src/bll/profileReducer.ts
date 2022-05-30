export type UserDataType = {
    nickname: string | null,
    email: string | null,
    avatar: string | undefined,
}
type InitStateType = {
    userData: UserDataType
}
const initState = {
    userData: {
        nickname: 'orion2004',
        email: 'orion2004@mail.ru',
        avatar: "https://png.pngtree.com/png-vector/20190504/ourmid/pngtree-vector-men-avatar-icon-png-image_1020927.jpg",
    }
}
export type ProfileReducerActionsType = SetAuthDataACType
export const profileReducer = (state: InitStateType = initState, action:ProfileReducerActionsType):InitStateType => {
    switch (action.type) {
        case "PROFILE-REDUCER/SET-AUTH-DATA": {
            return {...state, userData:{...state.userData, email:action.email, nickname:action.nickname}}
        }
        default: {
            return state
        }
    }
}
export type SetAuthDataACType = ReturnType<typeof setAuthData>
const setAuthData = (nickname: string, email: string) => {
    return {
        type: 'PROFILE-REDUCER/SET-AUTH-DATA',
        nickname,
        email
    } as const
}


//THUNK

export const getAutData = (): AppThunk => {
    return async (dispatch) => {
        const responce = await AppAPI.me()
        if (responce.status===200) {
            dispatch(setAuthData(responce.data.name, responce.data.email))
        }
    }
}