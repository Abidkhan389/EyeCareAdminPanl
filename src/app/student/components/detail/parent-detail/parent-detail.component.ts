import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParentPerson } from '../../../../apiTypes/parentperson';

@Component({
  selector: 'app-parent-detail',
  templateUrl: './parent-detail.component.html',
  styleUrl: './parent-detail.component.scss'
})
export class ParentDetailComponent {
  @Input() parentData!: ParentPerson[];
  constructor(private fb: FormBuilder) {
   
  }

}

