import { Injectable } from '@angular/core';
import { Observable, of ,catchError, map, tap} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Project } from './project.js';
import { Project as ProjectClass } from './project-class.js';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projectsUrl = 'http://localhost:3000/api/projects';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient


  ) { }

  /** GET projects from the server */
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectsUrl)
      .pipe(
        tap(_ => console.log('fetched projects')),
        catchError(this.handleError<Project[]>('getProjects', []))
      );
  }

  /** GET project by id. Will 404 if id not found */
  getProject(id: number): Observable<Project> {
    const url = `${this.projectsUrl}/${id}`;
    return this.http.get<Project>(url).pipe(
      tap(_ => console.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Project>(`getProject id=${id}`))
    );
  }

  /** POST: add a new project to the server */
  addProject(project: ProjectClass): Observable<ProjectClass> {
    return this.http.post<ProjectClass>(this.projectsUrl, project, this.httpOptions).pipe(
      tap((newProject: ProjectClass) => console.log(`added hero w/ id=${newProject.name}`)),
      catchError(this.handleError<ProjectClass>('addProject'))
    );
  }

  // Handler de errores
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  } 
}

