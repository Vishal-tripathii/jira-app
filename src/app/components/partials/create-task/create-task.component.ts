import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Priority } from '../../../shared/models/priority';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { INCOMPLETE } from '../../../shared/constants/completed-status';
import { UserService } from '../../../services/user.service';
import { Status } from '../../../shared/models/status';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss'
})
export class CreateTaskComponent implements OnInit {

  createForm!: FormGroup;
  priorityValues = Object.values(Priority); // fetching the values of priority
  constructor(private _fb: FormBuilder, public dialogRef: MatDialogRef<CreateTaskComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private _userService: UserService) { }

  ngOnInit(): void {
    let currentUser = this._userService.getCurrentUser();
    this.createForm = this._fb.group({
      id: [currentUser?._id],
      name: [{ value: currentUser?.name, disabled: true }, Validators.required],
      taskName: ['', [Validators.required]],
      description: ['', [Validators.required]],
      priority: [this.priorityValues],
      status: [Status.ASSIGNED],
      dateCreated: [new Date()],
      modifiedDate: [null]
    });
  }

  submit() {
    if (this.createForm.dirty && this.createForm.valid) {
      this.dialogRef.close(this.createForm)
    }
  }

  cancel() {
    this.dialogRef.close();
  }

}
