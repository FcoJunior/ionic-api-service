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

  protected http: Http;
  protected headers: Headers;

  // API Development
  protected readonly baseUrl: URL = new URL('https://api.postmon.com.br/v1/cep/');

  // API Production
  // protected readonly baseUrl: URL = new URL('http://api.clublifetogo.com.br/api');

  constructor(http: Http) {
    this.http = http;

    // Configure Headers
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', 'Basic QXBwQ2x1YkxpZmU6UyBOcXojfHU0NCttSz5iIURDQCI');
  }

  get(uri: string): Observable<Response> {
    return this.http
      .get(this.getEndpoint(uri), { headers: this.headers });
  }

  post(uri: string, params: any, success: (success: any) => any, error: (error: any) => any):void {
    this.http
      .post(this.getEndpoint(uri), JSON.stringify(params), { headers: this.headers })
      .subscribe(
        response => success(response.json()), 
        error => error(error));
  }

  put(uri: string, params: any): Observable<Response> {
    return this.http
      .post(this.getEndpoint(uri), JSON.stringify(params), { headers: this.headers });
  }

  delete(uri: string, params: any): Observable<Response> {
    return this.http
      .post(this.getEndpoint(uri), JSON.stringify(params), { headers: this.headers });
  }

  private getEndpoint(path): string {
    return this.baseUrl + path;
  }

}
