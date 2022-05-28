import axios, { AxiosResponse } from "axios";
import {RegistrationDataType} from "../bll/authReducer";


const instance = axios.create({
    baseURL:'http://localhost:7542/2.0/',
    withCredentials: true
})


//api
export const AppAPI = {
    ping() {
        return instance.get('ping')
    },
    register(data: RegistrationDataType) {
        return instance.post<RegistrationDataType, AxiosResponse>('auth/register', data)
    }
}