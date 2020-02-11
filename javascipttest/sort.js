let numeric = [10, 9, 102, 66, 5421, 1, 0]
let string = 'Wulan,Raharjo,Widya,Yuda,Cinta,Iskandar,Hidayat,Kusuma,Indah,Jusuf'
let alphanumeric = 'Wulan,Raharjo,Widya,10,9,102,66,5421,1,0,Yuda,Cinta,Iskandar,Hidayat,Kusuma,Indah,Jusuf'
let arrayAlphanumberic = ["Wulan", 1, 3, "Darto", "Cinta", "Cantik", "1makan", "000"]
let random = '1Wulan,4Raharjo,Widya,10,9,102,Yuda,Cinta,Iskandar'


function costumSort(input, order = 'asc') {
    let array = []
    if (input.constructor != Array) { //handling case if input is not an array but string
        let temp = ""
        for (let i = 0; i < input.length; i++) {
            if (input[i] !== ",") {
                temp += input[i]
            } else {
                if (temp) {
                    if (isNaN(temp)) { //converting number string if input is string
                        array[array.length] = temp
                    } else {
                        array[array.length] = Number(temp)
                    }
                    temp = ""
                }
            }
        }
        input = array
    }
    for (let i = 0; i < input.length; i++) {
        var idxMin = i
        for (let j = i + 1; j < input.length; j++) {
            if (typeof input[j] === typeof input[idxMin]) {
                if (order === 'desc') {
                    if (input[j] > input[idxMin]) {
                        idxMin = j
                    }
                } else {
                    if (input[j] < input[idxMin]) {
                        idxMin = j
                    }
                }
            }
            if (order === 'desc') {
                if (typeof input[j] > typeof input[idxMin]) {
                    idxMin = j
                }
            } else {
                if (typeof input[j] < typeof input[idxMin]) {
                    idxMin = j
                }
            }

        }
        var temp = input[idxMin]
        input[idxMin] = input[i]
        input[i] = temp
    }
    return input
}

console.log(costumSort(numeric))
console.log(costumSort(string))
console.log(costumSort(alphanumeric))
console.log(costumSort(arrayAlphanumberic))
console.log(costumSort(random))
console.log(costumSort(numeric, 'desc'))
console.log(costumSort(string, 'desc'))
console.log(costumSort(alphanumeric, 'desc'))
console.log(costumSort(arrayAlphanumberic, 'desc'))
console.log(costumSort(random, 'desc'))