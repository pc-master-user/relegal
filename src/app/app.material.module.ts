import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {CheckboxModule} from "primeng/checkbox";



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    InputTextModule,
    ButtonModule,
    CheckboxModule
  ]
})
export class AppMaterialModule { }
