import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../../../shared/models/task';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent implements OnInit {

  @Input() notFound!: boolean;
  @Input() notFoundMessage!: string;

  constructor() {}

  ngOnInit(): void {
  }

}
