import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {takeUntil} from "rxjs/operators";
import {AuthService} from "../auth.service";
import {Subject} from "rxjs";
import {Router} from "@angular/router";
import {Table} from "primeng/table";
import {PrimeNGConfig} from "primeng/api";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  isUserLoggedIn!: boolean;
  loading = false;
  users!: any[];
  private unsubscribe$ = new Subject<void>();
  @ViewChild('dt') table: Table | undefined;
  @ViewChild('globalSearch') search: ElementRef | undefined;
  selectedUsers!: any[];
  constructor(
    private authService: AuthService,
    private router: Router,
    private primengConfig: PrimeNGConfig) {
    authService.getAuthObj().pipe(takeUntil(this.unsubscribe$)).subscribe( (data: any) => {
      if (data && data?.username) {
        this.isUserLoggedIn = true;
      } else {
        this.isUserLoggedIn = false;
      }
    });
    this.primengConfig.ripple = true;
  }

  ngOnInit(): void {
    if (!this.isUserLoggedIn) {
      this.router.navigate(['/']);
    }
    this.users = [
      {name: 'Ian Chesnut',username: 'ian.chesnut@gmail.com', password: 'Test@123', role: 'Attorney', status: 'Active', rememberMe: true, img: 'profileImage.png'},
      {name: 'Faith Robinson', username: 'faith.robinson@gmail.com', password: 'Test@123', role: 'Paralegal', status: 'Inactive', rememberMe: false, img: 'profileImage.png'},
      {name: 'Track Aksam',username: 'track.aksam@gmail.com', password: 'Test@123', role: 'Admin', status: 'Active', rememberMe: true, img: 'profileImage.png'},
      {name: 'Scot Walter',username: 'scot.walter@gmail.com', password: 'Test@123', role: 'Admin', status: 'Active', rememberMe: false, img: 'profileImage.png'},
      {name: 'Chris Bowen',username: 'chris.bowen@gmail.com', password: 'Test@123', role: 'Attorney', status: 'Inactive', rememberMe: true, img: 'profileImage.png'},
      {name: 'Dan Spanser',username: 'dan.spanser@gmail.com', password: 'Test@123', role: 'Paralegal', status: 'Active', rememberMe: true, img: 'profileImage.png'},
      {name: 'Erin Holland',username: 'erin.holland@gmail.com', password: 'Test@123', role: 'Paralegal', status: 'Inactive', rememberMe: true, img: 'profileImage.png'},
      {name: 'Toney Gabriel',username: 'toney.gabriel@gmail.com', password: 'Test@123', role: 'Attorney', status: 'Active', rememberMe: false, img: 'profileImage.png'}
    ]
  }

  test(data: any): void {
    console.log(data)
  }
}
