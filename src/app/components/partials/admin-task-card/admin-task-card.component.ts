import { Component, Input, OnInit } from '@angular/core';
import { JiraTask } from '../../../shared/models/task';

@Component({
  selector: 'app-admin-task-card',
  templateUrl: './admin-task-card.component.html',
  styleUrl: './admin-task-card.component.scss'
})
export class AdminTaskCardComponent implements OnInit {
  @Input() task!: JiraTask;
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

}
