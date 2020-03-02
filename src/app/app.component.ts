import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-dream-app';
  tabs = [
    {name: 'Client Table', link: 'client'},
    {name: 'Action Table', link: 'action'},
    {name: 'Filter Table', link: 'filter'}
  ];
}
