import {Component, OnInit, Input} from '@angular/core';
import {NgClass, NgForOf, NgIf, SlicePipe} from '@angular/common';
import {Router, ActivatedRoute} from '@angular/router';
import {UserService} from '../../services/user.service';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {ROUTES} from '../../app.routes';
import {FactService} from '../../services/fact.service';

interface Reward {
  icon: SafeHtml;
  label: string;
  count: number;
  type: 'TICKETS' | 'JOKER' | 'FACTS';
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
  @Input() quantity: number = 1;
  chestOpen = false;
  rewards: Reward[];
  selectedReward: Reward | null = null;
  rewardClaimed = false;
  showAnimation = false;
  boxesRemaining: number = 0;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private factService: FactService,
  ) {
    this.rewards = [
      {
        icon: this.sanitizer.bypassSecurityTrustHtml('<div><svg class="w-10 h-10  text-inherit" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"> <path d="M4 5a2 2 0 0 0-2 2v2.5a1 1 0 0 0 1 1 1.5 1.5 0 1 1 0 3 1 1 0 0 0-1 1V17a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2.5a1 1 0 0 0-1-1 1.5 1.5 0 1 1 0-3 1 1 0 0 0 1-1V7a2 2 0 0 0-2-2H4Z"/></svg></div>'),
        label: 'Tickets',
        count: 50,
        type: 'TICKETS'
      },
      {
        icon: this.sanitizer.bypassSecurityTrustHtml('<div class="fifty-fifty-icon">50/50</div>'),
        label: '50/50',
        count: 3,
        type: 'JOKER',
        jokerType: 'FIFTY_FIFTY'
      },
      {
        icon: this.sanitizer.bypassSecurityTrustHtml('<div><svg class="w-10 h-10 text-inherit" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clip-rule="evenodd"/></svg></div>'),
        label: 'Extra Time',
        count: 2,
        type: 'JOKER',
        jokerType: 'EXTRA_TIME'
      },
      {
        icon: this.sanitizer.bypassSecurityTrustHtml('<div><svg class="w-16 h-16 text-inherit" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="m16 17-4-4-4 4m8-6-4-4-4 4" clip-rule="evenodd"/></svg></div>'),
        label: 'Multiply Points',
        count: 1,
        type: 'JOKER',
        jokerType: 'MULTIPLY_POINTS'
      },
      {
        icon: this.sanitizer.bypassSecurityTrustHtml('<div><svg class="w-10 h-10 text-inherit" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M17 6a1 1 0 1 0-2 0v4L8.6 5.2A1 1 0 0 0 7 6v12a1 1 0 0 0 1.6.8L15 14v4a1 1 0 1 0 2 0V6Z" clip-rule="evenodd"/></svg></div>'),
        label: 'Skip Question',
        count: 1,
        type: 'JOKER',
        jokerType: 'SKIP_QUESTION'
      },
      {
        icon: this.sanitizer.bypassSecurityTrustHtml('<div><svg class="w-10 h-10 text-inherit" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M17.44 3a1 1 0 0 1 .707.293l2.56 2.56a1 1 0 0 1 0 1.414L18.194 9.78 14.22 5.806l2.513-2.513A1 1 0 0 1 17.44 3Zm-4.634 4.22-9.513 9.513a1 1 0 0 0 0 1.414l2.56 2.56a1 1 0 0 0 1.414 0l9.513-9.513-3.974-3.974ZM6 6a1 1 0 0 1 1 1v1h1a1 1 0 0 1 0 2H7v1a1 1 0 1 1-2 0v-1H4a1 1 0 0 1 0-2h1V7a1 1 0 0 1 1-1Zm9 9a1 1 0 0 1 1 1v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 1 1 0-2h1v-1a1 1 0 0 1 1-1Z" clip-rule="evenodd"/><path d="M19 13h-2v2h2v-2ZM13 3h-2v2h2V3Zm-2 2H9v2h2V5ZM9 3H7v2h2V3Zm12 8h-2v2h2v-2Zm0 4h-2v2h2v-2Z"/></svg></div>'),
        label: 'Facts',
        count: 3,
        type: 'FACTS'
      },
    ]
  }

  ngOnInit(): void {
    if (!this.userService.isLoggedIn()) {
      this.router.navigate([`/${ROUTES.login}`]);
      return;
    }

    const routeQuantity = this.route.snapshot.data['quantity'];
    if (routeQuantity) {
      this.quantity = routeQuantity;
    }

    this.boxesRemaining = this.quantity;
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
    this.boxesRemaining--;
    setTimeout(() => {
      this.chestOpen = true;
      this.showAnimation = false;
    }, 1000);
  }

  pickReward(reward: Reward): void {
    if (this.rewardClaimed && this.boxesRemaining <= 0) return;

    this.selectedReward = reward;
    this.rewardClaimed = true;

    if (reward.type === 'TICKETS') {
      this.userService.addTickets(reward.count);
    } else if (reward.type === 'JOKER' && reward.jokerType) {
      this.addJokerToUser(reward.jokerType, reward.count);
    } else if (reward.type === 'FACTS') {
      this.addNewFacts(reward.count)
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
    if (this.boxesRemaining <= 0) {
      alert('No more loot boxes left!');
      return;
    }
    this.chestOpen = false;
    this.selectedReward = null;
    this.rewardClaimed = false;
    this.shuffleRewards();
  }

  backToGame(): void {
    this.router.navigate([`/${ROUTES.quizSelection}`]);
  }

  private addNewFacts(count: number) {
    this.userService.updateUnlockedFactCount(count);
  }
}
