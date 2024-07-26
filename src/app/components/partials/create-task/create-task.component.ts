import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Priority } from '../../../shared/models/priority';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { INCOMPLETE } from '../../../shared/constants/completed-status';
import { UserService } from '../../../services/user.service';
import { Status } from '../../../shared/models/status';
import { Roles } from '../../../shared/constants/roles';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss'
})
export class CreateTaskComponent implements OnInit {

  createForm!: FormGroup;
  priorityValues = Object.values(Priority); // fetching the values of priority
  currentUser!: any;
  formType!: Roles;
  existingUsers!: any;

  constructor(private _fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _userService: UserService,
    private _adminService: AdminService) {
    this.formType = this.data.type;
    this._userService.getExistingUsers().subscribe((serverResponse: any) => {
      this.existingUsers = serverResponse
    })
  }

  ngOnInit(): void {
    if (!this.adminTemplate()) {
      this.currentUser = this._userService.getCurrentUser();
      this.createForm = this._fb.group({
        email: [this.currentUser?.email],
        id: [this.currentUser?._id],
        name: [this.currentUser?.name],
        taskName: ['', [Validators.required]],
        description: ['', [Validators.required]],
        priority: [this.priorityValues],
        status: [Status.ASSIGNED],
        dateCreated: [new Date()],
        modifiedDate: [null]
      });
    }
    else {
      this.createForm = this._fb.group({
        email: [''],
        id: [''],
        name: [this.existingUsers],
        taskName: ['', [Validators.required]],
        description: ['', [Validators.required]],
        priority: [this.priorityValues],
        status: [Status.ASSIGNED],
        dateCreated: [new Date()],
        modifiedDate: [null]
      });
    }

  }

  submit() {
    if (this.createForm.dirty && this.createForm.valid) {
      this.existingUsers.forEach((item: any) => { // need to refactor this idea, this is very brute force i think
        if (item.name === this.createForm.value.name) {
          this.createForm.controls['id'].setValue(item._id);
          this.createForm.controls['email'].setValue(item.email)
        }
      })
      this.dialogRef.close(this.createForm)
    }
  }

  adminTemplate(): boolean {
    return this.formType === Roles.ADMIN
  }

  cancel() {
    this.dialogRef.close();
  }

}
