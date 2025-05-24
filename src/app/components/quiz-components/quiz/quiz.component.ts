import {Component, OnInit, Input} from '@angular/core';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {QuizDropdownComponent} from '../quiz-dropdown/quiz-dropdown.component';
import {QuizService} from '../../../services/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  imports: [
    NgClass,
    NgForOf,
    NgIf,
    QuizDropdownComponent
  ]
})
export class QuizComponent implements OnInit {
  @Input() topic: string | null = null;

  constructor(private route: ActivatedRoute, protected quizService: QuizService) {
  }

  ngOnInit() {
    this.topic = this.route.snapshot.paramMap.get('topic');
    this.quizService.startGame();
  }
}
