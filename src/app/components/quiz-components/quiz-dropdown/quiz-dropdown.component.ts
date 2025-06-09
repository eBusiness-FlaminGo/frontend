import {Component, effect, OnInit} from '@angular/core';
import {NgClass, NgIf} from '@angular/common';
import {QuizService} from '../../../services/quiz.service';
import {UserService} from '../../../services/user.service';
import {Joker} from '../../../models/joker.model';

@Component({
  selector: 'app-quiz-dropdown',
  templateUrl: './quiz-dropdown.component.html',
  imports: [
    NgIf,
    NgClass,
  ],
  styleUrls: ['./quiz-dropdown.component.css']
})
export class QuizDropdownComponent implements OnInit {
  dropdownVisible = false;
  jokers: Joker[] = [];
  fiftyFiftyIndex: number = -1;
  multiplyPointsIndex: number = -1;
  timeIndex: number = -1;
  skipQuestionIndex: number = -1;
  fadeOutActive: boolean = false;
  animationActive: boolean = false;
  dropdownIntervalId: any;

  constructor(private quizService: QuizService, private userService: UserService) {
    this.loadJokersFromUserService();

    // execute the loadJokerFromUserService function when the user profile signal changes
    effect(() => {
      const profile = this.userService.userProfile();
      this.loadJokersFromUserService();
    });
  }

  ngOnInit(): void {
    this.loadJokersFromUserService()
  }

  private loadJokersFromUserService(): void {
    this.jokers = [...this.userService.getJokers()];
    this.fiftyFiftyIndex = this.jokers.findIndex(joker => joker.type === 'FIFTY_FIFTY');
    this.multiplyPointsIndex = this.jokers.findIndex(joker => joker.type === 'MULTIPLY_POINTS');
    this.timeIndex = this.jokers.findIndex(joker => joker.type === 'EXTRA_TIME');
    this.skipQuestionIndex = this.jokers.findIndex(joker => joker.type === 'SKIP_QUESTION');
  }

  toggleDropdown() {
    if (!this.quizService.isLoading()) {
      this.dropdownVisible = !this.dropdownVisible;
      this.animationActive = true;
      setTimeout(() => {
        this.animationActive = false;
      }, 500)
      if (this.dropdownVisible) {
        this.dropdownIntervalId = setTimeout(() => {
          this.toggleDropdown()
        }, 5000)
      } else if (this.dropdownIntervalId) {
        clearInterval(this.dropdownIntervalId);
      }
      if (!this.quizService.timer.isStopped && !this.quizService.selectedAnswerIndex) {
        if (this.dropdownVisible) {
          this.quizService.timer.pause();
        } else {
          this.quizService.timer.resume();
        }
      }
    }
  }

  useFiftyFifty() {
    if (this.fiftyFiftyIndex !== -1 && this.jokers[this.fiftyFiftyIndex].count > 0) {
      if (this.quizService.useFiftyFifty()) {
        this.userService.useJoker('FIFTY_FIFTY');
        this.toggleDropdown();
      }
    }
  }

  multiplyPoints() {
    if (this.multiplyPointsIndex !== -1 && this.jokers[this.multiplyPointsIndex].count > 0) {
      this.userService.useJoker('MULTIPLY_POINTS');
      this.quizService.activateMultiplier();
      this.toggleDropdown();
    }
  }

  addTime() {
    if (this.timeIndex !== -1 && this.jokers[this.timeIndex].count > 0) {
      this.userService.useJoker('EXTRA_TIME');
      this.quizService.timer.addTime(5);
      this.toggleDropdown();
    }
  }

  async skipQuestion() {
    if (this.skipQuestionIndex !== -1 && this.jokers[this.skipQuestionIndex].count > 0) {
      this.toggleDropdown();
      if (await this.quizService.skipQuestion()) {
        this.userService.useJoker('SKIP_QUESTION');
      } else {
        console.log("Cannot skip the last question");
      }
    }
  }
}
