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
import { MatNativeDateModule } from "@angular/material/core";
import {CardModule} from 'primeng/card';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list'
import {DividerModule} from 'primeng/divider';

import {DataViewModule} from 'primeng/dataview';

import {PanelModule} from 'primeng/panel';

import {RatingModule} from 'primeng/rating';
import { TooltipModule } from 'primeng/tooltip';
import {MatListModule} from "@angular/material/list";
import {TabMenuModule} from "primeng/tabmenu";
import {TimelineModule} from "primeng/timeline";



FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin
])
const materialModules = [
  TooltipModule,
  DividerModule,
  PanelModule,
  RatingModule,
  DataViewModule,
  FullCalendarModule,
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
  MatIconModule,
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
  TabViewModule,
  MatNativeDateModule,
  TabMenuModule,
  CardModule,
  MatListModule,
  TimelineModule
];

@NgModule({
  declarations: [
    AppNavbarComponent
  ],
  imports: [
    CommonModule,
    ...materialModules,
  ],
  exports: [
    ...materialModules,
    AppNavbarComponent
  ],
  providers: [MessageService, ConfirmationService]
})
export class SharedModule { }
