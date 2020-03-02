import { CountryDataService } from './../../services/country-data.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-action-table',
  templateUrl: './action-table.component.html',
  styleUrls: ['./action-table.component.scss']
})
export class ActionTableComponent implements OnInit, OnDestroy {

  selectedItems = [];
  responseData;
  isActionActive = false;
  subscriptions = new Subscription();

  constructor(private cds: CountryDataService) { }

  ngOnInit() {
    // Fetch data success subscription
    this.subscriptions.add(
      this.cds.dataFetchSuccess.subscribe(response => {
        console.log('Action table:: ', response);
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
    if (this.selectedItems.length > 0) {
      this.isActionActive = true;
    } else {
      this.isActionActive = false;
    }
  }

  getResponseReq(query): void {
    this.cds.getBackendData({
      page: query.page,
      pageSize: query.pageSize,
      search: ''
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
