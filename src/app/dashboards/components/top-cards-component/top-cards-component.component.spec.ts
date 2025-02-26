import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopCardsComponentComponent } from './top-cards-component.component';

describe('TopCardsComponentComponent', () => {
  let component: TopCardsComponentComponent;
  let fixture: ComponentFixture<TopCardsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopCardsComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopCardsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
