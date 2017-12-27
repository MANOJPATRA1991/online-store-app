import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { UserService } from './user.service';

const baseURL = "http://localhost:3000";

@Injectable()
export class ItemService {

  constructor(private http: Http, private route: Router, public auth: UserService) { }

  createItem(model) {
    return this.http.post(baseURL + "/items/create", model, {headers: this.auth.headers})
    .map(response => {
      let resp = response.json();
      if(response.status === 500){
        return {message: resp.err, status: 500};
      }else{
        return {message:resp.message, status:200};
      }
    });
  }
}
