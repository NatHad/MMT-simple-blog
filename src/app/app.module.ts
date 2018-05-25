import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here


import { AppComponent } from './app.component';

import {MatListModule, MatNavList} from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule} from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { RouterModule, Router } from '@angular/router';
import { BlogItemComponent } from './blog-item/blog-item.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogAddComponent } from './blog-add/blog-add.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatTableModule,
    MatListModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatChipsModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: BlogListComponent,
      },
      {
        path: 'blog',
        component: BlogAddComponent,
      },
         ]),
  ],
  declarations: [
    AppComponent,
    BlogItemComponent,
    BlogListComponent,
    BlogAddComponent,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
