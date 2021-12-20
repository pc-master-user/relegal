import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CasesComponent} from "./cases.component";
import {StartCaseComponent} from "./start-case/start-case.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CasesComponent,
  },
  {
    path: 'start/:id',
    pathMatch: 'full',
    component: StartCaseComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CasesRoutingModule { }
