import {CardsPacksDataType, SearchSettingsType} from "../../bll/cardPacksReducer";

export const prepareDataForSearchRequest = (searchSettings: SearchSettingsType,
                                            options?: {
                                                searchName?: string,
                                                user_id?: string,
                                                sortType?: string
                                            }) => {
    let data = {} as CardsPacksDataType & { minMax?: number | number[] }
    for (let key in searchSettings) {
        if (searchSettings[key as keyof SearchSettingsType]) {
            data = {...data, [key]: searchSettings[key as keyof SearchSettingsType]}
        }
    }
    if (options && options.sortType) data = {...data, sortPacks: options.sortType }
    if (options && options.sortType === 'delete') delete data.sortPacks
    if (data.minMax && Array.isArray(data.minMax)) {
        data = {...data, min: data.minMax[0], max: data.minMax[1]}
        delete data.minMax
    }
    if (options && options.user_id) {
        data = {...data, user_id: options.user_id}
    }
    if (options && options.searchName && options.searchName.trim().length >= 0) data = {...data, packName: options.searchName} //Добавил для поиска по имени
    // console.log(data)
    return data
}
