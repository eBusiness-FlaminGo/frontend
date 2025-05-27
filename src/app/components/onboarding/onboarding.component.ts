import { Component } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { ROUTES } from '../../app.routes';
import { toggleUserSetupState } from '../../utils/login';

import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    FormsModule,
    DragDropModule
  ],
  templateUrl: './onboarding.component.html',
  styleUrl: './onboarding.component.css',
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ position: 'absolute', width: '100%', opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ position: 'absolute', width: '100%' }),
        animate('200ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class OnboardingComponent {
  step = 1;

  favorites: string[] = ['Scifi', 'Art', 'Sport'];
  exclusions: string[] = ['Finance', 'Clothing'];
  suggestedCategories: string[] = ['Games', 'Climbing', 'Astronomy', 'Party', 'Food', 'Design', 'Basketball'];

  constructor(private router: Router) {
    // Vorherige Daten aus dem localStorage laden
    const savedFavs = localStorage.getItem('onboarding-favorites');
    const savedExcls = localStorage.getItem('onboarding-exclusions');

    if (savedFavs) {
      this.favorites = JSON.parse(savedFavs);
    }

    if (savedExcls) {
      this.exclusions = JSON.parse(savedExcls);
    }
  }

  next() {
    if (this.step < 3) {
      this.step++;
    }

    if (this.step === 3) {
      // Favoriten und Exclusions speichern
      localStorage.setItem('onboarding-favorites', JSON.stringify(this.favorites));
      localStorage.setItem('onboarding-exclusions', JSON.stringify(this.exclusions));

      toggleUserSetupState(true);
      this.router.navigate([ROUTES.facts]);
    }
  }

  previous() {
    if (this.step > 1) {
      this.step--;
    }
  }

  drop(event: CdkDragDrop<string[]>, target: 'suggested' | 'favorites' | 'exclusions') {
    const item = event.item.data;
    const lists = {
      suggested: this.suggestedCategories,
      favorites: this.favorites,
      exclusions: this.exclusions
    };

    const sourceList = event.previousContainer.data;
    const targetList = lists[target];

    if (event.previousContainer === event.container) {
      moveItemInArray(targetList, event.previousIndex, event.currentIndex);
    } else {
      if (!targetList.includes(item)) {
        transferArrayItem(
          sourceList,
          targetList,
          event.previousIndex,
          event.currentIndex
        );
      }
    }
  }
}
