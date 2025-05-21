import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizSelectionPageComponent } from './quiz-selection-page.component';

describe('QuizSelectionPageComponent', () => {
  let component: QuizSelectionPageComponent;
  let fixture: ComponentFixture<QuizSelectionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizSelectionPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizSelectionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
