import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassRoomManagegementComponent } from './class-room-managegement.component';

describe('ClassRoomManagegementComponent', () => {
  let component: ClassRoomManagegementComponent;
  let fixture: ComponentFixture<ClassRoomManagegementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassRoomManagegementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassRoomManagegementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
