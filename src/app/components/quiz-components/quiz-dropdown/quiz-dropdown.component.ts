import {Component} from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-quiz-dropdown',
  templateUrl: './quiz-dropdown.component.html',
  imports: [
    NgIf
  ],
  styleUrls: ['./quiz-dropdown.component.css']
})
export class QuizDropdownComponent {
  dropdownVisible = false;

  constructor(private quizService: QuizService) {
  }

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
    if (this.dropdownVisible) {
      this.quizService.timer.pause();
    } else {
      this.quizService.timer.resume();
    }
  }

  // Placeholder methods for dropdown buttons
  useFiftyFifty() {
    console.log("50/50 used");
  }

  useBoost() {
    console.log("Boost used");
  }

  useTime() {
    console.log("Time booster used");
  }

  addAction() {
    console.log("Add action triggered");
  }
}
