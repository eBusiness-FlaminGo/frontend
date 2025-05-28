import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ROUTES } from '../../../app.routes';
import { QuizService } from '../../../services/quiz.service';

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
  imports: [RouterLink],
  styleUrls: ['./quiz-result.component.css'],
})
export class QuizResultComponent {
  result: QuizResult;

  protected readonly ROUTES = ROUTES;
  private readonly POINTS_PER_CORRECT = 20;
  private readonly ALL_CORRECT_BONUS_POINTS = 50;
  private readonly MAX_TICKETS = 10;
  private readonly ALL_CORRECT_BONUS_TICKETS = 2;

  constructor(private quizService: QuizService) {
    const correct = this.quizService.correctAnswers;
    const total = this.quizService.questions.length;
    const allCorrect = correct === total;

    this.result = {
      points:
        correct * this.POINTS_PER_CORRECT +
        (allCorrect ? this.ALL_CORRECT_BONUS_POINTS : 0),
      correctAnswers: correct,
      totalQuestions: total,
      rank: 1,
      ticketsEarned:
        Math.round((correct / total) * this.MAX_TICKETS) +
        (allCorrect ? this.ALL_CORRECT_BONUS_TICKETS : 0),
    };
  }
}
