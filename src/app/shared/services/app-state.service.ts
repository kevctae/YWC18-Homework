import { Injectable } from '@angular/core';

export enum WindowSize {s, m, l}

@Injectable()
export class ApplicationStateService {

  private windowSize: WindowSize;

  constructor() {
    if (window.innerWidth > 1425) {
      this.windowSize = WindowSize.l;
    } else {
      this.windowSize = WindowSize.s;
    }
  }

  public getIsMobileResolution(): WindowSize {
    return this.windowSize;
  }
}