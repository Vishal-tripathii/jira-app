import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { COMPLETED, INCOMPLETE } from '../../../shared/constants/completed-status';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent implements OnInit {

  criteria = ['All', COMPLETED, INCOMPLETE];
  selectedCriteria!: string;

  constructor(private _router: Router) { }

  ngOnInit(): void { }

  goto(selectedItem: string) {
    this.selectedCriteria = selectedItem
    this._router.navigate([`tag/${selectedItem}`])
  }

}
