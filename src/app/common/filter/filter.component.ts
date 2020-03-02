import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  country_search = '';
  item_per_page;

  @Output() query = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  searchCountry() {
    this.query.emit({
      search: this.country_search,
      pageSize: this.item_per_page
    });
  }

  reset() {
    this.item_per_page = null;
    this.country_search = '';
    this.searchCountry();
  }
}
