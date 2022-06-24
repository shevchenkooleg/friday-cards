import {DataForPlotType} from "../../bll/packReducer";

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
