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
import { MailService } from '../../services/mail.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  cols: Number;
  items: any = [];
  groups: any = [];
  model: any = new Item();
  searchText: string;

  @ViewChild(ItemsListComponent) viewChild: ItemsListComponent;
  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor(public itemService: ItemService,
  public auth: UserService,
  public mail:MailService,
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
      this.cols = 6;
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
      this.auth.isLoggedIn.subscribe(value => {
        console.log(value);
      });
    });

    this.itemService.items.subscribe(value => {
      this.items = value;
    });

    this.auth.myGroups.subscribe(value => {
      this.groups = value;
    });

    this.getItemsCreatedByUser();
    this.getMyGroups();
  }

  /**
   * Get all items created by user
   */
  getItemsCreatedByUser() {
    this.itemService.getItemsCreatedByUser()
    .subscribe(value => {
      this.items = value;
    });
  }

  /**
   * Get user's groups
   */
  getMyGroups() {
    this.auth.getMyGroups().subscribe(value => {
      this.groups = value;
    });
  }

  /**
   * Get items related to tab
   * @param event: Tab change event
   */
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
        break;
      default:
        this.getItemsByGroup(event.tab.textLabel);
    }
  }

  /**
   * Get all items pending approval
   */
  getPendingItems() {
    this.itemService.getPendingItems()
    .subscribe(value => {
      this.items = value;
    });
  }

  /**
   * Get all incomplete items
   */
  getIncompleteItems() {
    this.itemService.getIncompleteItems()
    .subscribe(value => {
      this.items = value;
    });
  }

  /**
   * Get all items by group
   * @param {string} group: Group to which items belong to
   */
  getItemsByGroup(group) {
    this.itemService.getItemsByGroup(group)
    .subscribe(value => {
      this.items = value;
    })
  }
  
  /**
   * Show details for the item
   * @param $event
   */
  showDetails($event) {
    this.itemService.sidenav = true;
    this.model = $event;
  }

  /**
   * Edit item details
   * @param item: Item
   */
  editItemForm(item): void {
    let dialogRef = this.dialog.open(EditItemComponent, {
      width: '500px',
      data: item 
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  /**
   * Approve item by admin
   * @param $event
   */
  approveItem($event) {
    this.itemService.approveItem($event).subscribe(value => {
      let index = this.items.findIndex((elem) => {
        return elem._id == value._id;
      });
      let user = '';
      this.auth.getUser(value.created_by).subscribe(value => {
        user = value.email;
        let output =
        `
        <h1>Notification from Online stores app</h1>
        <p> This is to inform you that your item 
        ${this.items[index].name.toUpperCase()} 
        has been approved and now available for rating by users.
        The item is available in groups ${this.items[index].group.join(', ')}.</p>
        <p>Thanks.</p>
        <p>Online store app</p>
        `;  
        this.mail.sendMail(output, [user]).subscribe(value => {
          console.log(value);
        });
        this.items.splice(index, 1);
        this.itemService.items.next(this.items);
        this.model = value;
      });
    });
  }
}