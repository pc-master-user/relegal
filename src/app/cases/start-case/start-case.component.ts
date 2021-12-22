import { Component, ElementRef, OnInit } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';
import { MessageService, PrimeIcons, PrimeNGConfig } from 'primeng/api';
import {CourtDate, referralReviewal} from '../case';
import { FormControl } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-start-case',
  templateUrl: './start-case.component.html',
  styleUrls: ['./start-case.component.scss'],
})
export class StartCaseComponent implements OnInit {
  toggle = true;
  stages!: ElementRef<MatSelectionListChange>;
  leftSideItems: string[] = [
    'Case Information',
    'Case Progress',
    'File History',
    'Comments',
    'Court Dates',
    'Parties',
    'Loan/Property Info',
    'Ledger Details',
  ];
  rightSideItems: string[] = [
    'Referral Received',
    'Title Report Reviewed',
    'First Legal Filing',
    'Service Complete',
    'Settlement Released',
    'OR/MSJ Entered',
    'ROC Received',
    'Judgement Entered',
    'Sale Held',
    'Post-Sale Deed',
  ];
  tabs: any = {};
  caseProgressMenu!: any[];
  rightNavOpenStatus!: boolean;
  leftSelectedItem!: string;
  rightSelectedItem: string = 'Referral Received';
  activeTabIndex: number = 0;

  courtDateDialog!: boolean;
  submitted!: boolean;
  selectedCourtDate!: CourtDate;
  courtDates: CourtDate[] = [];
  courtDateTypes = [
    { name: 'Settlement Conference 1' },
    { name: 'Submit Order of Reference' },
    { name: 'Status Conference' },
    { name: 'Settlement Conference 2' },
    { name: 'Settlement Conference 3' },
    { name: 'Order of Reference' },
    { name: 'Motion for Summary Judgement' },
    { name: 'JFS' },
    { name: 'OTSC' },
    { name: 'Sale' },
    { name: 'Closing' },
    { name: 'Traverse Hearing' },
    { name: 'Deposition' },
    { name: 'Publication of Service' },
    { name: "Surrogate's Court" },
    { name: '90 Day Expiration' },
    { name: 'Answer Period Expiration' },
    { name: 'MSJ' },
    { name: 'Set Sale' },
    { name: 'HUD 1st Legal' },
  ];

  // For Case progress
  //referralReceived
  referralReviewal: referralReviewal = {};
  isPostComplaintTransfer!: boolean;


  userId!: string;
  user!: any;
  cases: any;
  CaseId: string = '21-00001';
  constructor(
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private route: ActivatedRoute,
    private store: AngularFirestore
  ) {
    this.primengConfig.ripple = true;
    route.params.subscribe((params) => {
      this.userId = params['id'];
    });
    this.store
      .collection('Matters')
      .doc(this.userId)
      .valueChanges()
      .pipe(take(1))
      .subscribe((res) => {
        this.user = res;
        console.log('this.user', this.user);
        this.courtDates = this.user?.courtDates || [];
        if (this.user?.courtDates) {
          for (let i= 0; i < this.user.courtDates.length; i++){
            let a = this.user.courtDates[0];
            if (a.createdDate && a.createdDate.seconds) {
              this.user.courtDates[0].createdDate = a.createdDate.toDate();
            }
            if (a.courtDate && a.courtDate.seconds) {
              this.user.courtDates[0].courtDate = a.courtDate.toDate();
            }
            if (a.courtTime && a.courtTime.seconds) {
              this.user.courtDates[0].courtTime = a.courtTime.toDate();
            }
          }
        }
console.log(this.user?.courtDates)
        // var a = this.courtDates[0]
        // this.store.Timestamp(this.courtDates[0]?.courtDate._seconds, this.courtDates[0]?.courtDate._nanoseconds).toDate();
      });
  }
  // 8c632e
  ngOnInit(): void {
    this.caseProgressMenu = [
      {
        status: 'Referral Received',
        date: '15/10/2020 10:30',
        icon: 1,
        color: '#003050',
      },
      {
        status: 'Title Report Reviewed',
        date: '15/10/2020 14:00',
        icon: 2,
        color: '#003050',
      },
      {
        status: 'First Legal Filing',
        date: '15/10/2020 16:15',
        icon: 3,
        color: '#003050',
      },
      {
        status: 'Service Complete',
        date: '16/10/2020 10:00',
        icon: 4,
        color: '#003050',
      },
      {
        status: 'Settlement Released',
        date: '15/10/2020 10:30',
        icon: 5,
        color: '#003050',
      },
      {
        status: 'OR/MSJ Entered',
        date: '',
        icon: 6,
        color: '#bdbdbd',
      },
      {
        status: 'ROC Received',
        date: '',
        icon: 7,
        color: '#bdbdbd',
      },
      {
        status: 'Judgement Entered',
        date: '',
        icon: 8,
        color: '#bdbdbd',
      },
      {
        status: 'Sale Held',
        date: '',
        icon: 9,
        color: '#bdbdbd',
      },
      {
        status: 'Post-Sale Deed',
        date: '',
        icon: 10,
        color: '#bdbdbd',
      },
    ];
    this.tabs = {
      'Referral Received': [
        'Review',
        'SCRA Search',
        'Pacer Search',
        'Title Report Order',
      ],
      'Title Report Reviewed': ['Review', 'Intake', 'Title Issue'],
      'First Legal Filing': [
        'OCA/SOR',
        'First Legal Filing',
        'Precomplaint SCRA',
        'Precomplaint Pacer Search',
      ],
      'Service Complete': [
        'Service of Complaint',
        'TTA Expiration Date',
        'Publication of Service',
        'Death Certificate Requested',
      ],
      'Settlement Released': ['RJI', 'FSC Released', 'First FSC'],
      'OR/MSJ Entered': ['Oor Prepared', 'FSC Released', 'First FSC'],
      'ROC Received': ['RJI', 'FSC Released', 'First FSC'],
      'Judgement Entered': ['RJI', 'FSC Released', 'First FSC'],
      'Sale Held': ['RJI', 'FSC Released', 'First FSC'],
      'Post-Sale Deed': ['RJI', 'FSC Released', 'First FSC'],
    };
    this.leftSelectedItem = 'Case Information';

    this.referralReviewal.started = this.referralReviewal?.started ? this.referralReviewal.started : new Date();
    this.referralReviewal.completed = this.referralReviewal?.completed ? this.referralReviewal.completed : new Date();
    this.referralReviewal.event = this.referralReviewal?.event ? this.referralReviewal.event : new Date();
    this.referralReviewal.due = this.referralReviewal?.due ? this.referralReviewal.due : new Date();
    console.log(this.referralReviewal?.started)
  }

