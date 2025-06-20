import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {ROUTES} from '../../app.routes';
import {Joker} from '../../models/joker.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  imports: [CommonModule],
  standalone: true
})
export class ProfileComponent implements OnInit {
  activeFriendsTab = true;
  activeJokersTab = false;

  constructor(protected userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    if (!this.userService.getUserProfile()) {
      this.router.navigate([`/${ROUTES.login}`]);
    }
  }

  showFriendsTab(): void {
    this.activeFriendsTab = true;
    this.activeJokersTab = false;
  }
}
