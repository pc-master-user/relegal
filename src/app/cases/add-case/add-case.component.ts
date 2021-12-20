import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { County, Matter, Client,Investor,Address } from '../case';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { PrimeNGConfig, ConfirmationService, MessageService } from "primeng/api";

@Component({
  selector: 'app-add-case',
  templateUrl: './add-case.component.html',
  styleUrls: ['./add-case.component.scss']
})
export class AddCaseComponent implements OnInit {
  @Input() display!: boolean;
  @Output() closeDialog = new EventEmitter();
    constructor(private store: AngularFirestore,private primengConfig: PrimeNGConfig,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { 
    this.primengConfig.ripple = true;
    }
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
  ];
  cities: any[] = [
    {name: "New York", code: 'NY'},
  ];
  caseTypes: any[] = [
    {name: "APPEALS", code: '1'},
    {name: 'EVC', code: '2'},
    {name: 'CO-OP', code: '3'},
    { name: 'LIT', code: '4' },
     {name: 'REPELVIN', code: '5'},
  ];
  clientCodes: any[] = [
    {name: 'NSM', code: '1'},
  ];
  investorCodes: any[] = [
    { name: 'CONV', code: '1' },
    { name: 'FHL', code: '2' },
    { name: 'VA', code: '3' },
    { name: 'FHA', code: '4' },
    {name: 'FNM', code: '5'},
  ];
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
  matterForm = new FormGroup({
    streetNumber: new FormControl('', [Validators.required]),
    streetName: new FormControl('', [Validators.required,]),
    city: new FormControl({}, [Validators.required,]),
    state: new FormControl('', [Validators.required,]),
    county: new FormControl({}, [Validators.required,]),
    zip: new FormControl('', [Validators.required,]),
    clientCode: new FormControl({}, [Validators.required,]),
    clientLoanNumber: new FormControl('', [Validators.required,]),
    investorCode: new FormControl({}, [Validators.required,]),
    investorLoanNumber: new FormControl('', [Validators.required,]),
    caseType: new FormControl({}, [Validators.required,]),
    defendantName: new FormControl('', [Validators.required,]),
  });
  async onSubmit() { 
 
    console.log(this.matterForm.value)
     const client: Client = {code: this.matterForm.get('clientCode')?.value?.name,loanNumber: this.matterForm.get('clientLoanNumber')?.value}
    const investor: Investor = {code: this.matterForm.get('investorCode')?.value?.name,loanNumber: this.matterForm.get('investorLoanNumber')?.value}
    const address: Address = {
      city: this.matterForm.get('city')?.value?.name,
      county: this.matterForm.get('county')?.value, state: this.matterForm.get('state')?.value,
      streetName: this.matterForm.get('streetName')?.value, streetNumber: this.matterForm.get('streetNumber')?.value,
       zipCode:this.matterForm.get('zip')?.value,
    }
    const matter: Matter = {
      caseType: this.matterForm.get('caseType')?.value?.name,
      client: client,
      defendantName: this.matterForm.get('defendantName')?.value,
      investor: investor,
      createdDate: new Date(Date.now()),
      updatedDate: new Date(Date.now()),
      property: address,
      status: "Active",
      isContested:false
    }
    await this.store.collection('Matters').add(matter);
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Matter Created', life: 3000 });
    this.closeDialog.emit();
  }
  cancel() {
    console.log('Cancel Called')
    this.confirmationService.confirm({
      message: "Current Changes will be lost",
      header: 'Cancel',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.closeDialog.emit();
      }
    });
  }

  selectedCounty!: string;


  ngOnInit(): void {
  }

}
