import {Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {of} from 'rxjs';

export type Fact = { message: string; bg: string; category: string }

@Injectable({
  providedIn: 'root'
})
export class FactService {
  private readonly API_URL = 'http://127.0.0.1:8000/fun-fact';
  facts = signal<Fact[]>([]);
  private factsLoaded = 0;
  private lastLoadTime = 0;
  private isPremium = false;
  private loading = signal<boolean>(false);
  private error = signal<string | null>(null);
  currentIndex = signal(0);

  constructor(private http: HttpClient) {
  }

  loadFacts(category?: string) {
    this.loading.set(true);
    this.error.set(null);

    let url = this.API_URL;
    if (category) {
      url += `?category=${encodeURIComponent(category)}`;
    }

    for (let i = 0; i < 10; i++) {
      this.http.get<Fact>(url).pipe(
        tap(fact => {
          const factWithBg = {
            ...fact,
            bg: `hsl(${Math.floor(Math.random() * 360)}, 70%, 80%)`
          }
          this.facts.update(facts => [...facts, factWithBg]);
        }),
        catchError(_ => {
          this.error.set('Failed to load fact. Please try again later.');
          this.loading.set(false);
          return of([]);
        })
      ).subscribe();
    }

    if (!this.isPremium) {
      this.factsLoaded += this.facts().length;
      this.lastLoadTime = Date.now();
    }
    this.loading.set(false);
  }

  isLoading() {
    return this.loading();
  }

  cleanup() {
    this.facts.set([]);
  }
}
