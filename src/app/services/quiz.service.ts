import {Injectable} from '@angular/core';
import {ROUTES} from '../app.routes';
import {ActivatedRoute, Router} from '@angular/router';

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
  timeLeft = 10;
  intervalId: any;

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  startGame() {
    this.currentQuestionIndex = 0;
    this.selectedAnswerIndex = null;
    this.correctAnswers = 0;
    this.wrongAnswers = 0;
    this.timeLeft = 10
    this.startTimer();
  }

  startTimer() {
    this.intervalId = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.endGame();
      }
    }, 1000);
  }

  selectAnswer(index: number) {
    if (this.selectedAnswerIndex !== null) return;

    this.selectedAnswerIndex = index;

    if (index === this.questions[this.currentQuestionIndex].correctAnswerIndex) {
      this.correctAnswers++;
    } else {
      this.wrongAnswers++;
    }

    clearInterval(this.intervalId);
  }

  nextQuestion() {
    this.selectedAnswerIndex = null;
    this.timeLeft = 10;
    this.currentQuestionIndex++;

    console.log(this.currentQuestionIndex);
    console.log(this.questions.length);
    if (this.currentQuestionIndex >= this.questions.length) {
      this.endGame();
      return;
    }

    this.startTimer();
  }

  endGame() {
    clearInterval(this.intervalId);
    console.log('Game Over');
    this.router.navigate([ROUTES.quizSelection, ROUTES.quizResults]);
  }
}
