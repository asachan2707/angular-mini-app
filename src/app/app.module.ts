import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './common/table/table.component';
import { ActionsComponent } from './common/actions/actions.component';
import { FilterComponent } from './common/filter/filter.component';
import { ClientTableComponent } from './component/client-table/client-table.component';
import { ActionTableComponent } from './component/action-table/action-table.component';
import { FilterTableComponent } from './component/filter-table/filter-table.component';

import { CountryDataService } from './services/country-data.service';


@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    ActionsComponent,
    FilterComponent,
    ClientTableComponent,
    ActionTableComponent,
    FilterTableComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ClarityModule
  ],
  providers: [CountryDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
