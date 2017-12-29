import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import {
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatToolbarModule,
  MatButtonModule,
  MatGridListModule,
  MatSidenavModule,
  MatIconModule,
  MatMenuModule,
  MatDialogModule,
  MatSnackBarModule,
  MatDatepickerModule,
  MatSliderModule,
  MatSelectModule,
  MatNativeDateModule,
  MatTabsModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatCheckboxModule,
  MatPaginatorModule
} from '@angular/material';


import { LayoutModule } from '@angular/cdk/layout';


import { FlexLayoutModule } from '@angular/flex-layout';

import { FileSelectDirective } from 'ng2-file-upload';

import { FormsModule } from '@angular/forms';

import { routing } from './routing';

import { SignupComponent } from './components/user/signup/signup.component';
import { LoginComponent } from './components/user/login/login.component';
import { NavComponent } from './components/nav/nav.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserService } from './services/user.service';
import { UserComponent } from './components/user/user.component';
import { EditUserComponent } from './components/user/edit-user/edit-user.component';
import { CreateItemComponent } from './components/create-item/create-item.component';
import { ItemService } from './services/item.service';
import { EditItemComponent } from './components/edit-item/edit-item.component';
import { GroupService } from './services/group.service';
import { SearchPipe } from './pipes/search.pipe';
import { ItemsListComponent } from './components/items-list/items-list.component';
import { ItemDetailComponent } from './components/item-detail/item-detail.component';
import { AddGroupComponent } from './components/add-group/add-group.component';
import { FooterComponent } from './components/footer/footer.component';

import { StarRatingModule } from 'angular-star-rating';
import { MailService } from './services/mail.service';
import { ActivateGuard } from './guards/activate.guard';
import { DeactivateGuard } from './guards/deactivate.guard';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    NavComponent,
    DashboardComponent,
    UserComponent,
    EditUserComponent,
    CreateItemComponent,
    FileSelectDirective,
    EditItemComponent,
    SearchPipe,
    ItemsListComponent,
    ItemDetailComponent,
    AddGroupComponent,
    FooterComponent
  ],
  entryComponents: [
    EditUserComponent,
    CreateItemComponent,
    EditItemComponent,
    AddGroupComponent
  ],
  imports: [
    routing,
    BrowserModule,
    StarRatingModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    FormsModule,
    RouterModule,
    HttpModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    MatGridListModule,
    MatSidenavModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatSliderModule,
    MatSelectModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatTabsModule,
    MatCheckboxModule,
    MatPaginatorModule,
    LayoutModule
  ],
  providers: [
    UserService,
    ItemService,
    GroupService,
    MailService,
    ActivateGuard,
    DeactivateGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
