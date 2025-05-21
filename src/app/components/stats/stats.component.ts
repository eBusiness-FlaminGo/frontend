import { Component } from '@angular/core';
import {NgClass, NgForOf, NgIf} from '@angular/common';

interface Player {
  name: string;
  points: number;
  reward?: number;
  avatar: string;
}

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  imports: [
    NgClass,
    NgForOf,
    NgIf
  ],
  styleUrls: ['./stats.component.css']
})
export class StatsComponent {
  views = ['Week', 'Month', 'Friends'];
  currentView = 'Week';

  data: { [key: string]: Player[] } = {
    Week: [
      { name: 'Player 6', points: 350, reward: 1000, avatar: '🦊' },
      { name: 'Player 2', points: 250, reward: 700, avatar: '🐶' },
      { name: 'Player 3', points: 150, reward: 500, avatar: '🦝' },
      { name: 'Player 4', points: 95, reward: 400, avatar: '🧍‍♀️' },
      { name: 'Player 5', points: 85, reward: 300, avatar: '🍫' },
      { name: 'You', points: 75, reward: 200, avatar: '🦩' },
      { name: 'Player 7', points: 65, reward: 100, avatar: '🦊' }
    ],
    Month: [
      { name: 'You', points: 3650, reward: 1000, avatar: '🦩' },
      { name: 'Player 2', points: 2450, reward: 700, avatar: '🐶' },
      { name: 'Player 3', points: 1450, reward: 500, avatar: '🦝' },
      { name: 'Player 4', points: 950, reward: 400, avatar: '🧍‍♀️' },
      { name: 'Player 5', points: 850, reward: 300, avatar: '🍫' },
      { name: 'Player 6', points: 750, reward: 200, avatar: '🦊' },
      { name: 'Player 7', points: 650, reward: 100, avatar: '🦊' }
    ],
    Friends: [
      { name: 'You', points: 3650, avatar: '🦩' },
      { name: 'Player 2', points: 2450, avatar: '🐶' },
      { name: 'Player 3', points: 1450, avatar: '🦝' },
      { name: 'Player 4', points: 950, avatar: '🧍‍♀️' },
      { name: 'Player 5', points: 850, avatar: '🍫' }
    ]
  };

  switchView(view: string) {
    this.currentView = view;
  }

  get podium() {
    return this.data[this.currentView].slice(0, 3);
  }

  get rest() {
    return this.data[this.currentView].slice(3);
  }
}
