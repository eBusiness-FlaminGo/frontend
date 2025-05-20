import {Component} from '@angular/core';
import {NgForOf, NgIf, NgSwitch, NgSwitchCase} from '@angular/common';

@Component({
  selector: 'app-onboarding',
  imports: [
    NgSwitch,
    NgSwitchCase,
    NgIf,
    NgForOf
  ],
  templateUrl: './onboarding.component.html',
  styleUrl: './onboarding.component.css',
})
export class OnboardingComponent {
  step = 1;

  favorites = ['Scifi', 'Art', 'Sport', 'Music', 'Weather'];
  exclusions = ['IT', 'Plants', 'Animals', 'Clothing', 'Finance'];

  next() {
    if (this.step < 3) this.step++;
  }

  previous() {
    if (this.step > 1) this.step--;
  }

  skip() {
    // Handle skip logic, e.g., navigate to main app
  }
}
