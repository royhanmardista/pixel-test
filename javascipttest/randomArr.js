function randomArr(idxNum, dataNum) {

    if (typeof idxNum != "number" || typeof dataNum != "number") {
        // handle non number
        return "must be number"
    } else if (idxNum < 1 || dataNum < 1) {
        // handle bilangan kurang dari 0
        return "number must be atleast one or grater"
    }

    idxNum = Math.round(idxNum) // menghandle bilangan desimal    
    dataNum = Math.round(dataNum) // menghandle bilangan desimal 

    let stringArr = ",Wulan,Raharjo,Widya,Yuda,Cinta,Iskandar,Hidayat,Kusuma,Indah,Jusuf,"
    let array = []
    let temp = ""
    for (let i = 0; i < stringArr.length; i++) {
        if (stringArr[i] !== ",") {
            temp += stringArr[i]
        } else {
            if (temp) {
                array[array.length] = temp
                temp = ""
            }
        }
    }
    let result = []
    for (let i = 0; i < idxNum; i++) {
        let str = ""
        for (let j = 0; j < dataNum; j++) {
            str += array[Math.round(Math.random() * (array.length - 1))]
            if (j != dataNum - 1) {
                str += " "
            }
        }
        result[result.length] = str
    }
    return result
}

console.log(randomArr(-2, 3))
console.log(randomArr(-2, "dsf"))
console.log(randomArr(0, -3))
console.log(randomArr(5, -4))
console.log(randomArr(2, 3))
console.log(randomArr(5, 2))
console.log(randomArr(7, 8))
console.log(randomArr(1.2, 3.6))