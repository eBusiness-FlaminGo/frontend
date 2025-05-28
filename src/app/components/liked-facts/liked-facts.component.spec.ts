import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikedFactsComponent } from './liked-facts.component';

describe('LikedFactsComponent', () => {
  let component: LikedFactsComponent;
  let fixture: ComponentFixture<LikedFactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LikedFactsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LikedFactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
