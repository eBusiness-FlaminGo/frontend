import {Injectable} from '@angular/core';
import {ROUTES} from '../app.routes';
import {ActivatedRoute, Router} from '@angular/router';
import {Timer} from '../classes/Timer';

interface QuizQuestion {
  question: string;
  answers: string[];
  correctAnswerIndex: number;
  adText?: string;
}

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  questions: QuizQuestion[] = [
    {
      question: 'What is the correct answer to this question?',
      answers: ['Answer', 'Badge', 'Badge', 'Badge'],
      correctAnswerIndex: 0,
      adText: 'Learn more about correct answers at QuizMaster Pro!'
    },
    {
      question: 'Another sample question?',
      answers: ['Wrong', 'Right', 'Wrong', 'Wrong'],
      correctAnswerIndex: 1,
      adText: 'Boost your knowledge with our premium content.'
    },
    {
      question: 'Yet another sample question?',
      answers: ['Wrong', 'Right', 'Wrong', 'Wrong'],
      correctAnswerIndex: 1,
      adText: 'Struggling with trivia? Try the SmartQuiz app now!'
    }
  ];

  currentQuestionIndex = 0;
  selectedAnswerIndex: number | null = null;
  correctAnswers = 0;
  wrongAnswers = 0;
  timer: Timer;
  isActive = false;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.timer = new Timer(10);
  }

  startGame() {
    this.isActive = true;
    this.currentQuestionIndex = 0;
    this.selectedAnswerIndex = null;
    this.correctAnswers = 0;
    this.wrongAnswers = 0;
    this.timer = new Timer(10, () => this.endGame());
    this.timer.start();
  }

  selectAnswer(index: number) {
    if (this.selectedAnswerIndex !== null) return;

    this.selectedAnswerIndex = index;

    if (index === this.questions[this.currentQuestionIndex].correctAnswerIndex) {
      this.correctAnswers++;
    } else {
      this.wrongAnswers++;
    }

    this.timer.stop();
  }

  nextQuestion() {
    this.selectedAnswerIndex = null;
    this.currentQuestionIndex++;

    if (this.currentQuestionIndex >= this.questions.length) {
      this.endGame();
      return;
    }

    this.timer = new Timer(10, () => this.endGame());
    this.timer.start();
  }

  endGame() {
    this.isActive = false;
    this.timer.stop();
    this.router.navigate([ROUTES.quizSelection, ROUTES.quizResults]);
  }
}
