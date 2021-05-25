import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CreateUserRequest } from 'src/app/api-clients/models/user.model';
import { UserClient } from 'src/app/api-clients/user.client';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  public formUser: FormGroup;
  public permissionForm: FormGroup;
  public user: CreateUserRequest;
  public isStart: boolean = false;
  constructor(private formBuilder: FormBuilder, private userClient: UserClient, private toastr: ToastrService) {
    this.createAccountForm();
  }

  createAccountForm() {
    this.formUser = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      username: ['', [Validators.required, Validators.email]]
    })
  }

  get formValidators() {
    return this.formUser.controls;
  }


  async saveUser() {
    this.isStart = true;
    if (!this.formUser.invalid) {
      this.user = new CreateUserRequest(this.formUser.value.firstName, this.formUser.value.lastName, this.formUser.value.username);
      this.userClient.createUser(this.user).subscribe((res) => {
        this.toastr.success('Create User Success!', 'Notification');
      });
      this.createAccountForm();
      this.isStart = false;
    }

  }

  ngOnInit() {
    this.isStart = false;
  }

}
