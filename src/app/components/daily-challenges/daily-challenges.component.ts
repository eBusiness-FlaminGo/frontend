import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-daily-challenges',
  templateUrl: './daily-challenges.component.html',
  styleUrls: ['./daily-challenges.component.css'],
  imports: [CommonModule],
})
export class DailyChallengesComponent {
  timeLeft = '10h';
  activeChallenges = [
    {
      icon: 'brain',
      title: 'Score 300 Points in quiz mode',
      current: 250,
      goal: 300,
      progress: (250 / 300) * 100,
      reward: 15,
    },
    { icon: 'share', title: 'Share a fact', reward: 10 },
    { icon: 'book', title: 'Read 5 facts about music', reward: 5 },
  ];
  completedChallenges = [{ title: 'Find an astronomy fact', reward: 20 }];
}
