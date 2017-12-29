import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { UserService } from './user.service';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

// const baseURL = "https://item-store.herokuapp.com";
const baseURL = "http://localhost:3000";
@Injectable()
export class ItemService {

  constructor(private http: Http, private route: Router, public auth: UserService) { }

  sidenav: boolean = false;
  items: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);
  item: BehaviorSubject<any> = new BehaviorSubject<any>({});

  /**
   * Creates new item
   * @param model : Item to create
   */
  createItem(model) {
    return this.http.post(baseURL + "/items/create", model, {headers: this.auth.headers})
    .map(response => {
      let resp = response.json();
      if(response.status === 500){
        return {message: resp.err, status: 500};
      }else{
        this.item.next(resp);
      }
    });
  }

  /**
   * Get all items created by logged in user
   */
  getItemsCreatedByUser() {
    return this.http.get(`${baseURL}/items/createdBy`, {headers: this.auth.headers})
    .map(response => {
      let resp = response.json();
      return resp;
    })
  }

  /**
   * Edit item details
   * @param {Item} item : Item to edit
   */
  editItem(item) {
    return this.http.put(`${baseURL}/items/edit/item/${item._id}`, item, {headers: this.auth.headers})
    .map(response => {
      let resp = response.json();
      console.log(resp);
      this.item.next(resp);
    });
  }

  /**
   * Get all items with pending approval from admin
   */
  getPendingItems() {
    return this.http.get(`${baseURL}/items/pending`, {headers: this.auth.headers})
    .map(response => {
      return response.json();
    });
  }

  /**
   * Get all incomplete items
   */
  getIncompleteItems() {
    return this.http.get(`${baseURL}/items/incomplete`, {headers: this.auth.headers})
    .map(response => {
      return response.json();
    });
  }

  /**
   * Approve item - only available to admin
   * @param {string} itemId : Item's id
   */
  approveItem(itemId) {
    return this.http.put(`${baseURL}/items/${itemId}/approve`, {}, {headers: this.auth.headers})
    .map(response => {
      console.log(response.json());
      return response.json();
    });
  }

  /**
   * Get all items that belong to a particular group
   * @param {string} group : Group used to retrieve items
   */
  getItemsByGroup(group) {
    return this.http.get(`${baseURL}/items/groupedBy/${group}`, {headers: this.auth.headers})
    .map(response => {
      return response.json();
    });
  }

  /**
   * Rate an item
   * @param {Number} rating : Rating
   * @param {string} itemId : Item's id
   */
  rateItem(rating, itemId) {
    return this.http.post(`${baseURL}/items/rate/${itemId}`, 
    {rating: rating}, {headers: this.auth.headers})
    .map(response => {
      return response.json().item;
    });
  }

  /**
   * Delete an item
   * @param {string} itemId : Item's id
   */
  deleteItem(itemId) {
    return this.http.delete(`${baseURL}/items/remove/${itemId}`, 
    {headers: this.auth.headers})
    .map(response => {
      return response.json();
    });
  }

}
