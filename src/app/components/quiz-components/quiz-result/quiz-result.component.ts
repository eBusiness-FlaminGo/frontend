import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ROUTES } from '../../../app.routes';
import { QuizService } from '../../../services/quiz.service';
import { UserService } from '../../../services/user.service';

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
  private readonly MAX_POINTS: number;
  private readonly POINTS_PER_CORRECT = 20;
  private readonly ALL_CORRECT_BONUS_POINTS = 50;
  private readonly TICKETS_PER_CORRECT = 1;
  private readonly ALL_CORRECT_BONUS_TICKETS = 2;

  constructor(
    private quizService: QuizService,
    private userService: UserService,
    private router: Router,
  ) {
    const correct = this.quizService.correctAnswers;
    const bonus = this.quizService.bonus;
    const total = this.quizService.currentQuestionIndex + 1;
    const allCorrect = correct === total;
    this.MAX_POINTS = total * 10;

    this.result = {
      points:
        (correct + bonus) * this.POINTS_PER_CORRECT +
          (allCorrect ? this.ALL_CORRECT_BONUS_POINTS : 0),
      correctAnswers: correct,
      totalQuestions: total,
      rank: 1,
      ticketsEarned:
        correct * this.TICKETS_PER_CORRECT +
          (allCorrect ? this.ALL_CORRECT_BONUS_TICKETS : 0)
    };
  }

  collectTickets() {
    this.userService.addTickets(this.result.ticketsEarned);
    this.router.navigate([`/${ROUTES.root}/${ROUTES.quizSelection}`]);
  }

  get pointsBarHeight(): string {
    const minHeight = 50;
    const maxHeight = 200;
    const percent = Math.min(1, this.result.points / this.MAX_POINTS);
    const height = minHeight + (maxHeight - minHeight) * percent;
    return `${height}px`;
  }

  getOrdinal(rank: number): string {
    const lastTwoDigits = rank % 100;
    const lastDigit = rank % 10;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
      return rank + 'th';
    }

    switch (lastDigit) {
      case 1: return rank + 'st';
      case 2: return rank + 'nd';
      case 3: return rank + 'rd';
      default: return rank + 'th';
    }
  }
}
