import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentinformationComponent } from './studentinformation.component';

describe('StudentinformationComponent', () => {
  let component: StudentinformationComponent;
  let fixture: ComponentFixture<StudentinformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentinformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentinformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
