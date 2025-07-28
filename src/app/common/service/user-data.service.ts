import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserDataService {
  private userChangedSource = new Subject<void>();
  userChanged$ = this.userChangedSource.asObservable();

  emitUserChanged() {
    this.userChangedSource.next();
  }
}
