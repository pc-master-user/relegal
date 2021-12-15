import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {CheckboxModule} from "primeng/checkbox";
import {AppNavbarComponent} from "./components/app-navbar/app-navbar.component";
import {RippleModule} from "primeng/ripple";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";
import {TableModule} from "primeng/table";
import {MultiSelectModule} from "primeng/multiselect";
import {ContextMenuModule} from "primeng/contextmenu";

const materialModules = [
  FormsModule,
  ReactiveFormsModule,
  InputTextModule,
  ButtonModule,
  DropdownModule,
  CheckboxModule,
  ButtonModule,
  RippleModule,
  TableModule,
  MultiSelectModule,
  ContextMenuModule
];

@NgModule({
  declarations: [
    AppNavbarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ...materialModules,
    AppNavbarComponent
  ]
})
export class SharedModule { }
