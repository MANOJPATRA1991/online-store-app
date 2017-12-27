import { Component, OnInit } from '@angular/core';
import { User } from '../../../logic/User';
import { UserService } from '../../../services/user.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  error: string = '';
  private data: Observable<string>;
  user: User;
  constructor(public auth: UserService) { }

  ngOnInit() {
    this.user = new User();
  }

  signup() {
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

    if (this.user.password === this.user.repassword) {
      this.auth.register(this.user);
    } else {
      this.error = "Passwords don't match"
    }

    if(this.auth.isLoggedIn){
      subscription.unsubscribe();
    }
  }
}
