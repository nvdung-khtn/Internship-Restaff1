import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'saleoff',
})
export class SaleOffPipe implements PipeTransform {
    transform(value: number, percent?: number): number {
        const saleoff = percent ? (value * percent) / 100 : 0;
        return saleoff;
    }
}
