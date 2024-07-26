import { Injectable } from '@angular/core';
import { Observable, of, Subject, tap } from 'rxjs';
import { JiraTask } from '../shared/models/task';
import { HttpClient } from '@angular/common/http';
import { JIRA_ADD_TASK_URL, JIRA_ASSIGN_USER_URL, JIRA_CHANGE_STATUS_URL, JIRA_DELETE_URL, JIRA_EDIT_USER_TASK, JIRA_GET_USER_DATA_URL, JIRA_LOGIN_URL, JIRA_TASK_URL } from '../shared/constants/urls';

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

  removeTask(id: string): void {
    this._http.delete(JIRA_DELETE_URL + id).subscribe({
      next: () => {
        const index = this.tasks.findIndex(task => task.id === id);
        if (index !== -1) {
          this.tasks.splice(index, 1);
          this.setTaskToLocalStorage(this.tasks);
        }
      },
      error: () => {
        console.log("Error from service call");
      }
    })
  }

  updateTask(task: any) {
    this._http.post<JiraTask>(JIRA_EDIT_USER_TASK, task).subscribe((resp: any) => {
      const tasks = this.tasks;
      const index = tasks.findIndex(item => item.id === task.id);
      console.log(index, "indexx found??");

      if (index !== -1) {
        tasks[index] = task; // updating that index data completely
        this.setTaskToLocalStorage(tasks);
      }
    })
  }

  getExistingUserDetailsByEmail() {
    const uniqueUsers: { name: string; email: string, id: string }[] = [];
    const emails: Set<string> = new Set();
    this.tasks.forEach(item => {
      if (!emails.has(item.email)) {
        emails.add(item.email);
        uniqueUsers.push({ name: item.name, email: item.email, id: item.id });
      }
    });
    return uniqueUsers;
  }

  getTasksBySearchTerm(searchTerm: string) {
    return of(this.tasks.filter(item => item.taskName.toLowerCase().includes(searchTerm.toLowerCase())))
  }

  getTasksByStatus(taskStatus: string) {
    return of(this.tasks.filter(item => item.status === taskStatus))
  }

  assignTaskToOtherUser(user: any) {
    this._http.post<any>(JIRA_ASSIGN_USER_URL, user).subscribe({
      next: (user) => {
        console.log("user assigned sucessfully: ", user);
      },
      error: (error) => {
        console.log("error in Assigning: ", error);
      }
    }
    )
  }

  changeStatus(task: any) {
    let currentTask = this.tasks
    this._http.post(JIRA_CHANGE_STATUS_URL, task).subscribe((resp: any) => {
      const index = currentTask.findIndex(item => item._id === resp._id)
      if (index !== -1) {
        currentTask[index].status = task.status
        this.setTaskToLocalStorage(currentTask)
      }
    })
  }

  private setTaskToLocalStorage(tasks: JiraTask[]): void {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  private getTasksFromLocalStorage(): JiraTask[] {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
  }
}
