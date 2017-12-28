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

  ngOnInit() {

    this.groups.getAllGroups().subscribe(value => {
      this.allGroups = value;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addNewGroup() {
    this.groups.addNewGroup({newGroup: this.group})
    .subscribe(value => {
      this.allGroups = value;
      this.onNoClick();
    });
  }

}
