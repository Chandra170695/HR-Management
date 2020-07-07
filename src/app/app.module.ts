import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import{ RouterModule,Routes} from '@angular/router';

import { FormsModule } from '@angular/forms';
import{ HttpClientModule } from '@angular/common/http';

import { Ng2SearchPipeModule } from 'ng2-search-filter';//for search filter
import {NgxPaginationModule} from 'ngx-pagination';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClientComponent } from './client/client.component';
import { RequirementComponent } from './requirement/requirement.component';
import { ProfileComponent } from './profile/profile.component';
import { BillingComponent } from './billing/billing.component';

const page : Routes =[
                        {path:"dashboard", component : DashboardComponent },
                        {path:"client", component : ClientComponent},
                        {path:"requirement", component : RequirementComponent},
                        {path:"profile", component : ProfileComponent},
                        {path:"billing", component : BillingComponent}
                     ];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    DashboardComponent,
    ClientComponent,
    RequirementComponent,
    ProfileComponent,
    BillingComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(page ,{useHash:true}),
    FormsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    NgxPaginationModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
