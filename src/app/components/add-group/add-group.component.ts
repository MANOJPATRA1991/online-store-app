import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatDialogRef } from '@angular/material';
import { GroupService } from '../../services/group.service';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit {

  constructor(public auth: UserService,
    public groups: GroupService,
    public dialogRef: MatDialogRef<AddGroupComponent>
  ) { }

  group: string;
  allGroups: any = [];
  myGroups: any = [];

  ngOnInit() {

    this.groups.getAllGroups().subscribe(value => {
      this.allGroups = value;
    });

    this.auth.myGroups.subscribe(value => {
      this.myGroups = value;
    });

    this.getMyGroups();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addNewGroup() {
    this.groups.addNewGroup({newGroup: this.group.toUpperCase()})
    .subscribe(value => {
      this.allGroups = value;
      this.onNoClick();
    });
  }

  getMyGroups() {
    this.auth.getMyGroups().subscribe(value => {
      this.myGroups = value;
    });
  }

  change(event, group) {
    this.auth.updateMyGroups({
      newGroup: group,
      checked: event.checked
    }).subscribe(value => {
      this.myGroups = value;
      this.auth.myGroups.next(value);
    });
  }

}
