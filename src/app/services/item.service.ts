import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { UserService } from './user.service';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const baseURL = "http://localhost:3000";

@Injectable()
export class ItemService {

  constructor(private http: Http, private route: Router, public auth: UserService) { }

  sidenav: boolean = true;
  items: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);
  item: BehaviorSubject<any> = new BehaviorSubject<any>({});

  createItem(model) {
    return this.http.post(baseURL + "/items/create", model, {headers: this.auth.headers})
    .map(response => {
      let resp = response.json();
      if(response.status === 500){
        return {message: resp.err, status: 500};
      }else{
        console.log(resp);
        this.item.next(resp);
      }
    });
  }

  getItemsCreatedByUser() {
    return this.http.get(`${baseURL}/items/createdBy`, {headers: this.auth.headers})
    .map(response => {
      let resp = response.json();
      return resp;
    })
  }

  editItem(item) {
    return this.http.put(`${baseURL}/items/edit/item/${item._id}`, item, {headers: this.auth.headers})
    .map(response => {
      let resp = response.json();
      console.log(resp);
      this.item.next(resp);
    });
  }

  getPendingItems() {
    return this.http.get(`${baseURL}/items/pending`, {headers: this.auth.headers})
    .map(response => {
      return response.json();
    });
  }

  getIncompleteItems() {
    return this.http.get(`${baseURL}/items/incomplete`, {headers: this.auth.headers})
    .map(response => {
      return response.json();
    });
  }

  approveItem(itemId) {
    return this.http.put(`${baseURL}/items/${itemId}/approve`, {}, {headers: this.auth.headers})
    .map(response => {
      console.log(response.json());
      return response.json();
    });
  }

}
