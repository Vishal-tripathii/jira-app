import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { JiraTask } from '../shared/models/task';
import { HttpClient } from '@angular/common/http';
import { JIRA_ADD_TASK_URL, JIRA_GET_USER_DATA_URL, JIRA_LOGIN_URL, JIRA_TASK_URL } from '../shared/constants/urls';

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

  getUserTasks(userId: string): Observable<JiraTask[]> {
    // if (this.tasks.length === 0) {
    console.log("fetching from api ->");
    return this._http.get<JiraTask[]>(`${JIRA_GET_USER_DATA_URL}?userId=${userId}`).pipe(
      tap({
        next: (task) => {
          console.log("Fetched data from");

          this.tasks = task;
          this.myTasks.next(this.tasks)
          this.setTaskToLocalStorage(this.tasks)
        },
        error: (errorReponse) => {
          console.log(errorReponse, "Error in Fetching data");
        }
      })
    )
    // }
    // else {
    //   console.log("fetching from localStorage ->");
    //   this.tasks = this.getTasksFromLocalStorage()
    //   return of(this.tasks) // of makes it a observable
    // }
  }

  createNewTask(newTask: JiraTask): void {
    console.log(newTask);
    this._http.post<JiraTask>(JIRA_ADD_TASK_URL, newTask).subscribe({
      next: (resp: JiraTask) => {
        console.log("task added to database sucessfully");
        this.tasks.push(resp);
        this.setTaskToLocalStorage(this.tasks);
      },
      error: (errorResponse) => {
        console.log(errorResponse, "Error in Creating new task");
      }
    });
  }

  private setTaskToLocalStorage(tasks: JiraTask[]): void {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  private getTasksFromLocalStorage(): JiraTask[] {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
  }
}
