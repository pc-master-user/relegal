import {Component, OnInit} from '@angular/core';
import { PrimeNGConfig } from "primeng/api";
import {AuthService} from "./login/auth.service";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import { Router } from "@angular/router";
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'relegal';
  private unsubscribe$ = new Subject<void>();
  display: boolean = true;
  isUsersPage!: boolean;
  logOutItem: MenuItem[];
  constructor(private primengConfig: PrimeNGConfig,private authService: AuthService,
    private router: Router) {
     authService.getAuthObj().pipe(takeUntil(this.unsubscribe$)).subscribe( (data: any) => {
      if (data && data?.username) {
        this.isUserLoggedIn = true;
      } else {
        this.isUserLoggedIn = false;
      }
     });
    this.logOutItem = [
            {
              icon: "pi pi-power-off",
              routerLink: ['/users']
            },
            {
                routerLink: ['/users'],
                icon: "pi pi-calendar"
            },
            {
                routerLink: ['/users'],
                icon: "pi pi-calendar"
            },
            {
                routerLink: ['/users'],
                icon: "pi pi-calendar"
            }
        ];
    }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }
   signOut(): void {
    this.authService.setAuthObj({});
    // this.localStorage.removeItem('user')
    this.isUserLoggedIn = false;
  }
  private localStorage: Storage = window?.localStorage;
  isUserLoggedIn!: boolean;

}
