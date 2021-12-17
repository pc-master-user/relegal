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
import { ContextMenuModule } from "primeng/contextmenu";
import { SidebarModule } from 'primeng/sidebar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DockModule } from 'primeng/dock';
import { MenuModule } from 'primeng/menu';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

const materialModules = [
  FormsModule,
  ReactiveFormsModule,
  MatSidenavModule,
  InputTextModule,
  ButtonModule,
  DropdownModule,
  CheckboxModule,
  ButtonModule,
  RippleModule,
  TableModule,
  MultiSelectModule,
  ContextMenuModule,
  SidebarModule,
  DockModule,
  MenuModule,
  MatButtonModule,
  MatIconModule
];

@NgModule({
  declarations: [
    AppNavbarComponent
  ],
  imports: [
    CommonModule,
    ...materialModules
  ],
  exports: [
    ...materialModules,
    AppNavbarComponent
  ]
})
export class SharedModule { }
