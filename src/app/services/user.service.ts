import {Injectable} from '@angular/core';

export interface Joker {
  id: string;
  type: string;
  price: number;
}

export interface Friend {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
  flames: number;
  tickets: number;
  friends: null;
  jokers: null;
}

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
  flames: number;
  tickets: number;
  friends: Friend[];
  jokers: Joker[];
  isSetUp?: boolean;
  isLoggedIn?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _userProfile: UserProfile | null = null;
  private _tickets = 500;
  private _streak = 0;
  private _username = '';

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
    this._userProfile = {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "username": "admin",
      "email": "admin@example.com",
      "firstName": "Admin",
      "lastName": "User",
      "createdAt": "2025-05-29T16:20:30.260637Z",
      "updatedAt": "2025-05-29T16:20:30.260637Z",
      "flames": 5,
      "tickets": 100,
      "friends": [
        {
          "id": "223e4567-e89b-12d3-a456-426614174000",
          "username": "user1",
          "email": "user1@example.com",
          "firstName": "John",
          "lastName": "Doe",
          "createdAt": "2025-05-29T16:20:30.260637Z",
          "updatedAt": "2025-05-29T16:20:30.260637Z",
          "flames": 3,
          "tickets": 50,
          "friends": null,
          "jokers": null
        },
        {
          "id": "323e4567-e89b-12d3-a456-426614174000",
          "username": "user2",
          "email": "user2@example.com",
          "firstName": "Jane",
          "lastName": "Smith",
          "createdAt": "2025-05-29T16:20:30.260637Z",
          "updatedAt": "2025-05-29T16:20:30.260637Z",
          "flames": 7,
          "tickets": 75,
          "friends": null,
          "jokers": null
        }
      ],
      "jokers": [
        {
          "id": "523e4567-e89b-12d3-a456-426614174000",
          "type": "FIFTY_FIFTY",
          "price": 10
        },
        {
          "id": "623e4567-e89b-12d3-a456-426614174000",
          "type": "EXTRA_TIME",
          "price": 15
        },
        {
          "id": "723e4567-e89b-12d3-a456-426614174000",
          "type": "ASK_A_FRIEND",
          "price": 20
        },
        {
          "id": "823e4567-e89b-12d3-a456-426614174000",
          "type": "SKIP_QUESTION",
          "price": 25
        }
      ]
    };
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
