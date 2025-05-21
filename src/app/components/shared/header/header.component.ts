import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {ROUTES} from '../../../app.routes';

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
}
