import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoading = false;
  checked = false;
  selectedType = '';
  legalTypes!: any[];
  users: any[] = [];
  emailPattern = /^\w+([\+\_\.\-]\w+)*@\w+([\.-]\w+)*(\.\w{2,})+$/;
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email, Validators.pattern(this.emailPattern)]),
    password: new FormControl('', [Validators.required, Validators.minLength(7),]),
    selectedType: new FormControl('', [Validators.required,]),
    rememberMe: new FormControl(false)
  });
  constructor() { }

  ngOnInit(): void {
    this.legalTypes = [{name: 'Attorney', code: 'atr'}, {name: 'Paralegal', code: 'par'}, {name: 'Admin', code: 'admin'}]
     this.users = [{name: 'Ian Chesnut',username: 'ian.chesnut@gmail.com', password: 'Test@123', selectedType: 'Attorney', rememberMe: true},
      {name: 'Faith Robinson', username: 'faith.robinson@gmail.com', password: 'Test@123', selectedType: 'Paralegal', rememberMe: false},
      {name: 'Track Aksam',username: 'track.aksam@gmail.com', password: 'Test@123', selectedType: 'Admin', rememberMe: true},
      {name: 'Scot Walter',username: 'scot.walter@gmail.com', password: 'Test@123', selectedType: 'Admin', rememberMe: false},
      {name: 'Chris Bowen',username: 'chris.bowen@gmail.com', password: 'Test@123', selectedType: 'Attorney', rememberMe: true},
      {name: 'Dan Spanser',username: 'dan.spanser@gmail.com', password: 'Test@123', selectedType: 'Paralegal', rememberMe: true},
       {name: 'Erin Holland',username: 'erin.holland@gmail.com', password: 'Test@123', selectedType: 'Paralegal', rememberMe: true},
       {name: 'Toney Gabriel',username: 'toney.gabriel@gmail.com', password: 'Test@123', selectedType: 'Attorney', rememberMe: false}]
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
  }
}
