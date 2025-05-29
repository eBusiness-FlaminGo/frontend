import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
//TODO: Backend integration for user data
export class UserService {
  private _tickets = 500;
  private _streak = 0;
  private _username = '';

  getTickets(): number {
    return this._tickets;
  }

  addTickets(amount: number): void {
    this._tickets += amount;
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
    return this._username;
  }

  setUsername(name: string): void {
    this._username = name;
  }
}