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
    {type: 'boost', count: 1},
    {type: 'time', count: 3},
    {type: 'add', count: 1}
  ];
  fiftyFiftyIndex: number = 0;
  askAFriendIndex: number = 1;
  timeIndex: number = 2;
  actionIndex: number = 3;

  constructor(private quizService: QuizService) {
  }

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
    if (!this.quizService.timer.isStopped) {
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
      console.log("Time booster used, remaining:", this.jokers[this.timeIndex].count);
      this.quizService.timer.addTime(5);
      this.toggleDropdown();
    }
  }

  addAction() {
    if (this.jokers[this.actionIndex].count > 0) {
      this.jokers[this.actionIndex].count--;
      console.log("Add action triggered, remaining:", this.jokers[this.actionIndex].count);
    }
  }
}
