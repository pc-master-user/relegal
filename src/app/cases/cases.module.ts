import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CasesRoutingModule } from './cases-routing.module';
import { StartCaseComponent } from './start-case/start-case.component';
import { SharedModule } from '../shared/shared.module';
import { CasesComponent } from './cases.component';
import { AddCaseComponent } from './add-case/add-case.component';
import { CaseInfoComponent } from './start-case/case-info/case-info.component';


@NgModule({
  declarations: [
    CasesComponent,
    StartCaseComponent,
    AddCaseComponent,
    CaseInfoComponent
  ],
  imports: [
    CommonModule,
    CasesRoutingModule,
    SharedModule
  ]
})
export class CasesModule { }
