import { Component, OnInit } from '@angular/core';
import { CaseServiceService } from './case-service.service';
import { Case } from './case';
import {SelectItem} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import * as moment from 'moment';
@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.scss']
})
export class CasesComponent implements OnInit {
    display: boolean = false;
    showDialog() {
        this.display = true;
    }
    closeDialog() {
        this.display = false;
    }
    legalCases!: Case[];
     items: Observable<any[]>;
    sortOptions!: SelectItem[];
    caseType!: boolean;
    sortOrder!: number;
    filter!: String;
    sortField!: string;
    sortKey!: string;
    dateRange!: string[];
    caseStatus!: String;
    constructor(private caseService: CaseServiceService, private primengConfig: PrimeNGConfig, private store: AngularFirestore) {
      this.items=  this.store.collection('Matters').valueChanges();
    }
    caseTypes: any[] = [
        "APPEALS",
        'EVC',
        'CO-OP',
        'LIT',
        'REPELVIN'
    ];
    statusOptions: any[] = [
        'Active',
        'Hold',
        'Closed'
    ];
  toDateString(date: Date) { 
    return moment(date).format('DD/MM/YYYY');
  }
  ngOnInit(): void {
      this.caseService.getCases().then((data: Case[]) => this.legalCases = data);
      
        this.sortOptions = [
            {label: 'Price High to Low', value: '!price'},
            {label: 'Price Low to High', value: 'price'}
        ];

        this.primengConfig.ripple = true;
  }
    onSortChange() {
      console.log(this.dateRange)
      this.items = this.store.collection('Matters',
          ref => {
          let query : firebase.default.firestore.CollectionReference | firebase.default.firestore.Query = ref;
          if (this.caseType) { query = query.where('caseType', '==', this.caseType) };
              if (this.caseStatus) { query = query.where('status', '==', this.caseStatus) };
                if (this.dateRange?.length==2) {
                  query = query.where('createdDate', '>=',this.dateRange[0] ).where('createdDate', '<=', this.dateRange[1]);
              };
          return query;
        }
      ).valueChanges();
        
  }
    onTextChange(event: Event, dv: any) {
        console.log(this.dateRange)
       this.items = this.store.collection('Matters',
          ref => {
          let query : firebase.default.firestore.CollectionReference | firebase.default.firestore.Query = ref;
          if (this.caseType) { query = query.where('caseType', '==', this.caseType) };
              if (this.caseStatus) { query = query.where('status', '==', this.caseStatus) };
              if (this.filter) {
                  query = query.where('defendantName', '>=', this.filter).where('defendantName', '<=', this.filter+ '\uf8ff').orderBy('defendantName');
              };
               if (this.dateRange?.length==2) {
                  query = query.where('createdDate', '>=',this.dateRange[0] ).where('createdDate', '<=', this.dateRange[1]);
              };
            //   if (this.dateRange?.length==2) {
            //       query = query.where('createdDate', '>=', ).where('createdDate', '<=', this.filter+ '\uf8ff').orderBy('defendantName');
            //   };
          return query;
        }
      ).valueChanges();
    }

}
