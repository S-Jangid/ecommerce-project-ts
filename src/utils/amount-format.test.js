import { it, expect, describe} from 'vitest'
import { amountFormat } from './amount-format'

describe('formatMoney', ()=>{
    it('Formats 1999 cents as $19.99', () => {
        expect(amountFormat(1999)).toBe('$19.99');
    })
    
    it('Displays 2 decimals', () => {
        expect(amountFormat(1090)).toBe('$10.90');
        expect(amountFormat(100)).toBe('$1.00');

    })

    it('Handles 0', () => {
        expect(amountFormat(0)).toBe('$0.00');
    })

    it('Handles negative Price', () => {
        expect(amountFormat(-999)).toBe('-$9.99');
    })
})