import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  public allUsers = signal<User[] | null>(null);
  public currentUser = signal<User | null>(null);

  getAllUsers() {
    this.http.get<User[]>('assets/data/users.json').subscribe((users) => {
      this.allUsers.set(users);
    });
  }

  setLoginUser(user: User) {
    this.currentUser.set(user);
    console.log(this.currentUser())
  }
}
