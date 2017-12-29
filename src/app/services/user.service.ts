import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { User } from '../logic/User';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

// const baseURL = "https://item-store.herokuapp.com";
const baseURL = "http://localhost:3000";

@Injectable()
export class UserService {

  TOKEN_KEY: string = 'Token';
  message: BehaviorSubject<string> = new BehaviorSubject<string>('');
  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isVerified: boolean = false;
  admin: boolean = false;
  authToken: string = undefined;
  _id: string = '';
  name: BehaviorSubject<string> = new BehaviorSubject<string>('');
  username: string = '';
  email: string = '';
  myGroups: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  
  public headers: Headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http, private route: Router) {
  }

  /**
   * Use the credentials for
   * @param credentials
   */
  public useCredentials(credentials):void {
    this.isLoggedIn.next(true);
    this.username = credentials.username;
    this.authToken = credentials.token;
    this.admin = credentials.admin;
    this._id = credentials._id;
    this.name.next(credentials.name);
    this.email = credentials.email;

    // Set the token as header for your requests!
    this.headers.append('x-access-token', this.authToken);
  }

  /**
   * Store the user credentials in local storage and use them
   * @param credentials
   */
  private storeUserCredentials(credentials): void {
    // this.local.storeObject(this.TOKEN_KEY, credentials);
    this.useCredentials(credentials);
  }

  /**
   * Destroy credentials on logout
   */
  private destroyUserCredentials(): void {
    this.authToken = undefined;
    this.username = '';
    this.admin = false;
    this.isLoggedIn.next(false);
    this.name.next('');
    this.headers.delete('x-access-token');
    // this.local.remove(this.TOKEN_KEY);
  }

  /**
   * Register the user based on model data
   * @param model
   */
  register(model): Promise<any> {
    this.message.next('');
    return this.http
      .post(baseURL + '/users/register', model, {headers: this.headers}).toPromise()
      .then((response) => {
        this.message.next('');
        this.login({username: model.username, password: model.password});
      })
      .catch((error) => {
        this.message.next(error.json().err);
      });
  }

  /**
   * Log in the user based on model data
   * @param model
   */
  login(model): Promise<any> {
    this.message.next('');
    return this.http.post(baseURL + '/users/login', model, {headers: this.headers}).toPromise()
    .then((response) => {
      this.message.next('');
      this.storeUserCredentials({
        name: response.json().name,
        username: model.username,
        token: response.json().token,
        admin: response.json().admin,
        _id: response.json()._id,
        email: response.json().email
      });
      this.route.navigateByUrl('/dashboard');
    })
    .catch((err) => {
      console.log(err.json().err.message);
      this.message.next(err.json().err.message);
    });
  }

  /**
   * Logout the user from the current session
   */
  logout(): Promise<any> {
    return this.http.get(baseURL + '/users/logout').toPromise()
      .then((response) => {
        this.destroyUserCredentials();
        this.route.navigateByUrl('/login');
      });
  }

  /**
   * Edit user's profile
   * @param model 
   */
  editProfile(model): Promise<any> {
    return this.http.put(`${baseURL}/users/edit/${this._id}`, model, {headers: this.headers}).toPromise()
    .then((response) => {
      this.message.next('');
      this.name.next(response.json().name);
      console.log(response.json().name);
    })
    .catch((err) => {
      console.log(err);
      this.message.next(err.json().err.message);
    });
  }

  /**
   * Get all groups for logged in user
   */
  getMyGroups() {
    return this.http.get(`${baseURL}/users/myGroups`, {headers: this.headers})
    .map((response) => {
      console.log(response);
      return response.json();
    });
  }

  /**
   * Update user's groups
   * @param data 
   */
  updateMyGroups(data) {
    return this.http.put(`${baseURL}/users/updateGroups`, data, {headers: this.headers})
    .map((response) => {
      console.log(response);
      return response.json().groups;
    });
  }

  /**
   * Get user data
   * @param {string} uid : User id
   */
  getUser(uid) {
    return this.http.get(`${baseURL}/users/${uid}`, {headers: this.headers})
    .map((response) => {
      return response.json();
    });
  }

  /**
   * Get all user emails
   */
  getAllUsers() {
    return this.http.get(`${baseURL}/users/getAll`, {headers: this.headers})
    .map((response) => {
      return response.json();
    });
  }
}