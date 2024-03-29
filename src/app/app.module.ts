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
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectComponent } from './components/project/project.component';
import { ProjectsListComponent } from './components/projects-list/projects-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProjectFormComponent } from './components/project-form/project-form.component';
import { EditProjectFormComponent } from './components/edit-project-form/edit-project-form.component';
import { ProjectTicketsComponent } from './components/project-tickets/project-tickets.component';
import { MyPageComponent } from './components/my-page/my-page.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { TicketFormComponent } from './components/ticket-form/ticket-form.component';
import { TicketFilter } from './providers/ticket-filter.js';
import { DevotedTimeFormComponent } from './components/devoted-time-form/devoted-time-form.component';
import { DevotedTimeListComponent } from './components/devoted-time-list/devoted-time-list.component';
import { HomeComponent } from './components/home/home.component';
import { ProjectWikiComponent } from './components/project-wiki/project-wiki.component';


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
    TicketFormComponent,
    DevotedTimeFormComponent,
    DevotedTimeListComponent,
    HomeComponent,
    ProjectWikiComponent
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
    InputNumberModule,
    ConfirmDialogModule,
    InputTextareaModule,
    InputTextModule,
  ],
  providers: [
    provideClientHydration(),
    TicketFilter,
    ConfirmationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
