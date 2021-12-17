import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login.component";
import {UsersComponent} from "./users/users.component";
import {StatsComponent} from "./stats/stats.component";
import {CalendarComponent} from "./calendar/calendar.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LoginComponent,
  },
  {
    path: 'users',
    pathMatch: 'full',
    component: UsersComponent,
  },
  {
    path: 'stats',
    pathMatch: 'full',
    component: StatsComponent,
  },
  {
    path: 'calendar',
    pathMatch: 'full',
    component: CalendarComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
