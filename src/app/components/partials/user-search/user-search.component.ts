import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrl: './user-search.component.scss'
})
export class UserSearchComponent implements OnInit {

  userInformation: any;
  @Input() searchResult!: any;
  @Output() userSearch = new EventEmitter<any>();

  constructor(private _router: Router) { }

  ngOnInit(): void { }

  search(term: string): void {
    this.userSearch.emit(term);
  }

  onClick(currentuserId: any) {
    this._router.navigate(['user-menu', currentuserId]);
  }
}
