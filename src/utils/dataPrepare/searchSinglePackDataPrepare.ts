import {SingleCardPackRequestDataType} from "../../bll/packReducer";

export const prepareSingleDataForSearchRequest = (
                                            options?: {
                                                searchName?: string,
                                                cardsPack_id?: string,
                                                sortType?: string
                                            }) => {
    let data = {} as SingleCardPackRequestDataType
    if (options && options.sortType) data = {...data, sortCards: options.sortType, cardsPack_id: options.cardsPack_id }
    if (options && options.sortType === 'delete') delete data.sortCards

    //todo сделать поиск через утилиту ->
    // if (options && options.searchName && options.searchName.trim().length >= 0) data = {...data, packName: options.searchName} //Добавил для поиска по имени
    console.log(data)
    return data
}
