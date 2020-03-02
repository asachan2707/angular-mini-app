import { CountryDataService } from './../../services/country-data.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-client-table',
  templateUrl: './client-table.component.html',
  styleUrls: ['./client-table.component.scss']
})
export class ClientTableComponent implements OnInit, OnDestroy {

  selectedItems = [];
  responseData;
  subscriptions = new Subscription();

  constructor(private cds: CountryDataService) { }

  ngOnInit() {
    // Fetch data success subscription
    this.subscriptions.add(
      this.cds.dataFetchSuccess.subscribe(response => {
        this.responseData = response;
      })
    );
    // Fetch data failure subscription
    this.subscriptions.add(
      this.cds.dataFetchFailure.subscribe(response => {})
    );
  }

  getSelectedItemList(selectedItemList): void {
    this.selectedItems = selectedItemList;
  }

  getResponseReq(query): void {
    // this.cds.getData(query);
    this.cds.getBackendData({
      page: query.page,
      pageSize: query.pageSize,
      search: ''
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
