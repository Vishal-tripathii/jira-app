import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrl: './user-search.component.scss'
})
export class UserSearchComponent implements OnInit {

  userInformation: any;

  constructor(private _adminService: AdminService, private _userService: UserService) { }
  ngOnInit(): void {
  }

  search(term: string): void {
    this._userService.searchExisitingUser(term)
      .subscribe((result: any) => {
        this.userInformation = result;
      });
  }

  onClick(item: any) {
    console.log(item);
  }
}
