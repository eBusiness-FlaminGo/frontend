import {Component, OnInit} from '@angular/core';
import {NgClass, NgForOf, NgIf, SlicePipe} from '@angular/common';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {ROUTES} from '../../app.routes';

interface Reward {
  icon: string;
  label: string;
  count: number;
  type: 'TICKETS' | 'JOKER';
  jokerType?: string;
}

@Component({
  selector: 'app-loot-box-detail-page',
  templateUrl: './loot-box-detail-page.component.html',
  imports: [
    NgClass,
    NgForOf,
    NgIf,
    SlicePipe
  ],
  styleUrls: ['./loot-box-detail-page.component.css']
})
export class LootBoxDetailPageComponent implements OnInit {
  chestOpen = false;
  rewards: Reward[] = [
    {icon: '🎟️', label: 'Tickets', count: 50, type: 'TICKETS'},
    {icon: '50/50', label: 'think less', count: 3, type: 'JOKER', jokerType: 'FIFTY_FIFTY'},
    {icon: '⏱️', label: 'Extra Time', count: 2, type: 'JOKER', jokerType: 'EXTRA_TIME'},
    {icon: '❓', label: 'Ask a Friend', count: 1, type: 'JOKER', jokerType: 'ASK_A_FRIEND'},
    {icon: '️⏭️', label: 'Skip Question', count: 1, type: 'JOKER', jokerType: 'SKIP_QUESTION'},
  ];
  selectedReward: Reward | null = null;
  rewardClaimed = false;
  showAnimation = false;

  constructor(
    private userService: UserService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    if (!this.userService.isLoggedIn()) {
      this.router.navigate([`/${ROUTES.login}`]);
    }

    this.shuffleRewards();
  }

  shuffleRewards(): void {
    for (let i = this.rewards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.rewards[i], this.rewards[j]] = [this.rewards[j], this.rewards[i]];
    }
  }

  openChest(): void {
    this.showAnimation = true;
    setTimeout(() => {
      this.chestOpen = true;
      this.showAnimation = false;
    }, 1000);
  }

  pickReward(reward: Reward): void {
    if (this.rewardClaimed) return;

    this.selectedReward = reward;
    this.rewardClaimed = true;

    if (reward.type === 'TICKETS') {
      this.userService.addTickets(reward.count);
    } else if (reward.type === 'JOKER' && reward.jokerType) {
      this.addJokerToUser(reward.jokerType, reward.count);
    }
  }

  private addJokerToUser(jokerType: string, count: number): void {
    const userProfile = this.userService.getUserProfile();
    if (!userProfile) return;
    const password = localStorage.getItem('user_password') || '';
    const jokers = [...userProfile.jokers || []];
    const existingJokerIndex = jokers.findIndex(j => j.type === jokerType);
    if (existingJokerIndex !== -1) {
      jokers[existingJokerIndex] = {
        ...jokers[existingJokerIndex],
        count: jokers[existingJokerIndex].count + count
      };
      this.userService.updateJokers(
        this.userService.getUserProfile()?.id || '',
        jokers,
        password
      )
    } else {
      console.error("Joker type not found in user's jokers list:", jokerType);
    }
  }

  openNext(): void {
    this.chestOpen = false;
    this.selectedReward = null;
    this.rewardClaimed = false;
    this.shuffleRewards();
  }

  backToGame(): void {
    this.router.navigate([`/${ROUTES.quizSelection}`]);
  }
}
