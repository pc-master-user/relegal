import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
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
    CaseInfoComponent,
  ],
  imports: [CommonModule, CasesRoutingModule, SharedModule],
  providers: [MessageService, ConfirmationService],
})
export class CasesModule {}
