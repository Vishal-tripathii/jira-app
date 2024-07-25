import { Component, OnInit } from '@angular/core';
import { JiraTask } from '../../../shared/models/task';
import { AdminService } from '../../../services/admin.service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskComponent } from '../../partials/create-task/create-task.component';
import { Roles } from '../../../shared/constants/roles';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss'
})
export class AdminPageComponent implements OnInit {

  task: JiraTask[] = [];

  constructor(private _adminService: AdminService, public dialogRef: MatDialog) {
    let taskObservable: Observable<JiraTask[]>
    taskObservable = this._adminService.getAllTasks()

    taskObservable.subscribe((serverResponse: any) => {
      this.task = serverResponse;
      console.log(this.task, "these are admin-data");
    })
  }

  ngOnInit(): void {

  }

  createTask() {
    let dialog = this.dialogRef.open(CreateTaskComponent, {
      data: { type: Roles.ADMIN }
    });
    dialog.afterClosed().subscribe((resp: any) => {
      if (resp) {
        this._adminService.createNewTask(resp.value)
      }
    })
  }

}
