import {Component, OnInit, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {Fact} from '../../services/fact.service';
import {trigger, transition, style, animate} from '@angular/animations';

@Component({
  selector: 'app-liked-facts',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './liked-facts.component.html',
  styleUrl: './liked-facts.component.css',
  animations: [
    trigger('fadeSlide', [
      transition(':leave', [
        style({opacity: 1, transform: 'translateY(0)'}),
        animate('300ms ease-out', style({
          opacity: 0,
          transform: 'translateY(20px)',
          height: 0,
          margin: 0,
          padding: 0
        }))
      ]),
      transition(':enter', [
        style({opacity: 0, transform: 'translateY(20px)'}),
        animate('300ms ease-out', style({opacity: 1, transform: 'translateY(0)'}))
      ])
    ])
  ]
})
export class LikedFactsComponent implements OnInit {
  likedFacts = signal<Fact[]>([]);

  ngOnInit(): void {
    this.loadLikedFacts();
  }

  loadLikedFacts(): void {
    const storedFacts = localStorage.getItem('likedFacts');
    if (storedFacts) {
      this.likedFacts.set(JSON.parse(storedFacts));
    }
  }

  unlikeFact(fact: Fact): void {
    const currentFacts = this.likedFacts();
    const updatedFacts = currentFacts.filter(f =>
      f.message !== fact.message || f.category !== fact.category);

    this.likedFacts.set(updatedFacts);
    localStorage.setItem('likedFacts', JSON.stringify(updatedFacts));
  }

  clearAllLikedFacts(): void {
    this.likedFacts.set([]);
    localStorage.removeItem('likedFacts');
  }
}
