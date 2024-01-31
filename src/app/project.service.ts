import { Injectable } from '@angular/core';
import { Observable, of ,catchError, map, tap, Subject} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Project } from './project.js';
import { Project as ProjectClass } from './project-class.js';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projectsUrl = 'http://localhost:3000/api/projects';
  private newProjectSubject = new Subject<ProjectClass>();

  newProject$ = this.newProjectSubject.asObservable(); // para que al crear nuevo proyecto se redirija a su página

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
      tap(_ => console.log(`fetched project id=${id}`)),
      catchError(this.handleError<Project>(`getProject id=${id}`))
    );
  }

  /** POST: add a new project to the server */
  addProject(project: ProjectClass): Observable<ProjectClass> {
    return this.http.post<ProjectClass>(this.projectsUrl, project, this.httpOptions).pipe(
      tap((newProject: ProjectClass) => this.newProjectSubject.next(newProject)),
      catchError(this.handleError<ProjectClass>('addProject'))
    );
  }

  /** PUT: update the hero on the server */
  updateProject(project: ProjectClass): Observable<any> {
    const url = `${this.projectsUrl}/${project.id}`;

    return this.http.put(url, project, this.httpOptions).pipe(
      tap(_ => console.log(`updated project id=${project.id}`)),
      catchError(this.handleError<any>('updateProject'))
    );
  }

  /** DELETE: delete the project from the server */
  deleteProject(id: number): Observable<ProjectClass> {
    const url = `${this.projectsUrl}/${id}`;

    return this.http.delete<ProjectClass>(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted project id=${id}`)),
      catchError(this.handleError<ProjectClass>('deleteProject'))
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

