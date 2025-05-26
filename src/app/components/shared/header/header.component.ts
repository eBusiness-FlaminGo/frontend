import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterLink} from '@angular/router';
import {ROUTES} from '../../../app.routes';
import { Location, NgIf } from '@angular/common';
import {filter, map} from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [RouterLink, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  protected hasBackButton = false;
  protected readonly ROUTES = ROUTES;

  constructor(
    private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  goBack() {
    this.location.back();
  }

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let route = this.activatedRoute;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route.snapshot.data;
        }),
      )
      .subscribe((data) => {
        this.hasBackButton = data['hasBackButton'] ?? false;
      });
  }
}
