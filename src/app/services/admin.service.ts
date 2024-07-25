import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { JiraTask } from '../shared/models/task';
import { HttpClient } from '@angular/common/http';
import { JIRA_LOGIN_URL, JIRA_TASK_URL } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private tasks: JiraTask[] = [];
  myTasks = new Subject<JiraTask[]>();

  constructor(private _http: HttpClient) { 
    this.tasks = this.getTasksFromLocalStorage();
  }

  getAllTasks(): Observable<JiraTask[]> {
    return this._http.get<JiraTask[]>(JIRA_TASK_URL).pipe(
      tap({
        next: (task) => {
          console.log(task, "AdminTasks");
          this.tasks = task;
          this.myTasks.next(this.tasks)
          this.setTaskToLocalStorage(this.tasks)
        },
        error: (errorReponse) => {
          console.log(errorReponse, "Error in Fetching data");
        }
      })
    )
  }
  private setTaskToLocalStorage(tasks: JiraTask[]): void {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  private getTasksFromLocalStorage(): JiraTask[] {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
  }
}
