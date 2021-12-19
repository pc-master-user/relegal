import { Component, OnInit } from '@angular/core';
import { CaseServiceService } from './case-service.service';
import { Case } from './case';
import {SelectItem} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

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

   legalCases!: Case[];

    sortOptions!: SelectItem[];

    sortOrder!: number;
    filter!: String;
  sortField!: string;
  sortKey!: string;
  constructor(private caseService: CaseServiceService, private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {
     this.caseService.getCases().then((data: Case[]) => this.legalCases = data);

        this.sortOptions = [
            {label: 'Price High to Low', value: '!price'},
            {label: 'Price Low to High', value: 'price'}
        ];

        this.primengConfig.ripple = true;
  }
  onSortChange(event: { value: any; }) {
    console.log(event)
        let value = event.value;

        if (value.indexOf('!') === 0) {
            this.sortOrder = -1;
            this.sortField = value.substring(1, value.length);
        }
        else {
            this.sortOrder = 1;
            this.sortField = value;
        }
  }
   onTextChange(event: Event, dv: any) {
     dv.filter(this.filter)
    }

}
