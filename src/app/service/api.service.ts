import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  rootUrl:string;
  constructor(private _httpClient:HttpClient) {
    this.rootUrl = environment.apiUrl;
   }




  getapi(api:any) {
    return this._httpClient.get(this.rootUrl + api).pipe(retry(3));
  }

  
  postapi(api:any,data:any) {
    return this._httpClient.post(this.rootUrl + api,data).pipe(retry(3));
  }


  setstorage(x: any, y: any) {
    localStorage.setItem(x, JSON.stringify(y));
  }

  getstorage(x: any) {
    return JSON.parse(localStorage.getItem(x) || '{}');
  }

  removestorage(x: any) {
    localStorage.removeItem(x);
  }

  clearstorage() {
    localStorage.clear();
  }


  setsession(x: any, y: any) {
    sessionStorage.setItem(x, JSON.stringify(y));
  }

  getsession(x: any) {
    let returnUrl = sessionStorage.getItem(x)
    if (returnUrl) {
      return JSON.parse(returnUrl);
    }
    else {
      return null;
    }

  }

  removesession(x: any) {
    sessionStorage.removeItem(x);
  }

  clearsession() {
    sessionStorage.clear();
  }



}
