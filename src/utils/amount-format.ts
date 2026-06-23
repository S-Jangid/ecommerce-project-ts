export function amountFormat(amount: number){
    const result = Number((amount/100).toFixed(2));
    if(result < 0 ){
        return `-$${-result}`
    }
    return `$${result}`
}