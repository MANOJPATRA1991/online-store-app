import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Subject } from 'rxjs/Subject';

import { UserService } from './user.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

// const baseURL = "https://item-store.herokuapp.com";
const baseURL = "http://localhost:3000";
@Injectable()
export class GroupService {
  groups: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  
  constructor(public http: Http, public auth: UserService) { }

  /**
   * Get all groups
   */
  getAllGroups() {
    return this.http.get(`${baseURL}/groups`)
    .map(response => {
      console.log(response);
      return response.json();
    });
  }

  /**
   * Update group for an item
   * @param {string} itemId : Item's id
   * @param {Number} newGroup : New group to be added to item's list of groups
   */
  updateItemGroup(itemId, newGroup) {
    return this.http.put(`${baseURL}/items/${itemId}/updateGroup`, newGroup, {headers: this.auth.headers})
    .map(response => {
      return response.json();
    });
  }
  
  /**
   * Adds new group
   * @param {string} newGroup : New group to be added
   */
  addNewGroup(newGroup) {
    return this.http.post(`${baseURL}/groups/newGroup`, newGroup, {headers: this.auth.headers})
    .map(response => {
      return response.json().groups;
    })
  }

}
