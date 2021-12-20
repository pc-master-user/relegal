import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {takeUntil} from "rxjs/operators";
import {AuthService} from "../auth.service";
import {Subject} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {Table} from "primeng/table";
import {PrimeNGConfig, ConfirmationService, MessageService} from "primeng/api";

export interface User {
  id?:string;
  username?:string;
  password?:string;
  name?:string;
  status?:string;
  group?:string;
  role?:string;
  rememberMe?:boolean | string;
  img?:string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  isUserLoggedIn!: boolean;
  loading = false;
  users!: User[];
  legalTypes!: any[];
  statuses!: any[];
  private unsubscribe$ = new Subject<void>();
  @ViewChild('dt') table: Table | undefined;
  @ViewChild('globalSearch') search: ElementRef | undefined;


  userDialog!: boolean;
  user!: User;
  selectedUsers!: User[] | null;

  submitted!: boolean;
  constructor(
    private authService: AuthService,
    private router: Router,
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
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
    this.legalTypes = [{name: 'Attorney', code: 'atr'}, {name: 'Paralegal', code: 'par'}, {name: 'Admin', code: 'admin'}]
    this.statuses = [{name: 'Active', code: 'act'}, {name: 'Inactive', code: 'in'}]
    this.users = [
      {"id": "1000", name: 'John Smith',username: 'john.smith@gmail.com', password: 'Test@123', role: 'Attorney', status: 'Active', group: 'alpha', rememberMe: true, img: 'https://source.unsplash.com/c_GmwfHBDzk/80x80'},
      {"id": "1001", name: 'Faith Robinson', username: 'faith.robinson@gmail.com', password: 'Test@123', role: 'Paralegal', status: 'Inactive', group: 'alpha', rememberMe: false, img: 'assets/images/user.png'},
      {"id": "1002", name: 'Track Aksam',username: 'track.aksam@gmail.com', password: 'Test@123', role: 'Admin', status: 'Active', group: 'alpha', rememberMe: true, img: 'assets/images/user1.png'},
      {"id": "1003", name: 'Scot Walter',username: 'scot.walter@gmail.com', password: 'Test@123', role: 'Admin', status: 'Active', group: 'beta', rememberMe: false, img: 'assets/images/user.png'},
      {"id": "1004", name: 'Chris Bowen',username: 'chris.bowen@gmail.com', password: 'Test@123', role: 'Attorney', status: 'Inactive', group: 'alpha', rememberMe: true, img: 'assets/images/user1.png'},
      {"id": "1005", name: 'Dan Spanser',username: 'dan.spanser@gmail.com', password: 'Test@123', role: 'Paralegal', status: 'Active', rememberMe: true, img: 'assets/images/user1.png'},
      {"id": "1006", name: 'Erin Holland',username: 'erin.holland@gmail.com', password: 'Test@123', role: 'Paralegal', status: 'Inactive', group: 'beta', rememberMe: true, img: 'assets/images/user.png'},
      {"id": "1007", name: 'Toney Gabriel',username: 'toney.gabriel@gmail.com', password: 'Test@123', role: 'Attorney', status: 'Active', group: 'beta', rememberMe: false, img: 'assets/images/user1.png'},
      {"id": "1008", name: 'Ian Chesnut',username: 'ian.chesnut@gmail.com', password: 'Test@123', role: 'Attorney', status: 'Active', rememberMe: true, img: 'assets/images/user.png'},
      {"id": "1009", name: 'Faith Robinson', username: 'faith.robinson@gmail.com', password: 'Test@123', role: 'Paralegal', status: 'Inactive', group: 'sigma', rememberMe: false, img: 'assets/images/user1.png'},
      {"id": "1010", name: 'Track Aksam',username: 'track.aksam@gmail.com', password: 'Test@123', role: 'Admin', status: 'Active', group: 'sigma', rememberMe: true, img: 'assets/images/user1.png'},
      {"id": "1011", name: 'Scot Walter',username: 'scot.walter@gmail.com', password: 'Test@123', role: 'Admin', status: 'Active', group: 'sigma', rememberMe: false, img: 'assets/images/user.png'},
      {"id": "1012", name: 'Chris Bowen',username: 'chris.bowen@gmail.com', password: 'Test@123', role: 'Attorney', status: 'Inactive', rememberMe: true, img: 'assets/images/profileImage.png'},
      {"id": "1013", name: 'Dan Spanser',username: 'dan.spanser@gmail.com', password: 'Test@123', role: 'Paralegal', status: 'Active', group: 'sigma', rememberMe: true, img: 'assets/images/user.png'},
      {"id": "1014", name: 'Erin Holland',username: 'erin.holland@gmail.com', password: 'Test@123', role: 'Paralegal', status: 'Inactive', rememberMe: true, img: 'assets/images/user1.png'},
      {"id": "1015", name: 'Toney Gabriel',username: 'toney.gabriel@gmail.com', password: 'Test@123', role: 'Attorney', status: 'Active', group: 'sigma', rememberMe: false, img: 'assets/images/user.png'},
    ]
  }

  openNew() {
    this.user = {};
    this.submitted = false;
    this.userDialog = true;
  }

  deleteSelectedUsers() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected users?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.users = this.users.filter(val => this.selectedUsers && !this.selectedUsers.includes(val));
        this.selectedUsers = null;
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Users Deleted', life: 3000});
      }
    });
  }

  editUser(user: User) {
    this.user = {...user};
    this.userDialog = true;
  }

  deleteUser(user: User) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + user.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.users = this.users.filter(val => val.id !== user.id);
        this.user = {};
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'User Deleted', life: 3000});
      }
    });
  }

  hideDialog() {
    this.userDialog = false;
    this.submitted = false;
  }

  saveUser() {
    this.submitted = true;

    if (this.user?.name && this.user?.name.trim()) {
      if (this.user.id) {
        this.users[this.findIndexById(this.user.id)] = this.user;
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'User Updated', life: 3000});
      }
      else {
        this.user.id = this.createId();
        this.user.img = 'assets/images/profile-placeholder.jpg';
        this.users.push(this.user);
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'User Created', life: 3000});
      }

      this.users = [...this.users];
      this.userDialog = false;
      this.user = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( var i = 0; i < 5; i++ ) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  test(data: any): void {
    console.log(data)
  }
}
