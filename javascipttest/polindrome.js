function polindrome(num) {
    const dict = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

    if (typeof num != "number") {
        // handle non number
        return "must be number"
    } else if (num < 1) {
        // handle bilangan kurang dari 0
        return "number must be atleast one or grater"
    }

    num = Math.round(num) // menghandle bilangan desimal
    const array = []
    let loop = Math.round(num / 2)
    for (let i = 0; i < loop; i++) {
        array[i] = dict[Math.round(Math.random() * (dict.length - 1))]
        if (i != loop - 1 || num % 2 == 0) {
            array[num - i - 1] = array[i]
        }
    }
    let result = ''
    for (let i = 0; i < array.length; i++) {
        // ini tidak boleh pake join ?
        result += array[i]
    }
    return result
}

console.log(polindrome('asdfsdf'))
console.log(polindrome(-4))
console.log(polindrome(6.2))
console.log(polindrome(3.2))
console.log(polindrome(1.8))
console.log(polindrome(1))
console.log(polindrome(5))
console.log(polindrome(4))
console.log(polindrome(6))
console.log(polindrome(7))
console.log(polindrome(3))