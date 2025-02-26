import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountformComponent } from './accountform.component';

describe('AccountformComponent', () => {
  let component: AccountformComponent;
  let fixture: ComponentFixture<AccountformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountformComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
