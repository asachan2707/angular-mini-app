import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FilterTableComponent } from './component/filter-table/filter-table.component';
import { ClientTableComponent } from './component/client-table/client-table.component';
import { ActionTableComponent } from './component/action-table/action-table.component';

const routes: Routes = [
  { path: 'client', component: ClientTableComponent },
  { path: 'action', component: ActionTableComponent },
  { path: 'filter', component: FilterTableComponent },
  { path: '', redirectTo: 'client', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
