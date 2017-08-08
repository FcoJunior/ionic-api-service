import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

/*
  Generated class for the HttpProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class HttpProvider {

  protected _http: Http;
  protected _headers: Headers;

  // API Development
  protected readonly BASE_URL: URL = new URL('http://teste.prolins.com.br/clublife/api/');

  constructor(http: Http) {
    this._http = http;

    // Configure Headers
    this._headers = new Headers();
    this._headers.append('Content-Type', 'application/json');
    this._headers.append('Authorization', 'Basic QXBwQ2x1YkxpZmU6UyBOcXojfHU0NCttSz5iIURDQCI');
  }

  get(uri: string): Observable<Response> {
    return this._http
      .get(this.getEndpoint(uri), { headers: this._headers });
  }

  post(uri: string, params: any): Observable<Response> {
    return this._http
      .post(this.getEndpoint(uri), JSON.stringify(params), { headers: this._headers });
  }

  put(uri: string, params: any): Observable<Response> {
    return this._http
      .post(this.getEndpoint(uri), JSON.stringify(params), { headers: this._headers });
  }

  delete(uri: string, params: any): Observable<Response> {
    return this._http
      .post(this.getEndpoint(uri), JSON.stringify(params), { headers: this._headers });
  }

  private getEndpoint(path): string {
    return this.BASE_URL + path;
  }

}
