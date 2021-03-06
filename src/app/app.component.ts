import { Component, OnInit } from '@angular/core';
import { AppService } from './modules/app.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
  constructor(private _appSer: AppService) {}

  ngOnInit() {
    this._appSer.getProfile();
  }
}
