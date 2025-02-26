import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentparentinformationComponent } from './studentparentinformation.component';

describe('StudentparentinformationComponent', () => {
  let component: StudentparentinformationComponent;
  let fixture: ComponentFixture<StudentparentinformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentparentinformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentparentinformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
