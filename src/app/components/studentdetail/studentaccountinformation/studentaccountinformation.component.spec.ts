import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentaccountinformationComponent } from './studentaccountinformation.component';

describe('StudentaccountinformationComponent', () => {
  let component: StudentaccountinformationComponent;
  let fixture: ComponentFixture<StudentaccountinformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentaccountinformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentaccountinformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
