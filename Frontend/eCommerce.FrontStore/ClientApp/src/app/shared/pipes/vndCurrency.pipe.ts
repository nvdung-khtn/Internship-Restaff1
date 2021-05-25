import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'vndCurrency',
})
export class VndCurrencyPipe implements PipeTransform {
    transform(value: number): number {
        const result = !this.isNumeric(value)
            ? ''
            : this.numberWithCommas(
                  value.toLocaleString('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                  })
              );

        return value === null || value === undefined || result;
    }

    isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    numberWithCommas(n) {
        let val = n;
        const correctFormat = val.toString().replace(/\./g, ',');

        return correctFormat;
    }
}
