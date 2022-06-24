import {CardsType, RandomSettingsType} from "../../bll/packReducer";



const testCardsArr = [
    {
        answer: "no answer1",
        cardsPack_id: "62aaf2ba67367c35fc2bca10",
        comments: "",
        created: "2022-06-16T09:10:25.142Z",
        grade: 0.2,
        more_id: "5eecf82a3ed8f700042f1186",
        question: "1",
        rating: 0,
        shots: 0,
        type: "card",
        updated: "2022-06-16T09:10:25.142Z",
        user_id: "5eecf82a3ed8f700042f1186",
        __v: 0,
        _id: "62aaf38167367c35fc2bca10"
    },
    {
        answer: "no answer2",
        cardsPack_id: "62aaf2ba67367c35fc2bca10",
        comments: "",
        created: "2022-06-16T09:10:25.142Z",
        grade: 0.7,
        more_id: "5eecf82a3ed8f700042f1186",
        question: "2",
        rating: 0,
        shots: 0,
        type: "card",
        updated: "2022-06-16T09:10:25.142Z",
        user_id: "5eecf82a3ed8f700042f1186",
        __v: 0,
        _id: "62aaf38167367c35fc2bca11"
    },
    {
        answer: "no answer3",
        cardsPack_id: "62aaf2ba67367c35fc2bca10",
        comments: "",
        created: "2022-06-16T09:10:25.142Z",
        grade: 1.2,
        more_id: "5eecf82a3ed8f700042f1186",
        question: "3",
        rating: 0,
        shots: 0,
        type: "card",
        updated: "2022-06-16T09:10:25.142Z",
        user_id: "5eecf82a3ed8f700042f1186",
        __v: 0,
        _id: "62aaf38167367c35fc2bca12"
    },
    {
        answer: "no answer4",
        cardsPack_id: "62aaf2ba67367c35fc2bca10",
        comments: "",
        created: "2022-06-16T09:10:25.142Z",
        grade: 1.7,
        more_id: "5eecf82a3ed8f700042f1186",
        question: "4",
        rating: 0,
        shots: 0,
        type: "card",
        updated: "2022-06-16T09:10:25.142Z",
        user_id: "5eecf82a3ed8f700042f1186",
        __v: 0,
        _id: "62aaf38167367c35fc2bca13"
    },
    {
        answer: "no answer5",
        cardsPack_id: "62aaf2ba67367c35fc2bca10",
        comments: "",
        created: "2022-06-16T09:10:25.142Z",
        grade: 2.1,
        more_id: "5eecf82a3ed8f700042f1186",
        question: "5",
        rating: 0,
        shots: 0,
        type: "card",
        updated: "2022-06-16T09:10:25.142Z",
        user_id: "5eecf82a3ed8f700042f1186",
        __v: 0,
        _id: "62aaf38167367c35fc2bca14"
    },
    {
        answer: "no answer6",
        cardsPack_id: "62aaf2ba67367c35fc2bca10",
        comments: "",
        created: "2022-06-16T09:10:25.142Z",
        grade: 2.3,
        more_id: "5eecf82a3ed8f700042f1186",
        question: "6",
        rating: 0,
        shots: 0,
        type: "card",
        updated: "2022-06-16T09:10:25.142Z",
        user_id: "5eecf82a3ed8f700042f1186",
        __v: 0,
        _id: "62aaf38167367c35fc2bca15"
    },
    {
        answer: "no answer7",
        cardsPack_id: "62aaf2ba67367c35fc2bca10",
        comments: "",
        created: "2022-06-16T09:10:25.142Z",
        grade: 0.3,
        more_id: "5eecf82a3ed8f700042f1186",
        question: "7",
        rating: 0,
        shots: 0,
        type: "card",
        updated: "2022-06-16T09:10:25.142Z",
        user_id: "5eecf82a3ed8f700042f1186",
        __v: 0,
        _id: "62aaf38167367c35fc2bca16"
    },
    {
        answer: "no answer8",
        cardsPack_id: "62aaf2ba67367c35fc2bca10",
        comments: "",
        created: "2022-06-16T09:10:25.142Z",
        grade: 0.9,
        more_id: "5eecf82a3ed8f700042f1186",
        question: "8",
        rating: 0,
        shots: 0,
        type: "card",
        updated: "2022-06-16T09:10:25.142Z",
        user_id: "5eecf82a3ed8f700042f1186",
        __v: 0,
        _id: "62aaf38167367c35fc2bca17"
    },
    {
        answer: "no answer9",
        cardsPack_id: "62aaf2ba67367c35fc2bca10",
        comments: "",
        created: "2022-06-16T09:10:25.142Z",
        grade: 3.2,
        more_id: "5eecf82a3ed8f700042f1186",
        question: "9",
        rating: 0,
        shots: 0,
        type: "card",
        updated: "2022-06-16T09:10:25.142Z",
        user_id: "5eecf82a3ed8f700042f1186",
        __v: 0,
        _id: "62aaf38167367c35fc2bca18"
    },
    {
        answer: "no answer10",
        cardsPack_id: "62aaf2ba67367c35fc2bca10",
        comments: "",
        created: "2022-06-16T09:10:25.142Z",
        grade: 4.8,
        more_id: "5eecf82a3ed8f700042f1186",
        question: "10",
        rating: 0,
        shots: 0,
        type: "card",
        updated: "2022-06-16T09:10:25.142Z",
        user_id: "5eecf82a3ed8f700042f1186",
        __v: 0,
        _id: "62aaf38167367c35fc2bca19"
    },
    {
        answer: "no answer11",
        cardsPack_id: "62aaf2ba67367c35fc2bca10",
        comments: "",
        created: "2022-06-16T09:10:25.142Z",
        grade: 3.7,
        more_id: "5eecf82a3ed8f700042f1186",
        question: "11",
        rating: 0,
        shots: 0,
        type: "card",
        updated: "2022-06-16T09:10:25.142Z",
        user_id: "5eecf82a3ed8f700042f1186",
        __v: 0,
        _id: "62aaf38167367c35fc2bca20"
    },
    {
        answer: "no answer12",
        cardsPack_id: "62aaf2ba67367c35fc2bca10",
        comments: "",
        created: "2022-06-16T09:10:25.142Z",
        grade: 1.9,
        more_id: "5eecf82a3ed8f700042f1186",
        question: "11",
        rating: 0,
        shots: 0,
        type: "card",
        updated: "2022-06-16T09:10:25.142Z",
        user_id: "5eecf82a3ed8f700042f1186",
        __v: 0,
        _id: "62aaf38167367c35fc2bca20"
    },
    {
        answer: "no answer13",
        cardsPack_id: "62aaf2ba67367c35fc2bca10",
        comments: "",
        created: "2022-06-16T09:10:25.142Z",
        grade: 2.5,
        more_id: "5eecf82a3ed8f700042f1186",
        question: "11",
        rating: 0,
        shots: 0,
        type: "card",
        updated: "2022-06-16T09:10:25.142Z",
        user_id: "5eecf82a3ed8f700042f1186",
        __v: 0,
        _id: "62aaf38167367c35fc2bca20"
    },
    {
        answer: "no answer14",
        cardsPack_id: "62aaf2ba67367c35fc2bca10",
        comments: "",
        created: "2022-06-16T09:10:25.142Z",
        grade: 4.9,
        more_id: "5eecf82a3ed8f700042f1186",
        question: "11",
        rating: 0,
        shots: 0,
        type: "card",
        updated: "2022-06-16T09:10:25.142Z",
        user_id: "5eecf82a3ed8f700042f1186",
        __v: 0,
        _id: "62aaf38167367c35fc2bca20"
    },
    {
        answer: "no answer15",
        cardsPack_id: "62aaf2ba67367c35fc2bca10",
        comments: "",
        created: "2022-06-16T09:10:25.142Z",
        grade: 0.1,
        more_id: "5eecf82a3ed8f700042f1186",
        question: "11",
        rating: 0,
        shots: 0,
        type: "card",
        updated: "2022-06-16T09:10:25.142Z",
        user_id: "5eecf82a3ed8f700042f1186",
        __v: 0,
        _id: "62aaf38167367c35fc2bca20"
    },
    {
        answer: "no answer16",
        cardsPack_id: "62aaf2ba67367c35fc2bca10",
        comments: "",
        created: "2022-06-16T09:10:25.142Z",
        grade: 0.4,
        more_id: "5eecf82a3ed8f700042f1186",
        question: "11",
        rating: 0,
        shots: 0,
        type: "card",
        updated: "2022-06-16T09:10:25.142Z",
        user_id: "5eecf82a3ed8f700042f1186",
        __v: 0,
        _id: "62aaf38167367c35fc2bca20"
    },
    {
        answer: "no answer17",
        cardsPack_id: "62aaf2ba67367c35fc2bca10",
        comments: "",
        created: "2022-06-16T09:10:25.142Z",
        grade:0.7,
        more_id: "5eecf82a3ed8f700042f1186",
        question: "11",
        rating: 0,
        shots: 0,
        type: "card",
        updated: "2022-06-16T09:10:25.142Z",
        user_id: "5eecf82a3ed8f700042f1186",
        __v: 0,
        _id: "62aaf38167367c35fc2bca20"
    },
    {
        answer: "no answer18",
        cardsPack_id: "62aaf2ba67367c35fc2bca10",
        comments: "",
        created: "2022-06-16T09:10:25.142Z",
        grade: 2.8,
        more_id: "5eecf82a3ed8f700042f1186",
        question: "11",
        rating: 0,
        shots: 0,
        type: "card",
        updated: "2022-06-16T09:10:25.142Z",
        user_id: "5eecf82a3ed8f700042f1186",
        __v: 0,
        _id: "62aaf38167367c35fc2bca20"
    },
    {
        answer: "no answer19",
        cardsPack_id: "62aaf2ba67367c35fc2bca10",
        comments: "",
        created: "2022-06-16T09:10:25.142Z",
        grade: 3.1,
        more_id: "5eecf82a3ed8f700042f1186",
        question: "11",
        rating: 0,
        shots: 0,
        type: "card",
        updated: "2022-06-16T09:10:25.142Z",
        user_id: "5eecf82a3ed8f700042f1186",
        __v: 0,
        _id: "62aaf38167367c35fc2bca20"
    },
    {
        answer: "no answer20",
        cardsPack_id: "62aaf2ba67367c35fc2bca10",
        comments: "",
        created: "2022-06-16T09:10:25.142Z",
        grade: 3.2,
        more_id: "5eecf82a3ed8f700042f1186",
        question: "11",
        rating: 0,
        shots: 0,
        type: "card",
        updated: "2022-06-16T09:10:25.142Z",
        user_id: "5eecf82a3ed8f700042f1186",
        __v: 0,
        _id: "62aaf38167367c35fc2bca20"
    },
    {
        answer: "no answer21",
        cardsPack_id: "62aaf2ba67367c35fc2bca10",
        comments: "",
        created: "2022-06-16T09:10:25.142Z",
        grade: 1.1,
        more_id: "5eecf82a3ed8f700042f1186",
        question: "11",
        rating: 0,
        shots: 0,
        type: "card",
        updated: "2022-06-16T09:10:25.142Z",
        user_id: "5eecf82a3ed8f700042f1186",
        __v: 0,
        _id: "62aaf38167367c35fc2bca20"
    },
    {
        answer: "no answer22",
        cardsPack_id: "62aaf2ba67367c35fc2bca10",
        comments: "",
        created: "2022-06-16T09:10:25.142Z",
        grade: 1.8,
        more_id: "5eecf82a3ed8f700042f1186",
        question: "11",
        rating: 0,
        shots: 0,
        type: "card",
        updated: "2022-06-16T09:10:25.142Z",
        user_id: "5eecf82a3ed8f700042f1186",
        __v: 0,
        _id: "62aaf38167367c35fc2bca20"
    },
    {
        answer: "no answer23",
        cardsPack_id: "62aaf2ba67367c35fc2bca10",
        comments: "",
        created: "2022-06-16T09:10:25.142Z",
        grade: 1.1,
        more_id: "5eecf82a3ed8f700042f1186",
        question: "11",
        rating: 0,
        shots: 0,
        type: "card",
        updated: "2022-06-16T09:10:25.142Z",
        user_id: "5eecf82a3ed8f700042f1186",
        __v: 0,
        _id: "62aaf38167367c35fc2bca20"
    },
    {
        answer: "no answer24",
        cardsPack_id: "62aaf2ba67367c35fc2bca10",
        comments: "",
        created: "2022-06-16T09:10:25.142Z",
        grade: 1.4,
        more_id: "5eecf82a3ed8f700042f1186",
        question: "11",
        rating: 0,
        shots: 0,
        type: "card",
        updated: "2022-06-16T09:10:25.142Z",
        user_id: "5eecf82a3ed8f700042f1186",
        __v: 0,
        _id: "62aaf38167367c35fc2bca20"
    },
    {
        answer: "no answer25",
        cardsPack_id: "62aaf2ba67367c35fc2bca10",
        comments: "",
        created: "2022-06-16T09:10:25.142Z",
        grade: 1.2,
        more_id: "5eecf82a3ed8f700042f1186",
        question: "11",
        rating: 0,
        shots: 0,
        type: "card",
        updated: "2022-06-16T09:10:25.142Z",
        user_id: "5eecf82a3ed8f700042f1186",
        __v: 0,
        _id: "62aaf38167367c35fc2bca20"
    },
] // тестовые данные
type cardsPoolType = {
    oneStarArr: CardsType[]
    twoStarArr: CardsType[]
    threeStarArr: CardsType[]
    fourStarArr: CardsType[]
}

