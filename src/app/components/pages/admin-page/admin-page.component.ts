import { Component, OnInit } from '@angular/core';
import { JiraTask } from '../../../shared/models/task';
import { AdminService } from '../../../services/admin.service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskComponent } from '../../partials/create-task/create-task.component';
import { Roles } from '../../../shared/constants/roles';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss'
})
export class AdminPageComponent implements OnInit {

  task: JiraTask[] = [];
  searchTerm: string = '';
  statusTerm: string = ''

  constructor(private _adminService: AdminService,
    public dialogRef: MatDialog,
    private _activatedRoute: ActivatedRoute) {
    let taskObservable: Observable<JiraTask[]>
    this._activatedRoute.params.subscribe((params: any) => {
      if (params.searchTerm) {
        this.searchTerm = params.searchTerm;
        taskObservable = this._adminService.getTasksBySearchTerm(params.searchTerm);
      }
      else if (params.statusTerm) {
        this.statusTerm = params.statusTerm
        taskObservable = this._adminService.getTasksByStatus(params.statusTerm)
      }
      else {
        taskObservable = this._adminService.getAllTasks()
      }
      taskObservable.subscribe((serverResponse: any) => {
        this.task = serverResponse;
      })
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
