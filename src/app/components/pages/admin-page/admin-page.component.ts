import { Component, OnInit } from '@angular/core';
import { JiraTask } from '../../../shared/models/task';
import { AdminService } from '../../../services/admin.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss'
})
export class AdminPageComponent implements OnInit {

  task: JiraTask[] = [];

  constructor(private _adminService: AdminService) {
    let taskObservable: Observable<JiraTask[]>
    taskObservable = this._adminService.getAllTasks()

    taskObservable.subscribe((serverResponse: any) => {
      this.task = serverResponse;
      console.log(this.task, "these are admin-data");
    })
  }

  ngOnInit(): void {

  }

}
