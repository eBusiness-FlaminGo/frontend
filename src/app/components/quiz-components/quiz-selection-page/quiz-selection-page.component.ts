import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {ROUTES} from '../../../app.routes';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-quiz-selection-page',
  imports: [
    FormsModule,
    RouterLink,
    NgForOf
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

}
