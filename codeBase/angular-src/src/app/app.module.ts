import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { ApplicationComponent } from './components/applications/application/application.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter'; //importing the module
import { Ng2OrderModule } from 'ng2-order-pipe'; //importing the module
//toastr
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
import { ToastrModule } from 'ngx-toastr';
import { AdministrativeUsersComponent } from './components/administrative-users/administrative-users.component';
import { AttributesComponent } from './components/attributes/attributes.component';
import { RolesComponent } from './components/roles/roles.component';
import { ResourceTypesComponent } from './components/resource-types/resource-types.component';
import { ResourcesComponent } from './components/resources/resources.component';
import { PoliciesComponent } from './components/policies/policies.component';
import { LoginComponent } from './components/login/login.component';

import { AttributeDataService } from './components/attributes/services/attribute-data.service';
//login
import { AuthService } from './components/login/services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HeaderComponent,
    ApplicationComponent,
    DashboardComponent,
    AdministrativeUsersComponent,
    AttributesComponent,
    RolesComponent,
    ResourceTypesComponent,
    ResourcesComponent,
    PoliciesComponent,
    LoginComponent
   
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2SearchPipeModule, //including into imports
    Ng2OrderModule,
    NgxPaginationModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      closeButton:true,
    }), // ToastrModule added
    RouterModule.forRoot([
      { path: '', component:DashboardComponent},
      //{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
       {path: "application",component:ApplicationComponent},
       {path: "dashboard",component:DashboardComponent},
       {path: "resourceTypes",component:ResourceTypesComponent},
       {path: 'attributes', component: AttributesComponent},
       {path: 'attributes/:id', component: AttributesComponent},
       {path: "roles",component:RolesComponent},
       {path: "resources",component:ResourcesComponent},
       {path: 'adminUsers', component: AdministrativeUsersComponent},
       {path: 'policies', component: PoliciesComponent}

      
    ])
  ],
  providers: [AttributeDataService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
