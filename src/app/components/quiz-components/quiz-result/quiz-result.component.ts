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
  private readonly MAX_POINTS = 200;
  private readonly POINTS_PER_CORRECT = 20;
  private readonly ALL_CORRECT_BONUS_POINTS = 50;
  private readonly MAX_TICKETS = 10;
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

    this.result = {
      points: Math.min(
        this.MAX_POINTS,
        (correct + bonus) * this.POINTS_PER_CORRECT +
          (allCorrect ? this.ALL_CORRECT_BONUS_POINTS : 0),
      ),
      correctAnswers: correct,
      totalQuestions: total,
      rank: 1,
      ticketsEarned:
        Math.round((correct / total) * this.MAX_TICKETS) +
        (allCorrect ? this.ALL_CORRECT_BONUS_TICKETS : 0),
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
}
