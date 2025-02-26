import { TestBed } from '@angular/core/testing';

import { ProfileSettingService } from './profile-setting.service';

describe('ProfileSettingService', () => {
  let service: ProfileSettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileSettingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
