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

export const profileReducer = (state: InitStateType = initState, action:any):InitStateType => {
    switch (action.type) {
        default: {
            return state
        }
    }
}