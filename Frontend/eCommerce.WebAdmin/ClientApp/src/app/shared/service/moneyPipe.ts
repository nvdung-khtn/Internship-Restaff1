import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class MoneyPipe {
    public MoneyPipeVND(price: number): string {
        let rs = '';
        let number;
        while (price > 999) {
            number = price % 1000;
            if (number < 1000 && number > 100) {
                rs = ',' + number + rs;
            }
            if (number < 100 && number > 10) {
                rs = ',' + '0' + number + rs;
            }
            if (number < 10 && number > 0) {
                rs = ',' + '00' + number + rs;
            }

            if (number == 0) {
                rs = ',' + '000' + rs;
            }
            price -= number;
            price = Math.ceil(price / 1000);

        }
        rs = price + rs;
        return rs + 'đ';
    }
}