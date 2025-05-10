import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { WandComponent } from '../icons/wand/wand.component';
import { BrainComponent } from '../icons/brain/brain.component';
import { StoreComponent } from '../icons/store/store.component';

@Component({
  selector: 'app-navigation',
  imports: [
    RouterLink,
    RouterLinkActive,
    WandComponent,
    BrainComponent,
    StoreComponent,
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
})
export class NavigationComponent {}