//////////////////////////////////      Настройки работы функции smartRandom      /////////////////////////////////////

const defaultRandomSettings = {
    totalAmount: 5,                         // количество карточек в одной обучающей сессии
    fourStarCardsPercent: 10,               // % карточек с оценкой 4+ от общего числа карточек (numberOfCard)
    threeStarCardsPercent: 20,              // % карточек с оценкой 3+ от общего числа карточек (numberOfCard)
    twoStarCardsPercent: 30,                // % карточек с оценкой 2+ от общего числа карточек (numberOfCard)
}


// export const numberOfCard = 5
// const fourStarCardsPercent = 10
// const threeStarCardsPercent = 20
// const twoStarCardsPercent = 30

/////////////////   оставшееся число карточек будет заполнено карточками с оценкой 1    ///////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export const smartRandom = (arr:CardsType[]=testCardsArr, data: RandomSettingsType=defaultRandomSettings) => {

    if (arr.length < data.totalAmount) {    // если входной массив карточек меньше заданного количества -> возвращаем
        // console.log(arr)                // входной массив целиком
        return arr
    } else {
        let cardsPool: cardsPoolType = {
            oneStarArr: [],
            twoStarArr: [],
            threeStarArr: [],
            fourStarArr: [],
        }     // если входной массив карточек больше или равен заданному количеству
        arr.forEach((el)=>{
            switch(Math.ceil(el.grade)) {
                case 0: {
                    cardsPool.oneStarArr.push(el)
                    break
                }
                case 1: {
                    cardsPool.oneStarArr.push(el)
                    break
                }
                case 2: {
                    cardsPool.twoStarArr.push(el)
                    break
                }
                case 3: {
                    cardsPool.threeStarArr.push(el)
                    break
                }
                default: {
                    cardsPool.fourStarArr.push(el)
                }
            }
        })      // -> выполняем формирование выходного массива

        let resArr: CardsType[] = []            // создание результирующего массива


        // добавление карточек со значением оценки 4+

        // в случае, если количество карточек с нужной оценкой больше требуемого значения
        // производится рандомный выбор карточки из ассоциативного массива cardsPool,
        // добавление выбранной карточки в результирующий массив resArr
        // и удаление выбранной карточки из ассоциативного массива cardsPool
        // данная логика одинакова для каждой группы карточек

        if (cardsPool.fourStarArr.length > (Math.floor(data.totalAmount*(data.fourStarCardsPercent/100)))){
            for (let i=0; i<Math.floor(data.totalAmount*(data.fourStarCardsPercent/100));i++){
                const ind = Math.floor(Math.random()*cardsPool.fourStarArr.length)
                resArr.push(cardsPool.fourStarArr[ind])
                cardsPool.fourStarArr.splice(ind, 1)
            }
        } else if (cardsPool.fourStarArr.length > 0) {
            cardsPool.fourStarArr.forEach(el=>{
                resArr.push(el)
            })
            cardsPool.fourStarArr = []
        }

        // добавление карточек со значением оценки 3+

        if (cardsPool.threeStarArr.length > (Math.floor(data.totalAmount*(data.threeStarCardsPercent/100)))){
            for (let i=0; i<Math.floor(data.totalAmount*(data.threeStarCardsPercent/100));i++){
                const ind = Math.floor(Math.random()*cardsPool.threeStarArr.length)
                resArr.push(cardsPool.threeStarArr[ind])
                cardsPool.threeStarArr.splice(ind, 1)
            }
        } else if (cardsPool.threeStarArr.length > 0){
            cardsPool.threeStarArr.forEach(el=>{
                resArr.push(el)
            })
            cardsPool.threeStarArr = []
        }

        // добавление карточек со значением оценки 2+

        if (cardsPool.twoStarArr.length > (Math.floor(data.totalAmount*(data.twoStarCardsPercent/100)))){
            for (let i=0; i<Math.floor(data.totalAmount*(data.twoStarCardsPercent/100));i++){
                const ind = Math.floor(Math.random()*cardsPool.twoStarArr.length)
                resArr.push(cardsPool.twoStarArr[ind])
                cardsPool.twoStarArr.splice(ind, 1)
            }
        } else if (cardsPool.twoStarArr.length > 0){
            cardsPool.twoStarArr.forEach(el=>{
                resArr.push(el)
            })
            cardsPool.twoStarArr = []
        }

        // добавление карточек со значением оценки 1+

        while (resArr.length < data.totalAmount && cardsPool.oneStarArr.length>0){
            const ind = Math.floor(Math.random()*cardsPool.oneStarArr.length)
            resArr.push(cardsPool.oneStarArr[ind])
            cardsPool.oneStarArr.splice(ind, 1)
        }

        // проверка результирующего массива на заданную длину -> возврат результирующего массива или добавление недостающих карточек

        if (resArr.length < data.totalAmount){
            while (resArr.length < data.totalAmount){
                if (cardsPool.twoStarArr.length > 0){
                    const ind = Math.floor(Math.random()*cardsPool.twoStarArr.length)          // карточки добавляются по принципу:
                    resArr.push(cardsPool.twoStarArr[ind])                                        // сначала карточки
                    cardsPool.twoStarArr.splice(ind, 1)                                // с минимальной оценкой
                } else if (cardsPool.threeStarArr.length > 0){
                    const ind = Math.floor(Math.random()*cardsPool.threeStarArr.length)
                    resArr.push(cardsPool.threeStarArr[ind])
                    cardsPool.threeStarArr.splice(ind, 1)
                } else if (cardsPool.fourStarArr.length > 0){
                    const ind = Math.floor(Math.random()*cardsPool.fourStarArr.length)
                    resArr.push(cardsPool.fourStarArr[ind])
                    cardsPool.fourStarArr.splice(ind, 1)
                }
            }
        }

        console.log([...resArr])
        return resArr
    }
}