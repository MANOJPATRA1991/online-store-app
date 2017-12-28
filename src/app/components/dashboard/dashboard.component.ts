import { Component, OnInit, ViewChild } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { UserService } from '../../services/user.service';
import { MatSidenav, MatTabLabel, MatDialog, MatTabChangeEvent } from '@angular/material';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import { Item } from '../../logic/Item';
import { EditItemComponent } from '../edit-item/edit-item.component';
import { SearchPipe} from '../../pipes/search.pipe';
import { Output } from '@angular/core/src/metadata/directives';
import { ItemsListComponent } from '../items-list/items-list.component';
import { AfterViewChecked } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewChecked {
  cols: Number;
  items: any = [];
  groups: any = [];
  model: any = new Item();
  value: Number;
  color: string;
  searchText: string;

  @ViewChild(ItemsListComponent) viewChild: ItemsListComponent;
  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor(public itemService: ItemService,
  public auth: UserService,
  public breakpointObserver: BreakpointObserver,
  public dialog: MatDialog,
) {

  breakpointObserver.observe([
    Breakpoints.HandsetLandscape,
    Breakpoints.HandsetPortrait
  ]).subscribe(result => {
    if (result.matches) {
      this.cols = 2;
    } else {
      this.cols = 4;
    }
  });
}

  ngOnInit() {
    this.itemService.item.subscribe(value => {
      let index = this.items.findIndex((elem) => {
        return elem._id == value._id;
      });
      // Update item if present in array
      if(index > -1) {
        this.items[index] = value;
      } else {
        // Insert new item
        this.items.push(value);
      }
      this.model = value;
    });

    this.itemService.items.subscribe(value => {
      this.items = value;
    });

    this.getItemsCreatedByUser();
    this.getMyGroups();
  }
  
  ngAfterViewChecked() {
  }

  getItemsCreatedByUser() {
    this.itemService.getItemsCreatedByUser()
    .subscribe(value => {
      this.items = value;
    });
  }

  getMyGroups() {
    this.auth.getMyGroups().then(value => {
      this.groups = value;
    });
  }

  getItems(event: MatTabChangeEvent) {
    this.items = [];
    switch(event.tab.textLabel) {
      case "My Items":
        this.getItemsCreatedByUser();
        break;
      case "Need Approval":
        this.getPendingItems();
        break;
      case "Incomplete":
        this.getIncompleteItems();
    }
  }

  getPendingItems() {
    this.itemService.getPendingItems()
    .subscribe(value => {
      this.items = value;
    });
  }

  getIncompleteItems() {
    this.itemService.getIncompleteItems()
    .subscribe(value => {
      this.items = value;
    });
  }
  
  showDetails($event) {
    this.model = $event;
    this.value = (+this.model.rating / +this.model.max_rating);
    let percent = +this.value*100;
    if (percent < 30) {
      this.color = "warn";
    } else if (percent > 30 &&  percent < 70) {
      this.color = "accent";
    } else {
      this.color = "primary";
    }
  }

  editItemForm(item): void {
    let dialogRef = this.dialog.open(EditItemComponent, {
      width: '500px',
      data: item 
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  approveItem($event) {
    this.itemService.approveItem($event).subscribe(value => {
      let index = this.items.findIndex((elem) => {
        return elem._id == value._id;
      });
      this.items.splice(index, 1);
      this.itemService.items.next(this.items);
      this.model = value;
    });
  }
}