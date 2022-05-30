import axios, { AxiosResponse } from "axios";
import {LogInDataType, LogOutType, RegistrationDataType} from "../bll/authReducer";


const instance = axios.create({
    baseURL:'http://localhost:7542/2.0/',
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
        return instance.delete<LogOutType, AxiosResponseLogOutType>('/auth/me')
    }
}



export type AxiosResponseLogOutType = {
    info: string
    error: string;
}
