import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ROUTES} from '../../../app.routes';
import {NgForOf, NgIf} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-quiz-selection-page',
  imports: [
    FormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './quiz-selection-page.component.html',
  styleUrl: './quiz-selection-page.component.css'
})
export class QuizSelectionPageComponent {
  topics: string[] = [
    'Science',
    'History',
    'Geography',
    'Sports',
    'Movies',
    'Music',
    'Literature',
    'Technology'
  ];

  selectedCategory = '';
  weeklyCategory = this.topics[2];
  protected readonly ROUTES = ROUTES;
  showQuizPopup = false;
  isWeeklyQuiz = false;
  quizToStart = '';

  constructor(private router: Router) {
  }

  prepareQuiz(isWeekly: boolean): void {
    this.isWeeklyQuiz = isWeekly;
    this.quizToStart = isWeekly ? this.weeklyCategory : this.selectedCategory;
    this.showQuizPopup = true;
  }

  startQuiz(): void {
    this.showQuizPopup = false;
    this.router.navigate([
      ROUTES.quizSelection,
      ROUTES.quiz,
      this.quizToStart,
    ]);
  }

  goToShop(): void {
    this.showQuizPopup = false;
    this.router.navigate([`/${ROUTES.shop}`]);
  }

}
