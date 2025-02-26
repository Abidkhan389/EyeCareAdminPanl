import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSettingListComponent } from './app-setting-list.component';

describe('AppSettingListComponent', () => {
  let component: AppSettingListComponent;
  let fixture: ComponentFixture<AppSettingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppSettingListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppSettingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
