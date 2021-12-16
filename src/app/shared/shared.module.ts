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
import {ToastModule} from 'primeng/toast';
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ToolbarModule} from "primeng/toolbar";
import {DialogModule} from "primeng/dialog";
import {SliderModule} from "primeng/slider";
import {ProgressBarModule} from "primeng/progressbar";
import {CalendarModule} from "primeng/calendar";
import {InputTextareaModule} from "primeng/inputtextarea";
import {InputNumberModule} from "primeng/inputnumber";
import {FileUploadModule} from "primeng/fileupload";
import {RadioButtonModule} from "primeng/radiobutton";
import {ConfirmationService, MessageService} from "primeng/api";
import {TabViewModule} from "primeng/tabview";

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
  ContextMenuModule,
  ToastModule,
  ConfirmDialogModule,
  ToolbarModule,
  FileUploadModule,
  DialogModule,
  CalendarModule,
  SliderModule,
  ProgressBarModule,
  RadioButtonModule,
  InputNumberModule,
  InputTextareaModule,
  TabViewModule
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
  ],
  providers: [MessageService, ConfirmationService]
})
export class SharedModule { }
