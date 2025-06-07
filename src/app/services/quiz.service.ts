import {Injectable, signal} from '@angular/core';
import {ROUTES} from '../app.routes';
import {Router} from '@angular/router';
import {Timer} from '../classes/Timer';
import {firstValueFrom} from 'rxjs';
import {HttpClient} from '@angular/common/http';

interface QuizQuestion {
  question: string;
  answers: string[];
  correctAnswer: number;
  category: string;
  ad: string;
}

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private readonly API_URL = 'http://127.0.0.1:8000/quiz/question';
  private loading = signal<boolean>(false);
  private topic = signal<string | null>(null);
  questions = signal<QuizQuestion[]>([]);
  isLoading = this.loading.asReadonly();

  currentQuestionIndex = 0;
  selectedAnswerIndex: number | null = null;
  correctAnswers = 0;
  wrongAnswers = 0;
  bonus = 0;
  timer: Timer;
  private multiplierActive = signal<boolean>(false);
  private active = signal<boolean>(false);
  isActive = this.active.asReadonly();

  constructor(private router: Router, private http: HttpClient) {
    this.timer = new Timer(10);
  }

  async startGame(topic: string | null) {
    this.active.set(true);
    this.topic.set(topic ?? null);
    this.questions.set([])
    await this.loadQuestions(3)
    this.currentQuestionIndex = 0;
    this.selectedAnswerIndex = null;
    this.correctAnswers = 0;
    this.wrongAnswers = 0;
    this.bonus = 0;
    this.timer = new Timer(10, () => this.endGame());
    this.timer.start();
  }

  async loadQuestions(numberOfQuestions: number, loadAsync: boolean = false) {
    if (!loadAsync) {
      this.loading.set(true);
    }
    let url = this.API_URL;
    if (this.topic() !== null) {
      url += `?category=${encodeURIComponent(this.topic() ?? '')}`;
    }
    for (let i = 0; i < numberOfQuestions; i++) {
      const response = await firstValueFrom(this.http.get<{message: QuizQuestion}>(url));
      this.questions.update(questions => [...questions, response.message]);
      if (!loadAsync) {
        this.loading.set(numberOfQuestions !== this.questions().length)
      }
    }
  }

  selectAnswer(index: number) {
    if (this.selectedAnswerIndex !== null) return;

    this.timer.pause()
    this.selectedAnswerIndex = index;

    if (index === this.questions()[this.currentQuestionIndex].correctAnswer) {
      this.correctAnswers++;
      
      if ((this.timer.remainingTime + 2) <= 10) {
        this.timer.addTime(2)
      } else {
        this.timer.remainingTime = 10;
      }

      if(this.multiplierActive()) {
        this.bonus += 1;
        this.multiplierActive.set(false);
      }
    } else {
      this.wrongAnswers++;
    }
  }

  nextQuestion() {
    this.selectedAnswerIndex = null;
    this.timer.pause();
    this.loadQuestions(1, true)
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex >= this.questions().length) {
      this.endGame();
      return;
    }
    this.timer.resume()
  }

  endGame() {
    this.active.set(false);
    this.timer.stop();
    this.router.navigate([ROUTES.quizSelection, ROUTES.quizResults]);
  }

  useFiftyFifty(): boolean {
    const currentQuestion = this.questions()[this.currentQuestionIndex];
    if (this.selectedAnswerIndex !== null || currentQuestion.answers.length < 3) {
      return false;
    }
    const wrongAnswerIndices = currentQuestion.answers
      .map((_, index) => index)
      .filter(index => index !== currentQuestion.correctAnswer);

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

  activateMultiplier(): boolean {
    if (this.multiplierActive()) return false;
    this.multiplierActive.set(true);
    return true;
  }

  skipQuestion(): boolean {
    if (this.currentQuestionIndex >= this.questions().length - 1) {
      return false;
    }
    this.timer.pause()
    this.nextQuestion()
    return true;
  }
}
