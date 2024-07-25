import { Component, Input, OnInit } from '@angular/core';
import { Status } from '../../../shared/models/status';
import { Router } from '@angular/router';

@Component({
  selector: 'app-status-filter',
  templateUrl: './status-filter.component.html',
  styleUrl: './status-filter.component.scss'
})
export class StatusFilterComponent implements OnInit {

  statusValues = Object.values(Status);
  selectedStatus!: string;

  @Input() statusTerm: string = '';
  @Input() statusRoute: string = 'status';

  constructor(private _router: Router) { }

  ngOnInit(): void {

  }

  goto(item: string) {
    this.selectedStatus = item;
    this._router.navigate([`/${this.statusRoute}`, item])
  }

}
