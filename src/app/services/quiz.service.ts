import {Injectable} from '@angular/core';
import {ROUTES} from '../app.routes';
import {ActivatedRoute, Router} from '@angular/router';
import {Timer} from '../classes/Timer';

interface QuizQuestion {
  question: string;
  answers: string[];
  correctAnswerIndex: number;
  adText?: string;
  category: string;
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
      category: 'ad1'
    },
    {
      question: 'Another sample question?',
      answers: ['Wrong', 'Right', 'Wrong', 'Wrong'],
      correctAnswerIndex: 1,
      category: 'ad2'
    },
    {
      question: 'Yet another sample question?',
      answers: ['Wrong', 'Right', 'Wrong', 'Wrong'],
      correctAnswerIndex: 1,
      category: ''
    }
  ];

  currentQuestionIndex = 0;
  selectedAnswerIndex: number | null = null;
  correctAnswers = 0;
  wrongAnswers = 0;
  timer: Timer;
  isActive = false;

  constructor(private router: Router) {
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

    this.timer.pause()
    this.selectedAnswerIndex = index;

    if (index === this.questions[this.currentQuestionIndex].correctAnswerIndex) {
      this.correctAnswers++;
      this.timer.addTime(2)
    } else {
      this.wrongAnswers++;
    }

    //this.timer.stop();
  }

  nextQuestion() {
    this.selectedAnswerIndex = null;
    this.currentQuestionIndex++;

    if (this.currentQuestionIndex >= this.questions.length) {
      this.endGame();
      return;
    }

    //this.timer = new Timer(10, () => this.endGame());
    //this.timer.start();
    this.timer.resume()
  }

  endGame() {
    this.isActive = false;
    this.timer.stop();
    this.router.navigate([ROUTES.quizSelection, ROUTES.quizResults]);
  }

  useFiftyFifty(): boolean {
    const currentQuestion = this.questions[this.currentQuestionIndex];
    if (this.selectedAnswerIndex !== null || currentQuestion.answers.length < 3) {
      return false;
    }
    const wrongAnswerIndices = currentQuestion.answers
      .map((_, index) => index)
      .filter(index => index !== currentQuestion.correctAnswerIndex);

    for (let i = wrongAnswerIndices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [wrongAnswerIndices[i], wrongAnswerIndices[j]] = [wrongAnswerIndices[j], wrongAnswerIndices[i]];
    }

    const indicesToHide = wrongAnswerIndices.slice(0, 2);

    indicesToHide.forEach(index => {
      currentQuestion.answers[index] = '';
    });

    return true;
  }

  skipQuestion(): boolean {
    if (this.currentQuestionIndex >= this.questions.length - 1) {
      return false;
    }
    this.timer.pause()
    this.nextQuestion()
    return true;
  }
}
