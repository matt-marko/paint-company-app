import { Injectable, inject } from '@angular/core';
import { User } from '../user';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl: string = environment.apiUrl + 'user';

  private currentUser: User = {} as User;

  private http: HttpClient = inject(HttpClient);

  constructor() { }

  getCurrentUser(): User {
    return this.currentUser;
  }

  setCurrentUser(user: User): void {
    this.currentUser = user;
  }

}
