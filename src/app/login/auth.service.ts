import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private localStorage: Storage = window?.localStorage;
  private userSubject: BehaviorSubject<any>;
  constructor() {
    this.userSubject = new BehaviorSubject<any>(JSON.parse(this.localStorage.getItem('user') || '{}'));
  }

  getAuthObj(): Observable<any> {
    return this.userSubject.asObservable();
  }

  setAuthObj(user: any): void {
    this.userSubject.next(user);
    if (user) {
      this.localStorage.setItem('user', JSON.stringify(user));
    }
  }


}
