import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';

import { UserService } from '../../services/user.service';
import { ItemService } from '../../services/item.service';
import { Item } from '../../logic/Item';
import { GroupService } from '../../services/group.service';

const URL = 'http://localhost:3000';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {

  item: Item;
  range: Array<Number> = [];
  groupsList: Array<string> =[];
  public uploader:FileUploader = new FileUploader({url: `${URL}/upload`, itemAlias: 'photo'});

  constructor(
    public auth: UserService,
    public itemService: ItemService,
    public dialogRef: MatDialogRef<EditItemComponent>,
    public groups: GroupService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.item = new Item();
    this.item = this.data;

    for (let i = 0; i < 10; i++) {
      this.range.push(i+1);
    }

    this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
      console.log("ImageUpload:uploaded:", item, status, response);
      this.item.image = `${JSON.parse(response).file}`;
    };

    this.getAllGroups();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  editItem() {
    this.itemService.editItem(this.item);
    this.onNoClick();
  }

  getAllGroups() {
    this.groups.getAllGroups().subscribe(value => {
      console.log(value);
      this.groupsList = value;
    })
  }

  change(event, group) {
    console.log(event);
    this.groups.updateItemGroup(this.data._id, {newGroup: group, checked: event.checked}).subscribe(value => {
      console.log(value);
      this.item = value;
      console.log(this.item);
      this.itemService.item.next(value);
    });
  }
}
