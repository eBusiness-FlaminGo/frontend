import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {ROUTES} from '../../../app.routes';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  protected readonly ROUTES = ROUTES;

  constructor(private location: Location) {}

  goBack() {
    this.location.back();
  }
}
