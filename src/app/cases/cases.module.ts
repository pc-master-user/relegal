import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CasesRoutingModule } from './cases-routing.module';
import { StartCaseComponent } from './start-case/start-case.component';
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    StartCaseComponent
  ],
  imports: [
    CommonModule,
    CasesRoutingModule,
    SharedModule
  ]
})
export class CasesModule { }
