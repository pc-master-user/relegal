import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../login/auth.service";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.scss']
})
export class AppNavbarComponent implements OnInit {
  private unsubscribe$ = new Subject<void>();
  isUsersPage!:boolean;
  constructor(
    private authService: AuthService,
    private router: Router) {
    authService.getAuthObj().pipe(takeUntil(this.unsubscribe$)).subscribe( (data: any) => {
      if (data && data?.username) {
        this.isUserLoggedIn = true;
      } else {
        this.isUserLoggedIn = false;
      }
    });
    // router.events.subscribe(val => {
    //   let path = this.router.url;
    //   if('/users' ===  path){
    //     this.isUsersPage = true;
    //   }else {
    //     this.isUsersPage = false;
    //   }
    // });
  }
  private localStorage: Storage = window?.localStorage;
  isUserLoggedIn!: boolean;
  ngOnInit(): void {
    // if (this.localStorage.getItem('user')) {
    //   this.isUserLoggedIn = true;
    // }
  }

  signOut(): void {
    this.authService.setAuthObj({});
    // this.localStorage.removeItem('user')
    this.isUserLoggedIn = false;
  }
}
