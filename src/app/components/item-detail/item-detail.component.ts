import { Component, OnInit, OnChanges, Output, Input, EventEmitter } from '@angular/core';
import { UserService } from '../../services/user.service';
import { OnClickEvent, OnHoverRatingChangeEvent, OnRatingChangeEven } from 'angular-star-rating';
import { ItemService } from '../../services/item.service';

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
  
  @Output() approveEvent = new EventEmitter<any>();

  @Output() editEvent = new EventEmitter<any>();

  constructor(public auth: UserService, 
    public itemService: ItemService
  ) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.changeColor();
  }

  changeColor() {
    if (this.model.rating < 30) {
      this.color = "warn";
    } else if (this.model.rating > 30 &&  this.model.rating < 70) {
      this.color = "accent";
    } else if(this.model.rating > 70){
      this.color = "primary";
    }
  }


  approveItem(itemId) {
    this.approveEvent.emit(itemId);
  }

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

  editItemForm() {
    this.editEvent.emit(true);
  }

  onClickResult:OnClickEvent;
 
  onClick = ($event:OnClickEvent, model) => {
      this.onClickResult = $event;
      this.itemService.rateItem(this.onClickResult.rating, model._id)
      .subscribe(value => {
        this.itemService.item.next(value);
        this.changeColor();
      });
  };
}
