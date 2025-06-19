import {Component} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {UserService} from '../../services/user.service';
import {Router, RouterLink} from '@angular/router';
import {ROUTES} from '../../app.routes';

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
    NgForOf,
    RouterLink
  ],
  styleUrls: ['./shop.component.css']
})
export class ShopComponent {
  constructor(public userService: UserService, private router: Router) {
  }

  lootboxes: ShopItem[] = [
    {type: 'lootbox', label: 'Brainstorm', quantity: 1, cost: 99, priceEUR: '0,99€', image: './lootbox1.png'},
    {type: 'lootbox', label: '3x Brainstorm', quantity: 3, cost: 249, priceEUR: '2,47€', image: './lootbox3.png'},
    {type: 'lootbox', label: '9x Brainstorm', quantity: 9, cost: 699, priceEUR: '6,92€', image: './lootbox9.png'}
  ];

  tickets: ShopItem[] = [
    {type: 'ticket', label: '100 Tickets', quantity: 100, cost: 0, priceEUR: '0,99€'},
    {type: 'ticket', label: '600 Tickets', quantity: 500, bonus: 100, cost: 0, priceEUR: '4,99€'},
    {type: 'ticket', label: '1300 Tickets', quantity: 1000, bonus: 300, cost: 0, priceEUR: '9,99€'}
  ];

  purchase(item: ShopItem) {
    if (item.type === 'lootbox') {
      if (this.userService.getTickets() >= item.cost) {
        this.userService.addTickets(-item.cost);
        alert(`You bought ${item.label}`);

        sessionStorage.setItem('lootbox_quantity', item.quantity.toString());

        this.router.navigate(['/', ROUTES.shop, ROUTES.lootBoxDetailPage]);
      } else {
        alert('Not enough tickets!');
      }
    } else {
      this.userService.addTickets(item.quantity + (item.bonus ?? 0));
      alert(`You bought ${item.label}`);
    }
  }
}
