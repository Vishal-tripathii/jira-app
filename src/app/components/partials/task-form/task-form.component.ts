import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Priority } from '../../../shared/models/priority';
import { INCOMPLETE } from '../../../shared/constants/completed-status';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent implements OnInit {

  currentTask!: any;
  editForm!: FormGroup;
  priorityValues = Object.values(Priority); // fetching the values of priority

  constructor(public dialogRef: MatDialogRef<TaskFormComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private _fb: FormBuilder) {
    this.currentTask = data.task;
  }

  ngOnInit(): void {
    // in this form i need to pre-fill the data, so i need to catch the data and fill it beforehand
    this.editForm = this._fb.group({
      name: [this.currentTask.taskName, [Validators.required]],
      description: [this.currentTask.description, [Validators.required]],
      priority: [this.currentTask.priority, [Validators.required]],
      id: [this.currentTask.id],
      dateCreated: [this.currentTask.dateCreated],
      dateModified: [null],
      isCompleted: [this.currentTask.isCompleted],

    });
  }

  submit() {
    if (this.editForm.valid && this.editForm.dirty) {
      this.editForm.value.dateModified = new Date(); // set the modified date to currentDate
      this.editForm.value.isCompleted = INCOMPLETE // set the complete status to incomplete as soon as user edits the form
      this.dialogRef.close(this.editForm)
    }
  }
  cancel() {
    this.dialogRef.close()
  }

}
