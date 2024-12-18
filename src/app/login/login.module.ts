import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import {SharedModule} from "../shared/shared.module";
import { UsersComponent } from './users/users.component';
import { StatsComponent } from './stats/stats.component';
import { CalendarComponent } from './calendar/calendar.component';


@NgModule({
  declarations: [
    LoginComponent,
    UsersComponent,
    StatsComponent,
    CalendarComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    SharedModule
  ]
})
export class LoginModule { }