  leftSideChange(data: any): void {
    this.leftSelectedItem = data;
    // if (data === 'Case Progress') {
    //   this.rightSelectedItem = this.rightSideItems[0];
    //   this.rightSideChange(this.rightSelectedItem);
    // }
  }
  rightSideChange(data: any): void {
    this.activeTabIndex = 10;
    this.rightSelectedItem = data;
    setTimeout(() => {
      this.activeTabIndex = 0;
    });
  }

  findIndexById(id: string, data: any[]): number {
    let index = -1;
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }
  openNew(id: string = ''): void {
    this.selectedCourtDate = {};
    if (id) {
      this.selectedCourtDate =
        this.courtDates[this.findIndexById(id, this.courtDates)];
        this.selectedCourtDate.createdDate = this.selectedCourtDate?.createdDate ? this.selectedCourtDate?.createdDate : new Date();
        this.selectedCourtDate.courtDate = this.selectedCourtDate?.courtDate ? this.selectedCourtDate?.courtDate : new Date();
        this.selectedCourtDate.courtTime = this.selectedCourtDate?.courtTime ? this.selectedCourtDate?.courtTime : new Date();
      // this.selectedCourtDate.createdDate = new Date();
      // this.selectedCourtDate.courtDate = new Date();
    }
    this.submitted = false;
    this.courtDateDialog = true;
    this.selectedCourtDate.createdDate = new FormControl(
      this.selectedCourtDate.createdDate
        ? this.selectedCourtDate.createdDate
        : new Date()
    ).value;
    this.selectedCourtDate.courtDate = new FormControl(
      this.selectedCourtDate.courtDate
        ? this.selectedCourtDate.courtDate
        : new Date()
    ).value;
  }

  hideDialog() {
    this.courtDateDialog = false;
    this.submitted = false;
  }

  async saveCourtDate() {
    this.submitted = true;
    if (this.selectedCourtDate.id) {
      this.courtDates[
        this.findIndexById(this.selectedCourtDate?.id, this.courtDates)
      ] = this.selectedCourtDate;
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Court Date Updated',
        life: 3000,
      });
    } else {
      this.selectedCourtDate.id = this.createId();
      this.courtDates && this.courtDates.push(this.selectedCourtDate);
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'A new Court Date Created',
        life: 3000,
      });
    }
    this.courtDates = [...this.courtDates];
    this.courtDateDialog = false;
    console.log(' this.selectedCourtDate', this.selectedCourtDate);
    this.selectedCourtDate = {};
    if (this.userId) {
      console.log();
      await this.store
        .collection(`Matters/`)
        .doc(`${this.userId}`)
        .update({ courtDates: this.courtDates });
    }
  }

  createId(): string {
    let id = '';
    var chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }
  toDateString(date: Date) {
    return moment(date).format('MM/DD/YYYY');
  }
  toTimeString(date: Date) {
    return moment(date).format('HH/mm');
  }
}
