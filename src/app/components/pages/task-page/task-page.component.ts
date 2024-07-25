import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../../../shared/models/task';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from '../../partials/task-form/task-form.component';
import { Observable } from 'rxjs';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrl: './task-page.component.scss'
})
export class TaskPageComponent implements OnInit {

  task!: Task | undefined;
  updateTask!: any;

  constructor(private _taskService: TaskService, private _activatedRoutes: ActivatedRoute, private _router: Router, public dialogRef: MatDialog, private _adminService: AdminService) {
    let taskObservable: Observable<Task>
    this._activatedRoutes.params.subscribe((params: any) => {
      if (params.id) {
        taskObservable = this._taskService.getTaskById(params.id)
      }
      taskObservable.subscribe((resp: any) => {
        this.task = resp
      })
    })
  }
  ngOnInit(): void {

  }

  isCompleted() {
    return this.task?.isCompleted;
  }

  getDate() {
    if (this.task?.dateCreated) {
      let formatDate = new Date(this.task.dateCreated)
      const date = formatDate.getDate();
      const month = formatDate.getMonth() + 1;
      const year = formatDate.getFullYear();
      return `${date}-${month}-${year}`
    }
    return
  }

  getModifiedDate() {
    if (this.task?.dateModified) {
      let formatDate = new Date(this.task.dateModified)
      const date = formatDate.getDate();
      const month = formatDate.getMonth() + 1;
      const year = formatDate.getFullYear();
      return `${date}-${month}-${year}`
    }
    return
  }

  deleteTask(id: string) {
    this._adminService.removeTask(id);
    this._router.navigate(['']);
  }

  openDialog() {
    let dialog = this.dialogRef.open(TaskFormComponent, {
      data: { task: this.task }
    });
    dialog.afterClosed().subscribe((resp: any) => { // recieving the data from the task-form component
      if (resp) {
        this.updateTask = resp.value
        this._adminService.updateTask(this.updateTask); // updateing to localstorage from the service method
        this.task = this.updateTask // updating the task as soon as I close the dialog box
      }
    })
  }

  completeTask() {
    console.log(this.task, "task-page");

    this._taskService.markAsComplete(this.task)
  }
}
