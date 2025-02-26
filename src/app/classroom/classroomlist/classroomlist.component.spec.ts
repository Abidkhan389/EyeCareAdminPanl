import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomlistComponent } from './classroomlist.component';

describe('ClassroomComponent', () => {
  let component: ClassroomlistComponent;
  let fixture: ComponentFixture<ClassroomlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassroomlistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassroomlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
