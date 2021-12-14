import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {CheckboxModule} from "primeng/checkbox";
import {AppNavbarComponent} from "./components/app-navbar/app-navbar.component";
import {RippleModule} from "primeng/ripple";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";

const materialModules = [
  FormsModule,
  ReactiveFormsModule,
  InputTextModule,
  ButtonModule,
  DropdownModule,
  CheckboxModule,
  ButtonModule,
  RippleModule
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
