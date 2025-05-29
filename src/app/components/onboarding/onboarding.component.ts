import { Component } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { ROUTES } from '../../app.routes';
import { toggleUserSetupState } from '../../utils/login';

import {
  CdkDragDrop,
  CdkDragEnd,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
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

  lastDroppedItem: string | null = null;

  constructor(private router: Router) {
    const savedFavs = localStorage.getItem('onboarding-favorites');
    const savedExcls = localStorage.getItem('onboarding-exclusions');
    const savedSugg = localStorage.getItem('onboarding-suggested');

    if (savedFavs) {
      this.favorites = JSON.parse(savedFavs);
    }

    if (savedExcls) {
      this.exclusions = JSON.parse(savedExcls);
    }

    if (savedSugg) {
      this.suggestedCategories = JSON.parse(savedSugg);
    }
  }

  next() {
    if (this.step < 3) {
      this.step++;
    }

    if (this.step === 3) {
      localStorage.setItem('onboarding-favorites', JSON.stringify(this.favorites));
      localStorage.setItem('onboarding-exclusions', JSON.stringify(this.exclusions));
      localStorage.setItem('onboarding-suggested', JSON.stringify(this.suggestedCategories));

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
    this.lastDroppedItem = item;
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

  onDragEnd(event: CdkDragEnd<string>) {
    const item = event.source.data;

    if (item !== this.lastDroppedItem) {
      this.favorites = this.favorites.filter(f => f !== item);
      this.exclusions = this.exclusions.filter(e => e !== item);
      this.suggestedCategories = this.suggestedCategories.filter(s => s !== item);

      if (!this.suggestedCategories.includes(item)) {
        this.suggestedCategories.push(item);
      }
    }

    this.lastDroppedItem = null;
  }
}
