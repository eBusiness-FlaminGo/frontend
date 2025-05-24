import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizDropdownComponent } from './quiz-dropdown.component';

describe('QuizDropdownComponent', () => {
  let component: QuizDropdownComponent;
  let fixture: ComponentFixture<QuizDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
