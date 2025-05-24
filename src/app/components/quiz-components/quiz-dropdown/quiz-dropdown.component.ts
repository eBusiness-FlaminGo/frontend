import {Component} from '@angular/core';
import {NgIf, NgClass} from '@angular/common';
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
    if (this.jokers[0].count > 0) {
      this.jokers[0].count--;
      console.log("50/50 used, remaining:", this.jokers[0].count);
    }
  }

  useBoost() {
    if (this.jokers[1].count > 0) {
      this.jokers[1].count--;
      console.log("Boost used, remaining:", this.jokers[1].count);
    }
  }

  useTime() {
    if (this.jokers[2].count > 0) {
      this.jokers[2].count--;
      console.log("Time booster used, remaining:", this.jokers[2].count);
    }
  }

  addAction() {
    if (this.jokers[3].count > 0) {
      this.jokers[3].count--;
      console.log("Add action triggered, remaining:", this.jokers[3].count);
    }
  }
}
