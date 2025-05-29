import {Component} from '@angular/core';
import {NgIf} from '@angular/common';
import {QuizService} from '../../../services/quiz.service';

interface Joker {
  type: string;
  count: number;
}

@Component({
  selector: 'app-quiz-dropdown',
  templateUrl: './quiz-dropdown.component.html',
  imports: [
    NgIf,
  ],
  styleUrls: ['./quiz-dropdown.component.css']
})
export class QuizDropdownComponent {
  dropdownVisible = false;
  jokers: Joker[] = [
    {type: 'fiftyFifty', count: 2},
    {type: 'askAFriend', count: 1},
    {type: 'time', count: 3},
    {type: 'skip', count: 3}
  ];
  fiftyFiftyIndex: number = 0;
  askAFriendIndex: number = 1;
  timeIndex: number = 2;
  skipQuestionIndex: number = 3;

  constructor(private quizService: QuizService) {
  }

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
    if (!this.quizService.timer.isStopped && !this.quizService.selectedAnswerIndex) {
      if (this.dropdownVisible) {
        this.quizService.timer.pause();
      } else {
        this.quizService.timer.resume();
      }
    }
  }

  useFiftyFifty() {
    if (this.jokers[this.fiftyFiftyIndex].count > 0) {
      if (this.quizService.useFiftyFifty()) {
        this.jokers[this.fiftyFiftyIndex].count--;
        this.toggleDropdown();
      }
    }
  }

  askAFriend() {
    if (this.jokers[this.askAFriendIndex].count > 0) {
      this.jokers[this.askAFriendIndex].count--;
      console.log("Asked a friend:", this.jokers[this.askAFriendIndex].count);
    }
  }

  addTime() {
    if (this.jokers[this.timeIndex].count > 0) {
      this.jokers[this.timeIndex].count--;
      console.log("Ask a friend used, remaining:", this.jokers[this.timeIndex].count);
      this.quizService.timer.addTime(5);
      this.toggleDropdown();
    }
  }

  async skipQuestion() {
    if (this.jokers[this.skipQuestionIndex].count > 0) {
      this.toggleDropdown();
      if (await this.quizService.skipQuestion()) {
        this.jokers[this.skipQuestionIndex].count--;
        console.log("Question skipped, remaining skips:", this.jokers[this.skipQuestionIndex].count);
      } else {
        console.log("Cannot skip the last question");
      }
    }
  }
}
