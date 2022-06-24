import {CardsType, DataForPlotType} from "../../bll/packReducer";

export const prepareDataForPlot = (data:DataForPlotType) => {
    let resultForPlot:number[] = [0,0,0,0,0]
    data.map((el)=>{
        switch (el){
            case 1:{
                resultForPlot[4]++
                break
            }
            case 2:{
                resultForPlot[3]++
                break
            }
            case 3:{
                resultForPlot[2]++
                break
            }
            case 4:{
                resultForPlot[1]++
                break
            }
            case 5:{
                resultForPlot[0]++
                break
            }
            default: {
                resultForPlot[4]++
                break
            }
        }
        return el

    })
    console.log(resultForPlot)
    return resultForPlot
}


export const preparePackDataForPlot = (data:CardsType[]) => {
    let resultPackDataForPlot:number[] = [0,0,0,0,0]
    data.map((el)=>{
        switch (Math.round(el.grade)){
            case 1:{
                resultPackDataForPlot[4]++
                break
            }
            case 2:{
                resultPackDataForPlot[3]++
                break
            }
            case 3:{
                resultPackDataForPlot[2]++
                break
            }
            case 4:{
                resultPackDataForPlot[1]++
                break
            }
            case 5:{
                resultPackDataForPlot[0]++
                break
            }
            default: {
                resultPackDataForPlot[4]++
                break
            }
        }
        return el

    })
    console.log(resultPackDataForPlot)
    return resultPackDataForPlot

}
