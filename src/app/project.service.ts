import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Project } from './project.js';
import { PROJECTS } from './mock-projects.js';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projectsUrl = 'http://localhost:3000/api/projects';

  constructor(
    private http: HttpClient
  ) { }

  /** GET projects from the server */
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectsUrl)
  }

  getProject(id: number): Observable<Project> {
    const project = PROJECTS.find(p => p.id === id)!;
    return of(project);
  }
}

