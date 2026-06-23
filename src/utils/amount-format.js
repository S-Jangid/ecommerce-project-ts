export function amountFormat(amount){
    const result = (amount/100).toFixed(2);
    if(result < 0 ){
        return `-$${-result}`
    }
    return `$${result}`
}