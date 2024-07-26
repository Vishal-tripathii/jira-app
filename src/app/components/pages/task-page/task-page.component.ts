import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { JiraTask, Task } from '../../../shared/models/task';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from '../../partials/task-form/task-form.component';
import { Observable } from 'rxjs';
import { AdminService } from '../../../services/admin.service';
import { UserService } from '../../../services/user.service';
import { Roles } from '../../../shared/constants/roles';
import { Status } from '../../../shared/models/status';

@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrl: './task-page.component.scss'
})
export class TaskPageComponent implements OnInit {

  task!: JiraTask | undefined;
  updateTask!: any;
  userType!: any;
  existingUsers!: any;
  selectedUser!: any;
  statusValues = Object.values(Status)
  selectedStatus!: any;

  constructor(private _taskService: TaskService,
    private _activatedRoutes: ActivatedRoute,
    private _router: Router,
    public dialogRef: MatDialog,
    private _adminService: AdminService,
    private _userService: UserService) {
    let taskObservable: Observable<Task>
    this._userService.getExistingUsers().subscribe((serverResponse: any) => {
      this.existingUsers = serverResponse
    })
    this._activatedRoutes.params.subscribe((params: any) => {
      this.userType = params['userType']; // if userType is aDMIn then need to change the template
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

  change(statusValue: string, task: any) {
    this.selectedStatus = statusValue;
    this._adminService.changeStatus({ ...task, status: statusValue }); // the task is not updating on frontend simultaneously, need to fix that
  }

  assignTo(user: any, _id: string) {
    const { name, email } = user
    this.selectedUser = { name: name, email: email, _id: _id }
    this._adminService.assignTaskToOtherUser(this.selectedUser)
  }

  getUserType() {
    return this.userType === Roles.ADMIN;
  }
}
