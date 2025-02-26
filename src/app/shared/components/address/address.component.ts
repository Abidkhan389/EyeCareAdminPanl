import { Component, Input, OnInit } from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormControl,
  Validators,
} from '@angular/forms';
import { AddressServiceService as AddressService } from '../../services/address-service.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss',
})
export class AddressComponent implements OnInit {
  @Input() form!: UntypedFormGroup;
  countries: any[] = [];
  states: any[] = [];
  selectedCountry: string | null = null;
  useStateDropdown: boolean = false;

  constructor(private addressService: AddressService) {}

  ngOnInit(): void {
    // Add controls to the form
    this.form.addControl(
      'address',
      new UntypedFormControl('', Validators.required)
    );
    this.form.addControl(
      'city',
      new UntypedFormControl('', Validators.required)
    );
    this.form.addControl(
      'state',
      new UntypedFormControl('', Validators.required)
    );
    this.form.addControl(
      'postalCode',
      new UntypedFormControl('', [Validators.pattern('[A-Za-z0-9]{3,10}')])
    );
    this.form.addControl(
      'country',
      new UntypedFormControl('', Validators.required)
    );
    this.form.addControl('geoLocation', new UntypedFormControl(''));
    this.form.addControl('notes', new UntypedFormControl(''));

    // Fetch country data from service
    this.countries = this.addressService.getCountries();

    // Watch for changes in the country field
    this.form.get('country')?.valueChanges.subscribe((selectedCountry) => {
      this.selectedCountry = selectedCountry;

      // If the country is USA or Canada, use the state dropdown
      if (selectedCountry === 'USA' || selectedCountry === 'CAN') {
        this.useStateDropdown = true;
        this.states = this.addressService.getStates(selectedCountry);
      } else {
        this.useStateDropdown = false;
        this.form.get('state')?.setValue(''); // Reset the state field when switching between input and dropdown
      }
    });
  }
}
