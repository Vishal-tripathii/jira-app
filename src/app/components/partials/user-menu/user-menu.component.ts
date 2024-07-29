import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../../services/admin.service';
import { Observable } from 'rxjs';
import { UserService } from '../../../services/user.service';
@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.scss'
})
export class UserMenuComponent implements OnInit {

  userId!: string;
  userProfile!: any
  userData!: any;

  constructor(private _activatedRoute: ActivatedRoute,
    private _userService: UserService,
    private _adminService: AdminService,
    private _router: Router) {

    this._activatedRoute.params.subscribe((resp: any) => {
      this.userId = resp.currentuserId;
    });
    this._userService.getExistingUsers().subscribe((r: any) => {
      this.userProfile = r.find((item: any) => item._id === this.userId)
    });

    this._adminService.getUserTasks(this.userId!).subscribe((resp: any) => {
      this.userData = resp;
    })
  }

  ngOnInit(): void {
  }

  goto(_id: string) {
    if (_id) {
      this._router.navigate([`task/${_id}`, this.userProfile.role])
    }
  }

}
