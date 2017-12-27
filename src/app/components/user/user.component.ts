import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { UserService } from '../../services/user.service';
import { EditUserComponent } from './edit-user/edit-user.component';
import { Observable } from 'rxjs/Observable';
import { CreateItemComponent } from '../create-item/create-item.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  constructor(public auth: UserService, public dialog: MatDialog) { }
  name: string = '';
  private data: Observable<string>;
  private subscription: any;

  ngOnInit() {
    this.data = new Observable(observer => {
      observer.next(this.auth.name);
    });

    this.subscription = this.data.subscribe(
      value => {
        this.name = value;
        console.log(value);
      }
    );

  }

  editProfileDialog(): void {
    let dialogRef = this.dialog.open(EditUserComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  createItemDialog(): void {
    let dialogRef = this.dialog.open(CreateItemComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
