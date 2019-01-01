import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  disabled = true;
  on = ['click'];

  constructor() {
    this.outsideClickHandler = this.outsideClickHandler.bind(this);
    this.outsideClickHandler2 = this.outsideClickHandler2.bind(this);
  }

  onClick(text: string) {
    alert(`CALLED ${text}`);
  }

  outsideClickHandler2() {
    alert('CLICK OUTSIDE TRIGGERED FOR SECOND CONTENT');
  }

  outsideClickHandler() {
    alert('CLICK OUTSIDE TRIGGERED FOR FIRST CONTENT');
  }
}
