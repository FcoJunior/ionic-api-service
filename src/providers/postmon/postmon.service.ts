import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';

import { PostmonAddress } from './../../model/postmon/address.model';

/*
  Generated class for the PostmonProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class PostmonService {

  protected readonly BASE_URL: URL = new URL('https://api.postmon.com.br/v1/cep/');

  constructor(
    private _http: Http
  ) { }

  public get(postalCode: string): Observable<Response> {
    return this._http
      .get(this._getEndpoint(postalCode));
  }

  private _getEndpoint(path): string {
    return this.BASE_URL + path;
  }
}
