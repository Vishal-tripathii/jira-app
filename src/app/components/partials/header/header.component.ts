import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../shared/models/user';
import { TaskService } from '../../../services/task.service';
import { Task } from '../../../shared/models/task';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  user!: User | null;
  tasks: Task[] = [];

  constructor(private _userService: UserService, private _taskService: TaskService) {
    this._userService.userObservable.subscribe((resp: any) => {
      this.user = resp;
      console.log(this.user, "i am user");
      
    })
    _taskService.myTasks.subscribe((resp: any) => {
      this.tasks = resp;
    })
  }

  ngOnInit(): void {
    this.user = this._userService.getCurrentUser();
  }
  onLogout() {
    this._userService.logout();
  }

}
