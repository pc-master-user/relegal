import { Component, OnInit } from '@angular/core';
import {takeUntil} from "rxjs/operators";
import {AuthService} from "../auth.service";
import {Subject} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  isUserLoggedIn!: boolean;
  private unsubscribe$ = new Subject<void>();
  constructor(private authService: AuthService,
              private router: Router) {
    authService.getAuthObj().pipe(takeUntil(this.unsubscribe$)).subscribe( (data: any) => {
      if (data && data?.username) {
        this.isUserLoggedIn = true;
      } else {
        this.isUserLoggedIn = false;
      }
    });
  }

  ngOnInit(): void {
    if (!this.isUserLoggedIn) {
      this.router.navigate(['/']);
    }
  }

}
