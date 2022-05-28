import {AppAPI} from "../api/cards-api";
import {AppThunk} from "./store";


const initState = {}

export const authReducer = (state: any = initState, action: any): any => {
    switch (action.type) {
        default: {
            return state
        }
    }
}


//THUNK
export const pingServerTC = ():AppThunk => {
    return async (dispatch) => {
        try {
            let response = await AppAPI.ping()
            console.log(response)
        }
        catch (e) {
            console.log(e)
        }
    }
}

export const registerUserTC = (data: RegistrationDataType): AppThunk => {
    return async (dispatch) => {
        try {
            let response = await AppAPI.register(data)
            console.log(response)
        }
        catch (e) {
            console.log(e)
        }
    }
}



//types
export type RegistrationDataType = {
    email: string,
    password: string
}