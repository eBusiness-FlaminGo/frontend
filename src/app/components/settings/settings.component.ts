import { Component } from '@angular/core';
import { Location, NgIf, NgForOf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ROUTES } from '../../app.routes';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
  CdkDragEnd,
} from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    NgForOf,
    DragDropModule,
    FormsModule,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  protected readonly ROUTES = ROUTES;

  settingsView: 'main' | 'topics' = 'main';

  favorites: string[] = [];
  exclusions: string[] = [];
  suggestedCategories: string[] = [];

  newFavorite= '';
  newExclusion= '';

  lastDroppedItem: string | null = null;

  constructor(private location: Location) {}

  goBack(): void {
    if (this.settingsView === 'topics') {
      this.settingsView = 'main';
    } else {
      this.location.back();
    }
  }

  openTopicPreferences(): void {
    const savedFavs = localStorage.getItem('onboarding-favorites');
    const savedExcls = localStorage.getItem('onboarding-exclusions');
    const savedSugg = localStorage.getItem('onboarding-suggested');

    if (savedFavs) this.favorites = JSON.parse(savedFavs);
    if (savedExcls) this.exclusions = JSON.parse(savedExcls);
    if (savedSugg) this.suggestedCategories = JSON.parse(savedSugg);

    this.settingsView = 'topics';
  }

  drop(event: CdkDragDrop<string[]>, target: 'favorites' | 'exclusions' | 'suggested') {
    const item = event.item.data;
    this.lastDroppedItem = item;

    const sourceList = event.previousContainer.data;
    const targetList =
      target === 'favorites'
        ? this.favorites
        : target === 'exclusions'
        ? this.exclusions
        : this.suggestedCategories;

    if (event.previousContainer === event.container) {
      moveItemInArray(targetList, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(sourceList, targetList, event.previousIndex, event.currentIndex);
    }

    this.save();
  }


  save() {
    localStorage.setItem('onboarding-favorites', JSON.stringify(this.favorites));
    localStorage.setItem('onboarding-exclusions', JSON.stringify(this.exclusions));
    localStorage.setItem('onboarding-suggested', JSON.stringify(this.suggestedCategories));
  }

  addFavorite() {
    const topic = this.newFavorite.trim();
    if (topic && !this.favorites.includes(topic)) {
      this.favorites.push(topic);
      this.save();
    }
    this.newFavorite = '';
  }

  addExclusion() {
    const topic = this.newExclusion.trim();
    if (topic && !this.exclusions.includes(topic)) {
      this.exclusions.push(topic);
      this.save();
    }
    this.newExclusion = '';
  }
  onDragEnd(event: CdkDragEnd<string>) {
    const item = event.source.data;

    if (item && item !== this.lastDroppedItem) {
      this.favorites = this.favorites.filter(f => f !== item);
      this.exclusions = this.exclusions.filter(e => e !== item);
      this.suggestedCategories = this.suggestedCategories.filter(s => s !== item); // doppelt?

      if (!this.suggestedCategories.includes(item)) {
        this.suggestedCategories.push(item);
      }

      this.save();
    }

    this.lastDroppedItem = null;
  }
}