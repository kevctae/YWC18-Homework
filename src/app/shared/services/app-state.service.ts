import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

export enum WindowSize {mobile, s, m, l}

@Injectable({
  providedIn: 'root'
})
export class ApplicationStateService {

  private windowSize = new Subject<WindowSize>();

  constructor() {
    this.windowSize = new Subject();
  }

  get onResize$(): Observable<WindowSize> {
    return this.windowSize.asObservable().pipe(distinctUntilChanged());
  }

  onResize() {
    if (window.innerWidth > 1425) {
      this.windowSize.next(WindowSize.l);
    } else if (window.innerWidth > 1000) {
      this.windowSize.next(WindowSize.m);
    } else if (window.innerWidth > 480){
      this.windowSize.next(WindowSize.s);
    } else {
      this.windowSize.next(WindowSize.mobile)
    }
  }
}