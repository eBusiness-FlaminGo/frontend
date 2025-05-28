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

  // Signal for facts data
  facts = signal<Fact[]>([]);

  // Track fact loading state
  private factsLoaded = 0;
  private lastLoadTime = 0;
  private isPremium = false;
  private loading = signal<boolean>(false);
  private error = signal<string | null>(null);

  constructor(private http: HttpClient) {
  }

  loadFacts(category?: string) {
    if (!this.canLoadMoreFacts()) {
      const remainingTime = Math.ceil((this.lastLoadTime + 60000 - Date.now()) / 1000);
      this.error.set(`Rate limit reached. Try again in ${remainingTime} seconds.`);
      return;
    }

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
          console.log('Fact loaded:', fact);
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

  canLoadMoreFacts(): boolean {
    if (this.isPremium) {
      return true;
    }

    const cooldownExpired = Date.now() > this.lastLoadTime + 60000; // 1 minute in ms

    if (this.factsLoaded >= 10 && !cooldownExpired) {
      return false;
    }

    // Reset counter if cooldown has expired
    if (cooldownExpired && this.factsLoaded >= 10) {
      this.factsLoaded = 0;
    }

    return true;
  }

  isLoading() {
    return this.loading();
  }

  getError() {
    return this.error();
  }

  setPremiumStatus(isPremium: boolean) {
    this.isPremium = isPremium;
  }

  isPremiumUser() {
    return this.isPremium;
  }

  getCooldownTimeRemaining(): number {
    if (this.isPremium || this.factsLoaded < 10) {
      return 0;
    }

    const timeRemaining = (this.lastLoadTime + 60000 - Date.now()) / 1000;
    return timeRemaining > 0 ? Math.ceil(timeRemaining) : 0;
  }

  shouldShowSkeleton(): boolean {
    return this.isLoading() && this.canLoadMoreFacts();
  }

  cleanup() {
    this.facts.set([]);
  }
}
