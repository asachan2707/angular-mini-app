import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  selectedGridItems = [];
  currentpage = 1;
  loading = true;
  datagridData = [];
  total = 0;
  columnNames: Array<string> = [];
  gridHeaderData = [];

  @Input() pageSize = 10;
  @Input('data')
  set data(value) {
    this.datagridData = value ? value.results : [];
    this.total = value ? value.count : 0;
    this.loading = false;
  }
  @Output() selected = new EventEmitter();
  @Output() query = new EventEmitter();

  ngOnInit() {
    this.gridHeaderData = [
      {
        display_name: 'ID',
        name: 'id',
        isSortRequired: false,
        isFilterRequired: false
      },
      {
        display_name: 'title',
        name: 'title',
        isSortRequired: false,
        isFilterRequired: false
      }
    ],
    this.columnNames = this.getColumnNames(this.gridHeaderData);
  }

  getColumnNames(columnData): Array<string> {
    return columnData.map(column => column.name);
  }

  selectedItemsChanged(selectedRows): void {
    this.selected.emit(selectedRows);
  }

  refresh(state): void {
    this.loading = true;
    this.query.emit({
      state,
      page: this.currentpage,
      pageSize: this.pageSize
    });
  }
}
