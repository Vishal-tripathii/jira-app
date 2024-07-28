import { Component, EventEmitter, Input, input, OnInit, Output } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrl: './user-search.component.scss'
})
export class UserSearchComponent implements OnInit {

  userInformation: any;
  @Input() searchResult!: any;
  @Output() userSearch = new EventEmitter<any>();

  constructor(private _adminService: AdminService, private _userService: UserService) { }
  ngOnInit(): void {
  }

  search(term: string): void {
    this.userSearch.emit(term);
  }

  onClick(item: any) {
    console.log(item);
  }
}
