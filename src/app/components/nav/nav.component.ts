import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { EditUserComponent } from '../user/edit-user/edit-user.component';
import { CreateItemComponent } from '../create-item/create-item.component';
import { ItemService } from '../../services/item.service';
import { GroupService } from '../../services/group.service';
import { AddGroupComponent } from '../add-group/add-group.component';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(
    public auth: UserService, 
    public itemService: ItemService,
    public dialog: MatDialog,
    public groups: GroupService
  ) { 

    this.auth.name.subscribe(value => {
      this.name = value;
    });
  }

  name: string = '';
  isLoggedIn: boolean;
  
  ngOnInit() {
    this.auth.isLoggedIn.subscribe(value => {
      this.isLoggedIn = value;
    });
  }

  /**
   * Logs out the user
   */
  logout() {
    this.auth.logout();
  }

  /**
   * Open edit profile dialog
   */
  editProfileDialog(): void {
    let dialogRef = this.dialog.open(EditUserComponent, {
      width: '500px',
      data: { name: this.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  /**
   * Open create item dialog
   */
  createItemDialog(): void {
    let dialogRef = this.dialog.open(CreateItemComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  /**
   * Open dialog to add new group
   */
  addGroupDialog(): void {
    let dialogRef = this.dialog.open(AddGroupComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  /**
   * Toggle the sidenav
   */
  toggleSidenav() {
    this.itemService.sidenav = !this.itemService.sidenav;
  }

}
