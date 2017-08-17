import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the StorageProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class StorageService {

  constructor(
    
  ) { }

  public setIdentify(object: any): void {
    //this._storage.set('PROLINS_ID', object.ProlinsId);
    //this._storage.set('INNOVARO_ID', object.Id);
    localStorage.setItem('PROLINS_ID', object.ProlinsId);
    localStorage.setItem('INNOVARO_ID', object.Id);
  }

  public isLogged(): boolean {
    // return <Promise<boolean>>this._storage.get('PROLINS_ID')
    //   .then(value => {
    //     return true;
    //   })
    //   .catch(() => {
    //     return false;
    //   });
    if (localStorage.getItem('PROLINS_ID')) {
      return true;
    }
    return false;
  }

  public setStoreId(id: number) {
    //this._storage.set('STORE_ID', id);
    localStorage.setItem('STORE_ID', id.toString());
  }

  public getStoreId(): string {
    // return <Promise<number>>this._storage.get('STORE_ID')
    //   .then(value => {
    //     return value;
    // });
    return localStorage.getItem('STORE_ID');
  }

  public setStoreUrl(url: string) {
    //this._storage.set('STORE_URL', url);
    localStorage.setItem('STORE_URL', url);
  }

  public getStoreUrl(): string {
    // return <Promise<string>>this._storage.get('STORE_URL')
    //   .then(value => {
    //     return value;
    // });
    return localStorage.getItem('STORE_URL');
  }

  public setStoreCNPJ(cnpj: string): void {
    //this._storage.set('STORE_CNPJ', cnpj);
    localStorage.setItem('STORE_CNPJ', cnpj);
  }

  public getStoreCNPJ(): string {
    // return <Promise<string>>this._storage.get('STORE_CNPJ')
    //   .then(value => {
    //     return value;
    // });
    return localStorage.getItem('STORE_CNPJ');
  }

  public getProlinsId(): string {
    // return <Promise<number>>this._storage.get('PROLINS_ID')
    //   .then(value => {
        
    //     return value;
    // });
    return localStorage.getItem('PROLINS_ID');
  }

}
