import { Friend } from './friend.model';
import { Joker } from './joker.model';

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
