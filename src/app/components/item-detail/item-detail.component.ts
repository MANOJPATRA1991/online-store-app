import { Component, OnInit, OnChanges, Output, Input, EventEmitter } from '@angular/core';
import { UserService } from '../../services/user.service';
import { OnClickEvent, OnHoverRatingChangeEvent, OnRatingChangeEven } from 'angular-star-rating';
import { ItemService } from '../../services/item.service';
import { MailService } from '../../services/mail.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit, OnChanges {
  
  @Input() model: any;
  @Input()color: string = "accent";
  actual: Number;
  ratingString: string;
  users: any = [];
  onClickResult:OnClickEvent;

  @Output() approveEvent = new EventEmitter<any>();

  @Output() editEvent = new EventEmitter<any>();

  constructor(public auth: UserService, 
    public itemService: ItemService,
    public mail: MailService
  ) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.changeColor();
  }

  /**
   * Change color of progress bar
   */
  changeColor() {
    if (this.model.rating < 30) {
      this.color = "warn";
    } else if (this.model.rating > 30 &&  this.model.rating < 70) {
      this.color = "accent";
    } else if(this.model.rating > 70){
      this.color = "primary";
    }
  }

  /**
   * Approve item by admin
   * @param itemId: Item's id
   */
  approveItem(itemId) {
    this.approveEvent.emit(itemId);
  }

  /**
   * Check if item is complete
   * @param model: Item
   */
  isComplete(model) {
    let modelDate = new Date(model.time_limit);
    // If item has not expired
    if(modelDate.getTime() > Date.now() && model.rating > model.max_rating) {
      return true;
    } else {
      // Item expired
      return false;
    }
  }

  /**
   * Edit Item data
   */
  editItemForm() {
    this.editEvent.emit(true);
  }

  /**
   * Onclick event fired on user rating
   */
  onClick = ($event:OnClickEvent, model) => {
      this.onClickResult = $event;
      this.itemService.rateItem(this.onClickResult.rating, model._id)
      .subscribe(value => {
        this.itemService.item.next(value);
        this.changeColor();
      });
  };

  /**
   * Send email to all users about the newly approve item
   * @param model : Item
   */
  sendEmails(model) {
    this.auth.getAllUsers().subscribe(value => {
      value.forEach(element => {
        this.users.push(element._id)
      });

      let output =
      `
      <h1>Notification from Online stores app</h1>
      <p> This is to inform you that a new item ${model.name.toUpperCase()}
      has been approved. You can now submit your valuable ratings on this item.
      Thie item is available in groups ${model.group.join(', ')}.</p>
      <p>Thanks.</p>
      <p>Online store app</p>
      `;  
      this.mail.sendMail(output, this.users).subscribe(value => {
        console.log(value);
      });
    });
  }
}
