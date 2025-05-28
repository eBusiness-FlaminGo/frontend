import {Component} from '@angular/core';
import {Location} from '@angular/common';
import {RouterLink} from '@angular/router';
import {ROUTES} from '../../app.routes';

@Component({
  selector: 'app-settings',
  imports: [
    RouterLink
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  protected readonly ROUTES = ROUTES;

  constructor(private location: Location) {
  }

  goBack(): void {
    this.location.back();
  }
}
