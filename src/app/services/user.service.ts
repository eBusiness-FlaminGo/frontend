import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserProfile} from '../models/user-profile.model';
import {Friend} from '../models/friend.model';
import {Joker} from '../models/joker.model';
import {signal, computed, Signal} from '@angular/core';

// Define localStorage keys
const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_EMAIL: 'user_email',
  USER_PASSWORD: 'user_password'
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _userProfile = signal<UserProfile | null>(null);
  private _tickets = signal<number>(500);
  private _username = signal<string>('');
  private apiBaseUrl = 'http://127.0.0.1:8081/api';

  public readonly userProfile: Signal<UserProfile | null> = this._userProfile.asReadonly();
  public readonly tickets = computed(() => this._userProfile()?.tickets || this._tickets());
  public readonly flames = computed(() => this._userProfile()?.flames || 0);
  public readonly username = computed(() => this._userProfile()?.username || this._username());
  public readonly friends = computed(() => this._userProfile()?.friends || []);
  public readonly jokers = computed(() => this._userProfile()?.jokers || []);
  public readonly isLoggedIn = computed(() => !!this._userProfile() || this._userProfile()?.isLoggedIn);
  public readonly isSetUp = computed(() => !this._userProfile()?.isSetUp);

  constructor(private http: HttpClient) {
    this.checkStoredCredentials();
  }

  public setSetupState(isSetUp: boolean): void {
    if (this._userProfile()) {
      this._userProfile.update(profile => {
        if (profile) {
          return {...profile, isSetUp: isSetUp};
        }
        return profile;
      });
    } else {
      console.warn('User profile is not set, cannot update setup state.');
    }
  }

  public setLoginState(isLoggedIn: boolean): void {
    if (this._userProfile()) {
      this._userProfile.update(profile => {
        if (profile) {
          return {...profile, isLoggedIn: isLoggedIn};
        }
        return profile;
      });
    } else {
      console.warn('User profile is not set, cannot update login state.');
    }
  }

  private checkStoredCredentials(): void {
    const email = localStorage.getItem(STORAGE_KEYS.USER_EMAIL);
    const password = localStorage.getItem(STORAGE_KEYS.USER_PASSWORD);

    if (email && password) {
      this.loadUserProfile(email, password);
    }
  }

  getTickets(): number {
    return this.tickets();
  }

  addTickets(amount: number): void {
    if (this._userProfile()) {
      this._userProfile.update(profile => {
        if (profile) {
          return {...profile, tickets: profile.tickets + amount};
        }
        return profile;
      });
    } else {
      this._tickets.update(current => current + amount);
    }
  }

  // Renamed from getStreak to getFlames
  getFlames(): number {
    return this.flames();
  }

  // Renamed from incrementStreak to incrementFlames
  incrementFlames(): void {
    if (this._userProfile()) {
      this._userProfile.update(profile => {
        if (profile) {
          return {...profile, flames: profile.flames + 1};
        }
        return profile;
      });
    }
  }

  // Renamed from resetStreak to resetFlames
  resetFlames(): void {
    if (this._userProfile()) {
      this._userProfile.update(profile => {
        if (profile) {
          return {...profile, flames: 0};
        }
        return profile;
      });
    }
  }

  getUsername(): string {
    return this.username();
  }

  setUsername(name: string): void {
    this._username.set(name);
    if (this._userProfile()) {
      this._userProfile.update(profile => {
        if (profile) {
          return {...profile, username: name};
        }
        return profile;
      });
    }
  }

  getUserProfile(): UserProfile | null {
    return this._userProfile();
  }

  loadUserProfile(email: string, password: string): void {
    // Store credentials in localStorage
    localStorage.setItem(STORAGE_KEYS.USER_EMAIL, email);
    localStorage.setItem(STORAGE_KEYS.USER_PASSWORD, password);

    this.http.get<UserProfile>(`${this.apiBaseUrl}/users/search/by-email?email=${email}`)
      .subscribe({
        next: (profile) => {
          this._userProfile.set({
            ...profile,
            isLoggedIn: true
          });
          this._username.set(profile.username);
        },
        error: (error) => {
          console.error('Error loading user profile:', error);
        }
      });
  }

  getFriends(): Friend[] {
    return this.friends();
  }

  getJokers(): Joker[] {
    return this.jokers();
  }

  logout(): void {
    localStorage.removeItem(STORAGE_KEYS.USER_EMAIL);
    localStorage.removeItem(STORAGE_KEYS.USER_PASSWORD);
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    this._userProfile.set(null);
    this._username.set('');
  }
}
