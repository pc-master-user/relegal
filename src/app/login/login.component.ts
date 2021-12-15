import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private localStorage: Storage = window?.localStorage;
  private unsubscribe$ = new Subject<void>();
  isLoading = false;
  checked = false;
  isUserLoggedIn = false;
  role = '';
  legalTypes!: any[];
  users: any[] = [];
  emailPattern = /^\w+([\+\_\.\-]\w+)*@\w+([\.-]\w+)*(\.\w{2,})+$/;
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email, Validators.pattern(this.emailPattern)]),
    password: new FormControl('', [Validators.required, Validators.minLength(7),]),
    role: new FormControl('', [Validators.required,]),
    rememberMe: new FormControl(false)
  });
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    authService.getAuthObj().pipe(takeUntil(this.unsubscribe$)).subscribe( (data: any) => {
      if (data && data?.username) {
        this.isUserLoggedIn = true;
      } else {
        this.isUserLoggedIn = false;
      }
    });
  }

  ngOnInit(): void {
    if (this.isUserLoggedIn) {
      this.router.navigate(['/users']);
    }
    this.legalTypes = [{name: 'Attorney', code: 'atr'}, {name: 'Paralegal', code: 'par'}, {name: 'Admin', code: 'admin'}]
     this.users = [{name: 'Ian Chesnut',username: 'ian.chesnut@gmail.com', password: 'Test@123', role: 'Attorney', status: 'Active', rememberMe: true},
      {name: 'Faith Robinson', username: 'faith.robinson@gmail.com', password: 'Test@123', role: 'Paralegal', status: 'Inactive', rememberMe: false},
      {name: 'Track Aksam',username: 'track.aksam@gmail.com', password: 'Test@123', role: 'Admin', status: 'Active', rememberMe: true},
      {name: 'Scot Walter',username: 'scot.walter@gmail.com', password: 'Test@123', role: 'Admin', status: 'Active', rememberMe: false},
      {name: 'Chris Bowen',username: 'chris.bowen@gmail.com', password: 'Test@123', role: 'Attorney', status: 'Inactive', rememberMe: true},
      {name: 'Dan Spanser',username: 'dan.spanser@gmail.com', password: 'Test@123', role: 'Paralegal', status: 'Active', rememberMe: true},
       {name: 'Erin Holland',username: 'erin.holland@gmail.com', password: 'Test@123', role: 'Paralegal', status: 'Inactive', rememberMe: true},
       {name: 'Toney Gabriel',username: 'toney.gabriel@gmail.com', password: 'Test@123', role: 'Attorney', status: 'Active', rememberMe: false}]
  }
  get username(): any {
    return this.loginForm.get('username');
  }

  get password(): any {
    return this.loginForm.get('password');
  }
  get rememberMe(): any {
    return this.loginForm.get('rememberMe');
  }
  onSubmit(): void {
    console.log(this.loginForm.value)
    this.users.push(this.loginForm.value)

    // store user details and jwt token in local storage to keep user logged in between page refreshes
    // const authData = {username: loginRequest.username, token: data.data.token, refreshToken: data.data.refreshToken, rememberMe: rememberMe };
    this.authService.setAuthObj(this.loginForm.value)
    this.router.navigate(['/users']);
  }
}
