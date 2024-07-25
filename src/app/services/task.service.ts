import { Injectable } from '@angular/core';
import { sample_tasks } from '../../data';
import { JiraTask, Task } from '../shared/models/task';
import { COMPLETED } from '../shared/constants/completed-status';
import { HttpClient } from '@angular/common/http';
import { TASK_COMPLETED_URL, TASK_DELETE_URL, TASK_EDIT_URL, TASK_NEW_URL, TASK_URL } from '../shared/constants/urls';
import { BehaviorSubject, Observable, of, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: JiraTask[] = [];
  myTasks = new Subject<JiraTask[]>();

  constructor(private _http: HttpClient) {
    this.tasks = this.getTasksFromLocalStorage();
  }


  getAllTasks(userId: string): Observable<JiraTask[]> {
    // if (this.tasks.length === 0) {
    console.log("fetching from api ->");
    return this._http.get<JiraTask[]>(`${TASK_URL}?userId=${userId}`).pipe(
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
    // }
    // else {
    //   console.log("fetching from localStorage ->");
    //   this.tasks = this.getTasksFromLocalStorage()
    //   return of(this.tasks) // of makes it a observable
    // }
  }

  getAlltasksBySearchTerm(searchTerm: string) {
    return of(this.tasks.filter(item => item.taskName.toLowerCase().includes(searchTerm.toLowerCase())))
  }

  getTaskById(id: string): Observable<any> {
    return of(this.tasks.find(item => item.id === id)) // we can use null operator in case nothing is defined (??) like this instead of undefined
  }

  removeTask(id: string): void {
    this._http.delete(TASK_DELETE_URL + id).subscribe({
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

  filterTaskByStatusCriteria(status: string) {
    // return of(criteria === 'All' ? this.tasks : this.tasks.filter(item => item.isCompleted === criteria))
    return of(this.tasks.filter(item => item.status === status))
  }

  updateTask(task: any) {
    this._http.post<Task>(TASK_EDIT_URL, task).subscribe((resp: any) => {
      const t1 = resp;
      console.log(resp, "In servicee");

    })
    const tasks = this.tasks;
    const index = tasks.findIndex(item => item.id === task.id);
    console.log(index, "indexx found??");

    if (index !== -1) {
      tasks[index] = task; // updating that index data completely
      this.setTaskToLocalStorage(tasks);
    }

  }

  markAsComplete(task: any) {
    console.log(task, "from sevice");

    this._http.post(TASK_COMPLETED_URL, task).subscribe((resp: any) => {
      const currentTask = this.tasks
      const index = currentTask.findIndex(item => item.id === task.id);
      if (index !== -1) {
        // currentTask[index].isCompleted = COMPLETED
        this.setTaskToLocalStorage(currentTask)
      }
    })
  }

  createNewTask(newTask: Task): void {
    console.log(newTask);
    this._http.post<JiraTask>(TASK_NEW_URL, newTask).subscribe({
      next: (resp: JiraTask) => {
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
