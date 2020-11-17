import { Component, OnInit } from '@angular/core';
import { ApplicationStateService, WindowSize } from '../shared/services/app-state.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  logoURL: string;

  constructor(private appState: ApplicationStateService) { }

  ngOnInit(): void {
    this.getLogoURL();
    this.onResize();
  }

  getLogoURL() {
    this.appState.onResize$.subscribe((size: WindowSize) => {
      switch (size) {
        case WindowSize.l:
          this.logoURL =  './assets/img/logo-l.png';
          break;
        case WindowSize.m:
          this.logoURL =  './assets/img/logo-l.png';
          break;
        case WindowSize.s:
          this.logoURL = './assets/img/logo-s.png';
          break;
        case WindowSize.mobile:
          this.logoURL = './assets/img/logo-s.png';
          break;
      }
    });
  }

  onResize() {
    this.appState.onResize();
  }

}
