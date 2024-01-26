import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectComponent } from './project/project.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { ProjectFormComponent } from './project-form/project-form.component';
import { EditProjectFormComponent } from './edit-project-form/edit-project-form.component';
import { ProjectTicketsComponent } from './project-tickets/project-tickets.component';
import { MyPageComponent } from './my-page/my-page.component';
import { TicketComponent } from './ticket/ticket.component';


@NgModule({
  declarations: [
    AppComponent,
    ProjectComponent,
    ProjectsListComponent,
    NavbarComponent,
    ProjectFormComponent,
    EditProjectFormComponent,
    ProjectTicketsComponent,
    MyPageComponent,
    TicketComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
