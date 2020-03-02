import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {

  @Input() isActive = !true;
  @Output() query = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  takeAction(event) {
    if (event === 'delete') {
      this.query.emit(event);
    }
  }

}
