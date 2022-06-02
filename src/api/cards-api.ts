import axios, { AxiosResponse } from "axios";
import {
    LogInDataType,
    LogOutType,
    RegistrationDataType,
    RestorePasswordDataType,
    UpdatePasswordDataType
} from "../bll/authReducer";
import {UserdataForChangeType} from "../bll/profileReducer";
import {Params} from "react-router-dom";


const instance = axios.create({
    baseURL:'http://localhost:7542/2.0/',
    //baseURL:'https://neko-back.herokuapp.com/2.0',
    withCredentials: true
})


//api
export const AppAPI = {
    ping() {
        return instance.get('ping')
    },
    me() {
        return instance.post('auth/me')
    },
    register(data: RegistrationDataType) {
        return instance.post<RegistrationDataType, AxiosResponse>('auth/register', data)
    },
    logIn(data: LogInDataType){
        return instance.post<LogInDataType, AxiosResponse>('/auth/login', data)
    },
    logOut(){
        return instance.delete<LogOutType, AxiosResponse>('/auth/me')
    },
    changeUserData(data: UserdataForChangeType){
        return instance.put<UserdataForChangeType, AxiosResponse>('auth/me', data)
    },
    restorePassword(data: RestorePasswordDataType){
        return instance.post<RestorePasswordDataType, AxiosResponse>('auth/forgot', data)
    },
    updatePassword(password: string, resetPasswordToken: Readonly<Params<string>>){
        return instance.post<UpdatePasswordDataType, AxiosResponse>('/auth/set-new-password', {password, resetPasswordToken})
    }
}


