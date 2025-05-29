import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserProfile} from '../models/user-profile.model';
import {Friend} from '../models/friend.model';
import {Joker} from '../models/joker.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _userProfile: UserProfile | null = null;
  private _tickets = 500;
  private _streak = 0;
  private _username = '';
  private apiBaseUrl = 'http://127.0.0.1:8081/api';

  constructor(private http: HttpClient) {
  }

  getTickets(): number {
    return this._userProfile?.tickets || this._tickets;
  }

  addTickets(amount: number): void {
    if (this._userProfile) {
      this._userProfile.tickets += amount;
    } else {
      this._tickets += amount;
    }
  }

  getStreak(): number {
    return this._streak;
  }

  incrementStreak(): void {
    this._streak++;
  }

  resetStreak(): void {
    this._streak = 0;
  }

  getUsername(): string {
    return this._userProfile?.username || this._username;
  }

  setUsername(name: string): void {
    this._username = name;
  }

  getUserProfile(): UserProfile | null {
    return this._userProfile;
  }

  setLoginState(isLoggedIn: boolean): void {
    if (this._userProfile !== null) {
      this._userProfile.isLoggedIn = isLoggedIn;
    }
  }

  setSetupState(isSetUp: boolean): void {
    if (this._userProfile !== null) {
      this._userProfile.isSetUp = isSetUp;
    }
  }

  loadUserProfile(username: string, password: string): void {
    localStorage.setItem('userPassword', password); // replace it before production

    this.http.get<UserProfile>(`${this.apiBaseUrl}/users/search/by-email?email=user1@example.com`)
      .subscribe({
        next: (profile) => {
          this._userProfile = profile;
          this._userProfile.isLoggedIn = true;
        },
        error: (error) => {
          console.error('Error loading user profile:', error);
        }
      });
  }

  getFlames(): number {
    return this._userProfile?.flames || 0;
  }

  getFriends(): Friend[] {
    return this._userProfile?.friends || [];
  }

  getJokers(): Joker[] {
    return this._userProfile?.jokers || [];
  }
}
