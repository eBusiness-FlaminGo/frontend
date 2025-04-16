import {Component, OnInit} from '@angular/core';
import {initFlowbite} from 'flowbite';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    initFlowbite();
  }

  title = 'frontend-genai-fun-facts-app';
}
