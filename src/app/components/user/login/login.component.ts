import { Component, OnInit, OnDestroy } from '@angular/core';
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

  /**
   * Log in user
   */
  logIn() {

    this.auth.message.subscribe(
      value => this.error = value,
      error => this.error = error
    );

    this.auth.login(this.user);
    
  }

}
