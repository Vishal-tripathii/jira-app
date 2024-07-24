import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../../../shared/models/task';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss'
})
export class TaskCardComponent implements OnInit {

  @Input() task!: Task;
  dateCreated!: Date;
  dateModified!: Date | null;

  constructor() { }

  ngOnInit(): void {
    this.dateCreated = new Date(this.task.dateCreated)
    this.dateModified = this.task.dateModified ? new Date(this.task.dateModified) : null
  }

  getDate(): string {
    if (this.dateModified) {
      const date = this.dateModified?.getDate();
      const month = this.dateModified?.getMonth();
      const year = this.dateModified?.getFullYear();
      return `${date}-${month + 1}-${year}`
    }
    const date = this.dateCreated.getDate();
    const month = this.dateCreated.getMonth();
    const year = this.dateCreated.getFullYear();
    return `${date}-${month + 1}-${year}`
  }

  isCompleted() {
    return this.task.isCompleted;
  }

}
