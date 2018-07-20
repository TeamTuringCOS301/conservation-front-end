import { CONFIG } from './app-config';
import { Injectable } from '@angular/core';
import { Headers, Http as AngularHttp } from '@angular/http';

@Injectable()
export class Http {
  constructor(private http: AngularHttp) {}

  get(path: string) {
    return this.http.get(CONFIG.url + path, {withCredentials: true});
  }

  post(path: string, data: any) {
    return this.http.post(CONFIG.url + path, JSON.stringify(data), {
      headers: new Headers({'Content-Type': 'application/json'}),
      withCredentials: true
    });
  }
};
