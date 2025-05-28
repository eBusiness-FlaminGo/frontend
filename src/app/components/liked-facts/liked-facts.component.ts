import {Component, OnInit, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {Fact} from '../../services/fact.service';

@Component({
  selector: 'app-liked-facts',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './liked-facts.component.html',
  styleUrl: './liked-facts.component.css'
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
