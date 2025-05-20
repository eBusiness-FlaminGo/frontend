import {Component} from '@angular/core';
import {NgIf, NgSwitch, NgSwitchCase} from '@angular/common';

@Component({
  selector: 'app-onboarding',
  imports: [
    NgSwitch,
    NgSwitchCase,
    NgIf
  ],
  templateUrl: './onboarding.component.html',
  styleUrl: './onboarding.component.css',
})
export class OnboardingComponent {
  step = 1;

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
