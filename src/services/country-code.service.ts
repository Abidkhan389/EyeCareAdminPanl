import { Injectable } from '@angular/core';
import { CountryCode } from '../app/apiTypes/countrycode';

@Injectable({
  providedIn: 'root'
})
export class CountryCodeService {

  private countryCodes: CountryCode[] = [
    { code: '+1', name: 'United States' },
    { code: '+44', name: 'United Kingdom' },
    { code: '+91', name: 'India' },
    { code: '+86', name: 'China' },
    { code: '+61', name: 'Australia' },
    { code: '+33', name: 'France' },
    { code: '+49', name: 'Germany' },
    { code: '+39', name: 'Italy' },
    { code: '+81', name: 'Japan' },
    { code: '+7', name: 'Russia' },
    { code: '+55', name: 'Brazil' },
    { code: '+27', name: 'South Africa' },
    { code: '+82', name: 'South Korea' },
    { code: '+34', name: 'Spain' },
    { code: '+52', name: 'Mexico' },
    { code: '+60', name: 'Malaysia' },
    { code: '+63', name: 'Philippines' },
    { code: '+20', name: 'Egypt' },
    { code: '+43', name: 'Austria' },
    { code: '+46', name: 'Sweden' },
    { code: '+31', name: 'Netherlands' },
    { code: '+32', name: 'Belgium' },
    { code: '+48', name: 'Poland' },
    { code: '+98', name: 'Iran' },
    { code: '+92', name: 'Pakistan' },
    { code: '+60', name: 'Malaysia' },
    { code: '+971', name: 'United Arab Emirates' },
    { code: '+64', name: 'New Zealand' },
    { code: '+68', name: 'Kiribati' },
    { code: '+243', name: 'Democratic Republic of the Congo' },
    { code: '+45', name: 'Denmark' },
    { code: '+357', name: 'Cyprus' },
    { code: '+39', name: 'Italy' },
    { code: '+91', name: 'India' },
    { code: '+962', name: 'Jordan' }
  ];
  constructor() { }

  getCountryCodes(): CountryCode[] {
    return this.countryCodes;
  }
}
