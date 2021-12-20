import {Component, ElementRef, OnInit} from '@angular/core';
import {MatSelectionListChange} from "@angular/material/list";
import {PrimeIcons} from "primeng/api";

@Component({
  selector: 'app-start-case',
  templateUrl: './start-case.component.html',
  styleUrls: ['./start-case.component.scss']
})
export class StartCaseComponent implements OnInit {
  toggle = true
  stages!: ElementRef<MatSelectionListChange>;
  leftSideItems: string[] = ['Case Info', 'Case Progress', 'File History', 'Comments', 'Court Dates', 'Parties', 'Loan/Property Info', 'Ledger Details'];
  rightSideItems: string[] = ['Referral Received', 'Title Report Reviewed', 'First Legal Filing', 'Service Complete', 'Settlement Released', 'OR/MSJ Entered', 'ROC Received', 'Judgement Entered', 'Sale Held', 'Post-Sale Deed'];
  tabs: any = {};
  rightEvents1!: any[];
  rightNavOpenStatus!: boolean;
  leftSelectedItem!: string;
  rightSelectedItem!: string;
  activeTabIndex!: number;

  CaseId: string = '21-00001';
  constructor() { }

  ngOnInit(): void {
    this.rightEvents1 = [
      {
        status: "Referral Received",
        date: "15/10/2020 10:30",
        icon: 1,
        color: "#689F38"
      },
      {
        status: "Title Report Reviewed",
        date: "15/10/2020 14:00",
        icon: 2,
        color: "#689F38"
      },
      {
        status: "First Legal Filing",
        date: "15/10/2020 16:15",
        icon: 3,
        color: "#689F38"
      },
      {
        status: "Service Complete",
        date: "16/10/2020 10:00",
        icon: 4,
        color: "#689F38"
      },
      {
        status: "Settlement Released",
        date: "15/10/2020 10:30",
        icon: 5,
        color: "#689F38"
      },
      {
        status: "OR/MSJ Entered",
        date: "",
        icon: 6,
        color: "#bdbdbd"
      },
      {
        status: "ROC Received",
        date: "",
        icon: 7,
        color: "#bdbdbd"
      },
      {
        status: "Judgement Entered",
        date: "",
        icon: 8,
        color: "#bdbdbd"
      },
      {
        status: "Sale Held",
        date: "",
        icon: 9,
        color: "#bdbdbd"
      },
      {
        status: "Post-Sale Deed",
        date: "",
        icon: 10,
        color: "#bdbdbd"
      }
    ];
    this.tabs = {
      'Referral Received': ['Review', 'SCRA Search', 'Pacer Search', 'Title Report Order'],
      'Title Report Reviewed': ['Review', 'Intake', 'Title Issue'],
      'First Legal Filing': ['OCA/SOR', 'First Legal Filing', 'Precomplaint SCRA', 'Precomplaint Pacer Search'],
      'Service Complete': ['Service of Complaint', 'TTA Expiration Date', 'Publication of Service', 'Death Certificate Requested'],
      'Settlement Conf.Released': ['RJI', 'FSC Released', 'First FSC'],
      'OR/MSJ Entered': ['Oor Prepared', 'FSC Released', 'First FSC'],
      'ROC Received': ['RJI', 'FSC Released', 'First FSC'],
      'Judgement Entered': ['RJI', 'FSC Released', 'First FSC'],
      'Sale Held': ['RJI', 'FSC Released', 'First FSC'],
      'Post-Sale Deed Recording': ['RJI', 'FSC Released', 'First FSC']
    };
    this.leftSelectedItem = 'Case Info';
    this.leftSideChange('Case Info')
    // this.items = [
    //   {label: 'Home', icon: 'pi pi-fw pi-home'},
    //   {label: 'Calendar', icon: 'pi pi-fw pi-calendar'},
    //   {label: 'Edit', icon: 'pi pi-fw pi-pencil'},
    //   {label: 'Documentation', icon: 'pi pi-fw pi-file'},
    //   {label: 'Settings', icon: 'pi pi-fw pi-cog'}
    // ];
  }

  leftSideChange(data: any): void {
    this.leftSelectedItem = data;
    if (data === 'Case Progress') {
      this.rightNavOpenStatus = true;
      this.rightSelectedItem = this.rightSideItems[0];
      this.rightSideChange(this.rightSelectedItem)
    } else {
      this.rightNavOpenStatus = false ;
    }
  }
  rightSideChange(data: any): void {
    this.activeTabIndex = 10;
    this.rightSelectedItem = data;
    setTimeout(() => {
      this.activeTabIndex = 0;
    }, 10);
  }

}
