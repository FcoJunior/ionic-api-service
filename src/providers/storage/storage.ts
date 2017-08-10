import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the StorageProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class StorageProvider {

  constructor() {
    
  }

  public setIdentify(object: any): void {
    localStorage.setItem('PROLINS_ID', object.ProlinsId);
    localStorage.setItem('INNOVARO_ID', object.Id);
  }

  public isLogged(): boolean {
    if (localStorage.getItem('PROLINS_ID')) {
      return true;
    }
    return false;
  }

}
