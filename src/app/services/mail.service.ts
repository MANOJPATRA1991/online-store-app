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
export class MailService {

  constructor(public http: Http, public auth: UserService) { }

  /**
   * Send emails to users
   * @param {string} message : Message to send
   * @param {Array} to : Array of emails
   */
  sendMail(message, to) {
    return this.http.post(`${baseURL}/mail/send`, {message: message, to: to}, {headers: this.auth.headers})
    .map(response => {
      return response.json().msg;
    })
  }
}
