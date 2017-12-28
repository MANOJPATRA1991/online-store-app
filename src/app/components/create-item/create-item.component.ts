import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';

import { UserService } from '../../services/user.service';
import { ItemService } from '../../services/item.service';
import { Item } from '../../logic/Item';

const URL = 'http://localhost:3000';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.css']
})
export class CreateItemComponent implements OnInit {

  item: Item;
  range: Array<Number> = [];

  public uploader:FileUploader = new FileUploader({url: `${URL}/upload`, itemAlias: 'photo'});

  constructor(
    public itemService: ItemService,
    public dialogRef: MatDialogRef<CreateItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.item = new Item();

    for (let i = 0; i < 10; i++) {
      this.range.push(i+1);
    }

    this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
      console.log("ImageUpload:uploaded:", item, status, response);
      this.item.image = `${JSON.parse(response).file}`;
    };
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createItem() {
    this.item.max_rating = this.calculateRating();
    this.itemService.createItem({
        name: this.item.name,
        image: this.item.image,
        description: this.item.description,
        max_rating: this.item.max_rating,
        time_limit: this.item.time_limit
    }).subscribe(value => {
      // check for error
      console.log(value);
    });
    this.onNoClick();
  }

  calculateRating() {
    return (+this.item.max_rating)*(+this.item.multiplier);
  }
}
