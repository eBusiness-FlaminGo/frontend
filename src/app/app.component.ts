import {Component, OnInit} from '@angular/core';
import {initFlowbite} from 'flowbite';
import {RouterOutlet} from '@angular/router';
import {NavigationComponent} from './components/shared/navigation/navigation.component';
import {HeaderComponent} from './components/shared/header/header.component';
import {NgIf} from '@angular/common';
import {isLoggedIn, isSetUp} from './utils/login';
import {QuizService} from './services/quiz.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavigationComponent, HeaderComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {

  constructor(protected quizService: QuizService) {
  }

  ngOnInit(): void {
    initFlowbite();
  }

  title = 'Brainstorm';
  protected readonly isLoggedIn = isLoggedIn;
  protected readonly isSetUp = isSetUp;
}
