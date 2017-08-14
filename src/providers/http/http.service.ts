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
export class HttpService {

  protected _http: Http;

  // API Development
  protected readonly BASE_URL: URL = new URL('http://teste.prolins.com.br/clublife/api');

  constructor(http: Http) {
    this._http = http;
  }

  get(uri: string, baseUrl?: string): Observable<Response> {
    let headers = this.getHeader();
    this.setBaseUrl(headers, baseUrl);
    return this._http
      .get(this.getEndpoint(uri), { headers: headers });
  }

  post(uri: string, params: any): Observable<Response> {
    let headers = this.getHeader();
    return this._http
      .post(this.getEndpoint(uri), JSON.stringify(params), { headers: headers });
  }

  put(uri: string, params: any): Observable<Response> {
    let headers = this.getHeader();
    return this._http
      .post(this.getEndpoint(uri), JSON.stringify(params), { headers: headers });
  }

  delete(uri: string, params: any): Observable<Response> {
    let headers = this.getHeader();
    return this._http
      .post(this.getEndpoint(uri), JSON.stringify(params), { headers: headers });
  }

  private getEndpoint(path): string {
    return this.BASE_URL + path;
  }

  private setBaseUrl(header: Headers, url: string) {
    if (url) {
      header.append('URL_STORE', url);
    }
  }

  private getHeader(): Headers {
    // Configure Headers
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Basic QXBwQ2x1YkxpZmU6UyBOcXojfHU0NCttSz5iIURDQCI');

    return headers
  }

}
