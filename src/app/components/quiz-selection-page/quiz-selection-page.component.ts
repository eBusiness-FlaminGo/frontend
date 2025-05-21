import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-quiz-selection-page',
  imports: [
    FormsModule
  ],
  templateUrl: './quiz-selection-page.component.html',
  styleUrl: './quiz-selection-page.component.css'
})
export class QuizSelectionPageComponent {
  selectedCategory = '';
  weeklyCategory = 'Sci-fi';
}
