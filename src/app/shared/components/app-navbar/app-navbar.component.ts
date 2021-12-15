import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../login/auth.service";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

@Component({
  selector: 'app-app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.scss']
})
export class AppNavbarComponent implements OnInit {
  private unsubscribe$ = new Subject<void>();
  constructor(private authService: AuthService) {
    authService.getAuthObj().pipe(takeUntil(this.unsubscribe$)).subscribe( (data: any) => {
      // this.username = data && data?.username;
      if (data && data?.username) {
        this.isUserLoggedIn = true;
      } else {
        this.isUserLoggedIn = false;
      }
    });
  }
  private localStorage: Storage = window?.localStorage;
  isUserLoggedIn!: boolean;
  ngOnInit(): void {
    // if (this.localStorage.getItem('user')) {
    //   this.isUserLoggedIn = true;
    // }
  }

  signOut(): void {
    this.authService.setAuthObj('');
    // this.localStorage.removeItem('user')
    this.isUserLoggedIn = false;
  }
}
