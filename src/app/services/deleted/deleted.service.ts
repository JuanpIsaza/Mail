import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeletedService {
  private dataDeleted$ = new Subject();
  private storedDataObj = [];

  constructor() {}

  get data$() {
    return this.dataDeleted$ as Observable<any>;
  }

  set data$(value) {
    this.storedDataObj.push(value);
    this.dataDeleted$.next(value);
  }

  get storedData() {
    return this.storedDataObj;
  }
}
