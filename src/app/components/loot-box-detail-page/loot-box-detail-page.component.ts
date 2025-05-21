import { Component } from '@angular/core';
import {NgClass, NgForOf, NgIf} from '@angular/common';

interface Reward {
  icon: string;
  label: string;
  count: number;
}

@Component({
  selector: 'app-loot-box-detail-page',
  templateUrl: './loot-box-detail-page.component.html',
  imports: [
    NgClass,
    NgForOf,
    NgIf
  ],
  styleUrls: ['./loot-box-detail-page.component.css']
})
export class LootBoxDetailPageComponent {
  chestOpen = false;
  rewards: Reward[] = [
    { icon: '🎟️', label: 'Tickets', count: 50 },
    { icon: '50/50', label: 'Lifeline', count: 3 }
  ];
  selectedReward: Reward | null = null;

  openChest() {
    this.chestOpen = true;
  }

  pickReward(reward: Reward) {
    this.selectedReward = reward;
  }

  openNext() {
    this.chestOpen = false;
    this.selectedReward = null;
  }
}
