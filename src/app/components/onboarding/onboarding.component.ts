import {Component} from '@angular/core';
import {NgForOf, NgIf, NgSwitch, NgSwitchCase} from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-onboarding',
  imports: [
    NgSwitch,
    NgSwitchCase,
    NgIf,
    NgForOf,
    FormsModule
  ],
  templateUrl: './onboarding.component.html',
  styleUrl: './onboarding.component.css',
})
export class OnboardingComponent {
  step = 1;

  favorites = ['Scifi', 'Art', 'Sport', 'Music', 'Weather'];
  exclusions = ['IT', 'Plants', 'Animals', 'Clothing', 'Finance'];

  allCategories = ['Games', 'Climbing', 'Astronomy', 'Party', 'Food', 'Household', 'Design', 'Basketball', 'Horses'];
  selectedCategory = '';

  next() {
    if (this.step < 3) this.step++;
  }

  previous() {
    if (this.step > 1) this.step--;
  }

  skip() {
    // Handle skip logic, e.g., navigate to main app
  }

  removeFavorite(category: string) {
    this.favorites = this.favorites.filter(f => f !== category);
  }

  removeExclusion(category: string) {
    this.exclusions = this.exclusions.filter(e => e !== category);
  }

  addToFavorites() {
    if (this.selectedCategory && !this.favorites.includes(this.selectedCategory)) {
      this.favorites.push(this.selectedCategory);
    }
  }

  addToExclusions() {
    if (this.selectedCategory && !this.exclusions.includes(this.selectedCategory)) {
      this.exclusions.push(this.selectedCategory);
    }
  }
}
