import { Component, OnInit } from '@angular/core';
import { User } from '../../../logic/User';
import { UserService } from '../../../services/user.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error: string = '';
  private data: Observable<string>;
  user: User;

  constructor(public auth: UserService) { }

  ngOnInit() {
    this.user = new User();
  }

  logIn() {
    this.error = '';
    this.data = new Observable(observer => {
      setTimeout(() => {
          observer.next(this.auth.message);
      }, 1000);
    });

    let subscription = this.data.subscribe(
      value => this.error = value,
      error => this.error = error
    );

    this.auth.login(this.user);
    
    if(this.auth.isLoggedIn){
      subscription.unsubscribe();
    }
  }

}
