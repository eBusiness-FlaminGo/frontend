import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {ROUTES} from '../../app.routes';
import {UserProfile} from '../../models/user-profile.model';
import {Joker} from '../../models/joker.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  imports: [CommonModule],
  standalone: true
})
export class ProfileComponent implements OnInit {
  userProfile: UserProfile | null = null;
  activeFriendsTab = true;
  activeJokersTab = false;

  constructor(protected userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.userProfile = this.userService.getUserProfile();
    console.log(this.userProfile);

    if (!this.userProfile) {
      this.router.navigate([`/${ROUTES.login}`]);
    }
  }

  showFriendsTab(): void {
    this.activeFriendsTab = true;
    this.activeJokersTab = false;
  }

  showJokersTab(): void {
    this.activeFriendsTab = false;
    this.activeJokersTab = true;
  }

  getJokerIcon(type: string): string {
    switch (type) {
      case 'FIFTY_FIFTY':
        return 'fa-balance-scale';
      case 'EXTRA_TIME':
        return 'fa-clock';
      case 'ASK_A_FRIEND':
        return 'fa-user-friends';
      case 'SKIP_QUESTION':
        return 'fa-forward';
      default:
        return 'fa-question';
    }
  }

  getJokerIconForFlowbite(type: string): string {
    switch (type) {
      case 'FIFTY_FIFTY':
        return '<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>';
      case 'EXTRA_TIME':
        return '<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path>';
      case 'ASK_A_FRIEND':
        return '<path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>';
      case 'SKIP_QUESTION':
        return '<path fill-rule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clip-rule="evenodd"></path><path fill-rule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>';
      default:
        return '<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path>';
    }
  }

  getJokerLabel(type: string): string {
    switch (type) {
      case 'FIFTY_FIFTY':
        return '50:50';
      case 'EXTRA_TIME':
        return 'Extra Time';
      case 'ASK_A_FRIEND':
        return 'Ask a Friend';
      case 'SKIP_QUESTION':
        return 'Skip Question';
      default:
        return type;
    }
  }

  getJokerDescription(type: string): string {
    switch (type) {
      case 'FIFTY_FIFTY':
        return 'Eliminates two incorrect answers, leaving you with a 50% chance of getting it right.';
      case 'EXTRA_TIME':
        return 'Adds 30 seconds to the timer, giving you more time to answer the question.';
      case 'ASK_A_FRIEND':
        return 'Allows you to send the question to a friend who can help you with the answer.';
      case 'SKIP_QUESTION':
        return 'Skip the current question without penalty and move to the next one.';
      default:
        return 'A special power-up to help you in the game.';
    }
  }

  buyJoker(joker: Joker): void {
    if (this.userProfile && this.userProfile.tickets >= joker.price) {
      this.userService.addTickets(-joker.price);
      // Here you would typically add the joker to the user's inventory
      this.showPurchaseConfirmation(joker);
    } else {
      this.showInsufficientFundsAlert();
    }
  }

  showPurchaseConfirmation(joker: Joker): void {
    // In a real app, this would be a modal dialog
    alert(`You bought ${this.getJokerLabel(joker.type)}! It has been added to your inventory.`);
  }

  showInsufficientFundsAlert(): void {
    // In a real app, this would be a modal dialog
    alert('Not enough tickets! Earn more tickets by playing games or purchase them in the shop.');
  }
}
