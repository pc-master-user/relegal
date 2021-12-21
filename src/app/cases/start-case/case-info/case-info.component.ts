import {
  Component,
  OnChanges,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { County, Matter, Client, Investor, Address } from '../../case';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  PrimeNGConfig,
  ConfirmationService,
  MessageService,
  Message,
} from 'primeng/api';

@Component({
  selector: 'app-case-info',
  templateUrl: './case-info.component.html',
  styleUrls: ['./case-info.component.scss'],
})
export class CaseInfoComponent implements OnInit {
  @Input() matter!: Matter;
  matterForm!: FormGroup;
  msgs: any[] = [];
  ngOnChanges(changes: SimpleChanges): void {
    console.log('value changed', this.matter);
    if (this.matter?.id) {
      // this.matterForm
      //   .get('streetNumber')
      //   ?.setValue(this.matter?.property?.streetNumber);
      this.matterForm = new FormGroup({
        streetNumber: new FormControl(this.matter?.property?.streetNumber, [
          Validators.required,
        ]),
        streetName: new FormControl(this.matter?.property?.streetName, [
          Validators.required,
        ]),
        city: new FormControl(
          this.cities.find((city) => city.name === this.matter?.property?.city),
          [Validators.required]
        ),
        state: new FormControl(this.matter?.property?.state, [
          Validators.required,
        ]),
        county: new FormControl(this.matter?.property?.county, [
          Validators.required,
        ]),
        zip: new FormControl(this.matter?.property?.zipCode, [
          Validators.required,
        ]),
        clientCode: new FormControl(
          this.clientCodes.find(
            (client) => client.name === this.matter?.client?.code
          ),
          [Validators.required]
        ),
        clientLoanNumber: new FormControl(this.matter?.client?.loanNumber, [
          Validators.required,
        ]),
        investorCode: new FormControl(
          this.investorCodes.find(
            (inv) => inv.name === this.matter?.investor?.code
          ),
          [Validators.required]
        ),
        investorLoanNumber: new FormControl(this.matter?.investor?.loanNumber, [
          Validators.required,
        ]),
        caseType: new FormControl(
          this.caseTypes.find(
            (caseType) => caseType.name === this.matter?.caseType
          ),
          [Validators.required]
        ),
        defendantName: new FormControl(this.matter?.defendantName, [
          Validators.required,
        ]),
      });
    }
  }
  constructor(
    private store: AngularFirestore,
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.primengConfig.ripple = true;
  }
  counties: County[] = [
    this.getCounty(1, 'Albany', 3, 3),
    this.getCounty(2, 'Allegany', 8, 4),
    this.getCounty(3, 'Bronx', 12, 1),
    this.getCounty(4, 'Broome', 6, 3),
    this.getCounty(5, 'Cattaraugus', 8, 4),
    this.getCounty(6, 'Cayuga', 7, 4),
    this.getCounty(7, 'Chautauqua', 8, 4),
    this.getCounty(8, 'Chemung', 6, 3),
    this.getCounty(1, 'Albany', 3, 3),
    this.getCounty(9, 'Chenango', 6, 3),
  ];
  cities: any[] = [{ name: 'New York', code: 'NY' }];
  caseTypes: any[] = [
    { name: 'APPEALS', code: '1' },
    { name: 'EVC', code: '2' },
    { name: 'CO-OP', code: '3' },
    { name: 'LIT', code: '4' },
    { name: 'REPELVIN', code: '5' },
  ];
  clientCodes: any[] = [{ name: 'NSM', code: '1' }];
  investorCodes: any[] = [
    { name: 'CONV', code: '1' },
    { name: 'FHL', code: '2' },
    { name: 'VA', code: '3' },
    { name: 'FHA', code: '4' },
    { name: 'FNM', code: '5' },
  ];
  getCounty(id: number, name: string, district: number, division: number) {
    const county: County = {
      id: id,
      district: district,
      division: division,
      name: name,
    };
    return county;
  }

  async onSubmit() {
    const client: Client = {
      code: this.matterForm.get('clientCode')?.value?.name,
      loanNumber: this.matterForm.get('clientLoanNumber')?.value,
    };
    const investor: Investor = {
      code: this.matterForm.get('investorCode')?.value?.name,
      loanNumber: this.matterForm.get('investorLoanNumber')?.value,
    };
    const address: Address = {
      city: this.matterForm.get('city')?.value?.name,
      county: this.matterForm.get('county')?.value,
      state: this.matterForm.get('state')?.value,
      streetName: this.matterForm.get('streetName')?.value,
      streetNumber: this.matterForm.get('streetNumber')?.value,
      zipCode: this.matterForm.get('zip')?.value,
    };
    const updatedMatter: Matter = {
      caseType: this.matterForm.get('caseType')?.value?.name,
      client: client,
      defendantName: this.matterForm.get('defendantName')?.value,
      investor: investor,
      updatedDate: new Date(Date.now()),
      property: address,
      status: 'Active',
      isContested: false,
    };
    // await this.store
    //   .collection('Matters')
    //   .doc(this.matter?.id)
    //   .update(updatedMatter);
    console.log('message service called');
    // this.msgs.push({
    //   severity: 'success',
    //   summary: 'Successful',
    //   detail: 'Matter Created',
    //   life: 3000,
    // });
    const mesg = this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'Matter updated',
      life: 3000,
    });
    setTimeout(() => {
      this.messageService.clear();
    }, 2000);
  }
  cancel() {
    console.log('Cancel Called');
    this.confirmationService.confirm({
      message: 'Current Changes will be lost',
      header: 'Cancel',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {},
    });
  }

  selectedCounty!: string;

  ngOnInit(): void {
    this.matterForm = new FormGroup({
      streetNumber: new FormControl(this.matter?.property?.streetNumber, [
        Validators.required,
      ]),
      streetName: new FormControl(this.matter?.property?.streetName, [
        Validators.required,
      ]),
      city: new FormControl(
        this.cities.find((city) => city.name === this.matter?.property?.city),
        [Validators.required]
      ),
      state: new FormControl(this.matter?.property?.state, [
        Validators.required,
      ]),
      county: new FormControl(this.matter?.property?.county, [
        Validators.required,
      ]),
      zip: new FormControl(this.matter?.property?.zipCode, [
        Validators.required,
      ]),
      clientCode: new FormControl(
        this.clientCodes.find(
          (client) => client.name === this.matter?.client?.code
        ),
        [Validators.required]
      ),
      clientLoanNumber: new FormControl(this.matter?.client?.loanNumber, [
        Validators.required,
      ]),
      investorCode: new FormControl(
        this.investorCodes.find(
          (inv) => inv.name === this.matter?.investor?.code
        ),
        [Validators.required]
      ),
      investorLoanNumber: new FormControl(this.matter?.investor?.loanNumber, [
        Validators.required,
      ]),
      caseType: new FormControl(
        this.caseTypes.find(
          (caseType) => caseType.name === this.matter?.caseType
        ),
        [Validators.required]
      ),
      defendantName: new FormControl(this.matter?.defendantName, [
        Validators.required,
      ]),
    });
  }
}
