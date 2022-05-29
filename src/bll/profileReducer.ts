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
        nickname: '',
        email: '',
        avatar: "https://png.pngtree.com/png-vector/20190504/ourmid/pngtree-vector-men-avatar-icon-png-image_1020927.jpg",
    }
}
type ProfileReducerActionsType = setAuthDataACType
export const profileReducer = (state: InitStateType = initState, action:ProfileReducerActionsType):InitStateType => {
    switch (action.type) {
        case "PROFILE-REDUCER/SET-AUTH-DATA": {
            return {...state, userData: {...state.userData, email: action.email, nickname: action.nickName}}
        }
        default: {
            return state
        }
    }
}
export type setAuthDataACType = ReturnType<typeof setAuthData>
export const setAuthData = (email: string, nickName: string) => {
    return {
        type: 'PROFILE-REDUCER/SET-AUTH-DATA',
        email,
        nickName
    } as const
}