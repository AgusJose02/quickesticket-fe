import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { CheckboxModule } from 'primeng/checkbox';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectComponent } from './project/project.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProjectFormComponent } from './project-form/project-form.component';
import { EditProjectFormComponent } from './edit-project-form/edit-project-form.component';
import { ProjectTicketsComponent } from './project-tickets/project-tickets.component';
import { MyPageComponent } from './my-page/my-page.component';
import { TicketComponent } from './ticket/ticket.component';
import { TicketFormComponent } from './ticket-form/ticket-form.component';
import { TicketFilter } from './ticket-filter.js';


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
    TicketComponent,
    TicketFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    CalendarModule,
    DropdownModule,
    ButtonModule,
    MessagesModule,
    CheckboxModule,
  ],
  providers: [
    provideClientHydration(),
    TicketFilter,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
