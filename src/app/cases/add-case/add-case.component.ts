import { Component, OnInit } from '@angular/core';
import { County } from '../case';
@Component({
  selector: 'app-add-case',
  templateUrl: './add-case.component.html',
  styleUrls: ['./add-case.component.scss']
})
export class AddCaseComponent implements OnInit {
  counties: County[] = [
    this.getCounty(1, 'Albany', 3, 3),
    this.getCounty( 2	,"Allegany",	8	,4),
    this.getCounty(3,	"Bronx"	,12,	1),
    this.getCounty(4,	"Broome"	,6	,3),
    this.getCounty(5,	"Cattaraugus",	8,	4),
    this.getCounty(6,	"Cayuga",	7	,4),
    this.getCounty(7,	"Chautauqua",	8	,4),
    this.getCounty(8,	"Chemung"	,6	,3),
    this.getCounty(1, 'Albany', 3, 3),
    this.getCounty( 9	,"Chenango"	,6,	3),
  ]
  getCounty(id:number,name: string, district: number,
    division: number) { 
    const county: County = {
      id: id,
      district: district,
      division: division,
      name:name
    }
    return county;
  }
  

  selectedCounty!: string;
  constructor() { }

  ngOnInit(): void {
  }

}
