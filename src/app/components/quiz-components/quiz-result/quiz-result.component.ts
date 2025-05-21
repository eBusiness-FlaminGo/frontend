import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {ROUTES} from '../../../app.routes';

interface QuizResult {
  points: number;
  correctAnswers: number;
  totalQuestions: number;
  rank: number;
  ticketsEarned: number;
}

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  imports: [
    RouterLink
  ],
  styleUrls: ['./quiz-result.component.css']
})
export class QuizResultComponent {
  result: QuizResult = {
    points: 321,
    correctAnswers: 6,
    totalQuestions: 10,
    rank: 6,
    ticketsEarned: 3
  };
  protected readonly ROUTES = ROUTES;
}
