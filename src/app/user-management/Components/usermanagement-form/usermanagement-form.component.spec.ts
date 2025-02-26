import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsermanagementFormComponent } from './usermanagement-form.component';

describe('UsermanagementFormComponent', () => {
  let component: UsermanagementFormComponent;
  let fixture: ComponentFixture<UsermanagementFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsermanagementFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsermanagementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
