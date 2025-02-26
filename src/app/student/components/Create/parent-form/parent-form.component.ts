import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { CountryCodeService } from '../../../../../services/country-code.service';
import { CountryCode } from '../../../../apiTypes/countrycode';
import { ParentPerson } from '../../../../apiTypes/parentperson';
import { Messages } from '../../../../shared/Validators/validation-messages';

@Component({
  selector: 'app-parent-form',
  templateUrl: './parent-form.component.html',
  styleUrl: './parent-form.component.scss',
})
export class ParentFormComponent {
  parentFormGroup!: FormGroup;
  countryCodes!: CountryCode[];
  @Input() parentData!: ParentPerson[];
  selectedCountryCode: string = '';
  filteredCountryCodes: CountryCode[] = [];
  validationMessages = Messages.validation_messages;
  connectWithAccountCheck: boolean = false;
  @Output() accountParentToggle = new EventEmitter<boolean>();

  constructor(
    private fb: FormBuilder,
    private countryCodeService: CountryCodeService
  ) {
    this.parentFormGroup = this.fb.group({
      parents: this.fb.array([this.createParentFormGroup()]), // FormArray named 'parents'
    });
  }
  ngOnInit(): void {
    this.parentFormGroup = this.fb.group({
      parents: this.fb.array([this.createParentFormGroup()]),
    });
    this.countryCodes = this.countryCodeService.getCountryCodes();
    if (this.parentData && this.parentData.length) {
      this.patchFormValues(this.parentData);
    }
  }
  get parentsForm(): FormArray {
    return this.parentFormGroup.get('parents') as FormArray;
  }
  createParentFormGroup(): FormGroup {
    const group = this.fb.group({
      countryCode: ['+1', Validators.required],
      homePhone: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      employer: [''],
      isEmployed: [true],
      employerNumber: [''],
      employerAddress: [''],
      emergencyContact: ['', Validators.required],
      salary: [null, Validators.required],
      connectWithAccount: [false],
    });
    group.get('isEmployed')?.valueChanges.subscribe((isEmployed: boolean | null) => {
      const salaryControl = group.get('salary');
      if (isEmployed) {
        // Add the required validator when employed
        salaryControl?.setValidators(Validators.required);
      } else {
        // Remove the validator when not employed
        salaryControl?.clearValidators();
      }
      // Update validation status
      salaryControl?.updateValueAndValidity();
    });
  
    return group;
  }
  addParentForm(): void {
    this.parentsForm.push(this.createParentFormGroup());
  }

  removeParentForm(index: number): void {
    if (this.parentsForm.length > 1) {
      this.parentsForm.removeAt(index);
    }
  }

  // Method to get data for saving
  getData(): ParentPerson[] {
    // Using optional chaining to safely access `parents`
    const parentDataArray =
      this.parentsForm.value?.map((parent: any) => ({
        id: parent.id,
        countryCode: parent.countryCode || '',
        firstName: parent.firstName || '',
        lastName: parent.lastName || '',
        homePhone: parent.homePhone || '',
        employer: parent.employer || '',
        isEmployed: parent.isEmployed ?? false, // Defaulting to false
        isActive: parent.isActive ?? false,
        employerNumber: parent.employerNumber || '',
        employerAddress: parent.employerAddress || '',
        emergencyContact: parent.emergencyContact || '',
        salary: parent.salary ?? 0, // Defaulting to 0 if not provided
        connectWithAccount: parent.connectWithAccount ?? false,
      })) || []; // Defaulting to an empty array if parents is undefined

    return parentDataArray;
  }

  isValid(): boolean {
    return this.parentsForm.valid;
  }
  markFormFieldsAsDirty(): void {
    if (this.parentsForm) {
      this.parentsForm.markAllAsTouched();
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    // if (changes['parentData'] && changes['parentData'].currentValue) {
    //   this.patchFormValues(changes['parentData'].currentValue);
    // }
    if (changes['parentData'] && changes['parentData'].currentValue && this.parentFormGroup) {
      this.patchFormValues(changes['parentData'].currentValue);
    }
  }
  patchFormValues(data: ParentPerson[]): void {
    const formArray = this.parentsForm;
  
    // Clear the form array before patching new values
    formArray.clear();
  
    // Populate form array with new values
    data.forEach((parent) => {
      formArray.push(this.fb.group({
        id: [parent.id],
        countryCode: [parent.countryCode || '', Validators.required],
        firstName: [parent.firstName || '', Validators.required],
        lastName: [parent.lastName || '', Validators.required],
        homePhone: [parent.homePhone || ''],
        employer: [parent.employer || ''],
        isEmployed: [parent.isEmployed ?? false],
        isActive: [parent.isActive ?? false],
        employerNumber: [parent.employerNumber || ''],
        employerAddress: [parent.employerAddress || ''],
        emergencyContact: [parent.emergencyContact || ''],
        salary: [parent.salary ?? 0],
        connectWithAccount: [parent.connectWithAccount ?? false],
      }));
    });
  }
  SearchCountryCode(value: string): void {
    // Filter the country codes based on search input
    this.filteredCountryCodes = this.countryCodes.filter((option) =>
      option.name.toLowerCase().includes(value.toLowerCase())
    );
  }
  onToggleAlreadyAccount(value: boolean): void {
    if (value === true) {
      this.connectWithAccountCheck = true;
      // Emit the value to the parent component
      this.accountParentToggle.emit(this.connectWithAccountCheck);
    } else {
      this.connectWithAccountCheck = false;
      // Emit the value to the parent component
      this.accountParentToggle.emit(this.connectWithAccountCheck);
    }
  }
  isAtLeastOneAccountConnected(): boolean {
    return this.parentsForm.value.some((parent: any) => parent.connectWithAccount);
  }
}
