import { CountryDataService } from './../../services/country-data.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-filter-table',
  templateUrl: './filter-table.component.html',
  styleUrls: ['./filter-table.component.scss']
})
export class FilterTableComponent implements OnInit, OnDestroy {
  selectedItems = [];
  responseData;
  pageSize = 10;
  currentPage = 1;
  isActionActive = false;
  subscriptions = new Subscription();

  constructor(private cds: CountryDataService) {}

  ngOnInit() {
    // Fetch data success subscription
    this.subscriptions.add(
      this.cds.dataFetchSuccess.subscribe(response => {
        this.responseData = response;
      })
    );
    // Fetch data failure subscription
    this.subscriptions.add(this.cds.dataFetchFailure.subscribe(response => {}));
  }

  getSelectedItemList(selectedItemList): void {
    this.selectedItems = selectedItemList;
    if (this.selectedItems.length > 0) {
      this.isActionActive = true;
    } else {
      this.isActionActive = false;
    }
  }

  getResponseReq(query): void {
    this.currentPage = query.page;
    // this.cds.getData(query);
    this.cds.getBackendData({
      page: query.page,
      pageSize: query.pageSize,
      search: ''
    });
  }

  setQueryRequest(event) {
    this.pageSize = event.page_size;
    console.log('setQueryRequest:: ', event);
    this.cds.getBackendData({
      page: this.currentPage,
      pageSize: event.pageSize || 10,
      search: event.search
    });
  }

  takeAction($event) {
    let rows = this.responseData.results;
    const newData = rows.filter(row => this.selectedItems.every(item => row.id !== item.id));
    this.responseData.results = newData;
    this.responseData = JSON.parse(JSON.stringify(this.responseData));
    alert('Deleted Rows:: ' + JSON.stringify(this.selectedItems));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
