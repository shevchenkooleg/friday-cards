import {CardsPacksDataType, SearchSettingsType} from "../../bll/cardPacksReducer";

export const prepareDataForSearchRequest = (searchSettings: SearchSettingsType, searchName: string, user_id?:string) => {
    let data = {} as CardsPacksDataType & { minMax?: number | number[] }
    for (let key in searchSettings) {
        if (searchSettings[key as keyof SearchSettingsType]) {
            data = {...data, [key]: searchSettings[key as keyof SearchSettingsType]}
        }
    }
    if (data.minMax && Array.isArray(data.minMax)) {
        data = {...data, min: data.minMax[0], max: data.minMax[1]}
        delete data.minMax
    }
    if (user_id) {
        data = {...data, user_id}
    }
    if (searchName.trim().length >= 0) data = {...data, packName: searchName} //Добавил для поиска по имени
    console.log(data)
    return data
}
