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

  public setStoreId(id: number) {
    localStorage.setItem('STORE_ID', id.toString());
  }

  public getStoreId(): string {
    return localStorage.getItem('STORE_ID');
  }

  public setStoreUrl(url: string) {
    localStorage.setItem('STORE_URL', url);
  }

  public getStoreUrl(): string {
    return localStorage.getItem('STORE_URL');
  }

  public setStoreCNPJ(cnpj: string): void {
    localStorage.setItem('STORE_CNPJ', cnpj);
  }

  public getStoreCNPJ(): string {
    return localStorage.getItem('STORE_CNPJ');
  }

  public getProlinsId() {
    return localStorage.getItem('PROLINS_ID');
  }

}
