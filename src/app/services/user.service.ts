import { Injectable } from '@angular/core';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { HttpClient } from '@angular/common/http';
import { User } from '../shared/models/user';
import { JIRA_GET_EXISTING_USERS, JIRA_LOGIN_URL, JIRA_REGISTER_URL } from '../shared/constants/urls';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { IUserRegister } from '../shared/interfaces/IUserRegister';

const USER_KEY = 'User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User | null>(this.getUserFromLocalStorage());
  public userObservable: Observable<User | null>;
  existingUsers!: any;

  constructor(private _http: HttpClient) {
    this.userObservable = this.userSubject.asObservable();
    this.getExistingUsers().subscribe(resp => this.existingUsers = resp)
  }

  getCurrentUser(): User | null {
    return this.userSubject.value;
  }

  login(userLogin: IUserLogin): Observable<User> {
    return this._http.post<User>(JIRA_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) => {
          console.log("Successful login", user);
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
        },
        error: (err) => {
          console.log("Error:", err);
        }
      })
    );
  }

  logout() {
    this.userSubject.next(null); // Set user state to null on logout
    localStorage.removeItem(USER_KEY); // Remove item from local storage
    window.location.reload(); // Reload to update the UI
  }

  register(registerUser: IUserRegister): Observable<IUserRegister> {
    return this._http.post<IUserRegister>(JIRA_REGISTER_URL, registerUser).pipe(
      tap({
        next: (user) => {
          console.log("Successful login", user);
        },
        error: (err) => {
          console.log("Error:", err);
        }
      })
    );
  }

  getExistingUsers() {
    return this._http.get<User>(JIRA_GET_EXISTING_USERS);
  }

  searchExisitingUser(input: string): Observable<any> {
    if (input) {
      return of(this.existingUsers?.filter((item: any) => item.name.toLowerCase().includes(input.toLowerCase())))
    }
    return of([])
  }

  private setUserToLocalStorage(user: User) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private getUserFromLocalStorage(): User | null {
    const userJson = localStorage.getItem(USER_KEY);
    if (userJson) return JSON.parse(userJson) as User;
    return null; // Return null if no user is found in local storage
  }
}
