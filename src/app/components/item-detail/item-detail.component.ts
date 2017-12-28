import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {

  @Input() model: any;
  @Input() color: string;
  @Input() value: Number;
  
  @Output() approveEvent = new EventEmitter<any>();

  @Output() editEvent = new EventEmitter<any>();

  constructor(public auth: UserService) { }

  ngOnInit() {
  }

  approveItem(itemId) {
    this.approveEvent.emit(itemId);
  }

  editItemForm() {
    this.editEvent.emit(true);
  }
}
