import { Injectable } from '@angular/core';
import { CurrencyCode } from 'src/app/apiTypes/currencycode';

@Injectable({
  providedIn: 'root'
})
export class CurrencyCodeService {

  private currencyCodes: CurrencyCode[] = [
    { code: 'USD', name: 'USD' },
    { code: 'JD', name: 'JD' },
    { code: 'EUR', name: 'EUR' },
    { code: 'AUD', name: 'AUD' }, 
    { code: 'CAD', name: 'CAD' }
  ];
  constructor() { }

  getCurrencyCodes(): CurrencyCode[] {
    return this.currencyCodes;
  }
}
