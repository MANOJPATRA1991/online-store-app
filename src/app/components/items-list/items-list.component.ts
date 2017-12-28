import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit {

  constructor() { }
  searchText: string;
  @Input() cols: Number;
  @Input() items: any = [];

  @Output() itemEvent = new EventEmitter<any>();
  
  ngOnInit() {
  }

  showDetails(item) {
    this.itemEvent.emit(item);
  }

}
