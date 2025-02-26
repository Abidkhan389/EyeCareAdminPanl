import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSettingFormComponent } from './app-setting-form.component';

describe('AppSettingFormComponent', () => {
  let component: AppSettingFormComponent;
  let fixture: ComponentFixture<AppSettingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppSettingFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppSettingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
