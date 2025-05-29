import { Component } from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import { UserService } from '../../services/user.service';

interface ShopItem {
  type: 'lootbox' | 'ticket';
  label: string;
  image?: string;
  cost: number;
  bonus?: number;
  quantity: number;
  priceEUR: string;
}

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  imports: [
    NgIf,
    NgForOf
  ],
  styleUrls: ['./shop.component.css']
})
export class ShopComponent {
  constructor(public userService: UserService) {}

  lootboxes: ShopItem[] = [
    { type: 'lootbox', label: 'Lootbox', quantity: 1, cost: 99, priceEUR: '0,99€', image: './lootbox1.png' },
    { type: 'lootbox', label: '3x Lootbox', quantity: 3, cost: 249, priceEUR: '2,47€', image: './lootbox3.png' },
    { type: 'lootbox', label: '9x Lootbox', quantity: 9, cost: 699, priceEUR: '6,99€', image: './lootbox9.png' }
  ];

  tickets: ShopItem[] = [
    { type: 'ticket', label: '100 Tickets', quantity: 100, cost: 0, priceEUR: '0,99€' },
    { type: 'ticket', label: '600 Tickets', quantity: 500, bonus: 100, cost: 0, priceEUR: '4,99€' },
    { type: 'ticket', label: '1300 Tickets', quantity: 1000, bonus: 300, cost: 0, priceEUR: '9,99€' }
  ];

  purchase(item: ShopItem) {
    if (item.type === 'lootbox') {
      if (this.userService.getTickets() >= item.cost) {
        this.userService.addTickets(-item.cost);
        alert(`You bought ${item.label}`);
      } else {
        alert('Not enough tickets!');
      }
    } else {
      this.userService.addTickets(item.quantity + (item.bonus ?? 0));
      alert(`You bought ${item.label}`);
    }
  }
}
