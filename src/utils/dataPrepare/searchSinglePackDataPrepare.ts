import {SingleCardPackRequestDataType, SinglePackSearchSettingsType} from "../../bll/packReducer";

export const prepareSingleDataForSearchRequest = (
    options?: {
        searchName?: string,
        cardsPack_id?: string,
        sortType?: string,
        page?: number,
    }) => {
    let data = {} as SingleCardPackRequestDataType
    if (options && options.sortType) data = {...data, sortCards: options.sortType, cardsPack_id: options.cardsPack_id}
    if (options && options.sortType === 'delete') delete data.sortCards
    if (options && options.cardsPack_id) data = {...data, cardsPack_id: options.cardsPack_id}
    if (options && options.page) data = {...data, page: options.page}

    return data
}

export const prepareSinglePackDataForSearchRequest = (searchSettingsSinglePack: SinglePackSearchSettingsType,
                                                      options?: {
                                                          searchName?: string,
                                                          user_id?: string,
                                                          sortType?: string,
                                                          cardsPack_id?: string,
                                                          cardAnswer?: string,
                                                      }) => {

    let data = {} as SinglePackSearchSettingsType

    for (let key in searchSettingsSinglePack) {
        if (searchSettingsSinglePack[key as keyof SinglePackSearchSettingsType]) {
            data = {...data, [key]: searchSettingsSinglePack[key as keyof SinglePackSearchSettingsType]}
        }
    }
    if (options && options.cardsPack_id) data= {...data, cardsPack_id: options.cardsPack_id}

    return data
}
