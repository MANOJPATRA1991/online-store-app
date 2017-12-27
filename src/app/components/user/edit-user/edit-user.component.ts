import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { User } from '../../../logic/User';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  user: User;
  constructor(
    public auth: UserService,
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.user = new User;
    this.user.firstname = this.auth.name.split(' ')[0];
    this.user.lastname = this.auth.name.split(' ')[1];
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  edit() {
    this.auth.editProfile(this.user);
  }

}
