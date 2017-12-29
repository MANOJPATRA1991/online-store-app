import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { MailService } from '../../services/mail.service';
import { UserService } from '../../services/user.service';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit, OnChanges {

  constructor(
    public mail: MailService,
    public auth: UserService,
    public itemService: ItemService
  ) { }

  searchText: string;
  @Input() cols: Number;
  @Input() items: any = [];

  @Output() itemEvent = new EventEmitter<any>();
  
  ngOnInit() {
    
  }

  ngOnChanges() {
    
  }

  checkExpiry(model) {
    let modelDate = new Date(model.time_limit);
    // If item has not expired
    if(modelDate.getTime() < Date.now() && model.rating < model.max_rating) {
      return true;
    } else {
      // Item expired
      return false;
    }
  }
 
  deleteItem(itemId) {
    this.itemService.deleteItem(itemId)
    .subscribe(value => {
      let user = '';
      let item = value;
      this.auth.getUser(value.created_by).subscribe(value => {
        user = value.email;
        let output =
        `
        <h1>Notification from Online stores app</h1>
        <p> This is to inform you that your item ${item.name.toUpperCase()}
        has been deleted from the database since it failed to achieve
        the maximum rating with the time limit provided</p>
        <p>Thanks.</p>
        <p>Online store app</p>
        `;  
        this.mail.sendMail(output, [user]).subscribe(value => {
          console.log(value);
        });
      });
    });

    let index = this.items.findIndex((elem) => {
      return elem._id == itemId;
    });
    
    this.items.splice(index, 1);
    this.itemService.items.next(this.items);
  }

  showDetails(item) {
    this.itemEvent.emit(item);
  }

}
