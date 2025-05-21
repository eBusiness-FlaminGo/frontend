import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {ROUTES} from '../../../app.routes';

@Component({
  selector: 'app-quiz-selection-page',
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './quiz-selection-page.component.html',
  styleUrl: './quiz-selection-page.component.css'
})
export class QuizSelectionPageComponent {
  selectedCategory = '';
  weeklyCategory = 'Sci-fi';
  protected readonly ROUTES = ROUTES;
}
