import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { JiraTask, Task } from '../../../shared/models/task';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskComponent } from '../../partials/create-task/create-task.component';
import { Observable } from 'rxjs';
import { UserService } from '../../../services/user.service';
import { AdminService } from '../../../services/admin.service';
import { Roles } from '../../../shared/constants/roles';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  task: JiraTask[] = [];
  notFound!: boolean;

  constructor(private _taskService: TaskService, private _activatedRoutes: ActivatedRoute, private _router: Router, public dialogRef: MatDialog, private _userService: UserService, private _adminService: AdminService) {
    let currentUser = this._userService.getCurrentUser();

    this._taskService.myTasks.subscribe((resp: any) => {
      this.notFound = resp.length > 0 ? false : true;
    });

    let taskObservable: Observable<JiraTask[]>
    _activatedRoutes.params.subscribe((params: any) => {
      if (params.searchTerm) {
        // taskObservable = this._taskService.getAlltasksBySearchTerm(params.searchTerm)
      }
      else if (params.tag) {
        // taskObservable = _taskService.filterTaskByCompletionCriteria(params.tag)
      }
      else {
        taskObservable = this._adminService.getUserTasks(currentUser?._id!);
      }
      taskObservable.subscribe((serverResponse: any) => {
        this.task = serverResponse;
      })
    })
  }

  ngOnInit(): void {

  }

  goto(id: string) {
    if (id) {
      this._router.navigate([`task/${id}`])
    }
  }

  createNewTask() {
    let dialog = this.dialogRef.open(CreateTaskComponent, {
      data: { type: Roles.EMPLOYEE }
    });
    dialog.afterClosed().subscribe((resp: any) => {
      if (resp) {
        this._adminService.createNewTask(resp.value)
      }
    })
  }

}
