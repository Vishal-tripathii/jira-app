import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.scss'
})
export class UserMenuComponent implements OnInit {

  @Input() userDetails!: any;

  constructor() { }

  ngOnInit(): void {
  }

}
