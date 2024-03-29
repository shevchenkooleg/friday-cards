import axios, {AxiosResponse} from "axios";
import {
    LogInDataType,
    LogOutType,
    RegistrationDataType,
    RestorePasswordDataType,
    UpdatePasswordDataType
} from "../bll/authReducer";
import {UserdataForChangeType} from "../bll/profileReducer";
import {AddPackDataType, CardsPacksDataType} from "../bll/cardPacksReducer";
import {
    AddCardDataType,
    EditCardDataType,
    GradeCardDataType,
    SingleCardPackRequestDataType,
    UpdateCardsPackType
} from "../bll/packReducer";


const instance = axios.create({
    // baseURL: 'http://localhost:7542/2.0/',
    baseURL:'https://neko-back.herokuapp.com/2.0',
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
    logIn(data: LogInDataType) {
        return instance.post<LogInDataType, AxiosResponse>('/auth/login', data)
    },
    logOut() {
        return instance.delete<LogOutType, AxiosResponse>('/auth/me')
    },
    changeUserData(data: UserdataForChangeType) {
        return instance.put<UserdataForChangeType, AxiosResponse>('auth/me', data)
    },
    restorePassword(data: RestorePasswordDataType) {
        return instance.post<RestorePasswordDataType, AxiosResponse>('auth/forgot', data)
    },
    updatePassword(password: string, resetPasswordToken: string) {
        return instance.post<UpdatePasswordDataType, AxiosResponse>('/auth/set-new-password', {
            password,
            resetPasswordToken
        })
    }
}
export const CardsAPI = {
    getCardSPacks(data: CardsPacksDataType) {
        return instance.get<CardsPacksDataType, AxiosResponse>('/cards/pack', {params: data})
    },
    addCardsPack(data: AddPackDataType) {
        return instance.post<AddPackDataType, AxiosResponse>('/cards/pack', data)
    },
    getSingleCardPack(data: SingleCardPackRequestDataType) {
        return instance.get<SingleCardPackRequestDataType, AxiosResponse>('/cards/card', {params: data})
    },
    deleteCardsPack(id: string) {
        return instance.delete<LogOutType, AxiosResponse>('/cards/pack', {params: {id}})
    },
    updateCardsPack(data: UpdateCardsPackType) {
        return instance.put<UpdateCardsPackType, AxiosResponse>('/cards/pack', data)
    },
    addCard(data: AddCardDataType) {
        return instance.post<AddCardDataType, AxiosResponse>('/cards/card', data)
    },
    deleteCard(id: string) {
        return instance.delete<string, AxiosResponse>('/cards/card', {params: {id}})
    },
    putCard(data: EditCardDataType){
        return instance.put<EditCardDataType, AxiosResponse>('/cards/card', data)
    },
    gradeCard(data: GradeCardDataType){
        return instance.put<GradeCardDataType, AxiosResponse>('/cards/grade', data)
    },
}



