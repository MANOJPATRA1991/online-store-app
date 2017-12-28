import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Subject } from 'rxjs/Subject';

import { UserService } from './user.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const baseURL = "http://localhost:3000";

@Injectable()
export class GroupService {
  groups: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  
  constructor(public http: Http, public auth: UserService) { }

  getAllGroups() {
    return this.http.get(`${baseURL}/groups`)
    .map(response => {
      console.log(response);
      return response.json();
    });
  }

  updateItemGroup(itemId, newGroup) {
    return this.http.put(`${baseURL}/items/${itemId}/updateGroup`, newGroup, {headers: this.auth.headers})
    .map(response => {
      return response.json();
    });
  }
  
  addNewGroup(newGroup) {
    return this.http.post(`${baseURL}/groups/newGroup`, newGroup, {headers: this.auth.headers})
    .map(response => {
      return response.json().groups;
    })
  }

}
