import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingPageService {
  controlManually: boolean;
  loadingPage = new Subject<boolean>();
  constructor() { }
  setLoadingPage(status: boolean): void {
    if (!this.controlManually) {
      this.loadingPage.next(status);
    }
  }
  getLoadingPage(): Observable<boolean> {
    return this.loadingPage.asObservable();
  }
  toggleManual(status: boolean): void {
    this.controlManually = status;
  }
}
