import { UserService } from 'src/app/shared/service/user.service';
import { Router } from '@angular/router';
import {
    LoginRequest,
    JwtAuthResult,
    TokenInfo,
} from './../../../api-clients/models/common.model';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserClient } from 'src/app/api-clients/_index';
import Swal from 'sweetalert2';
import {
    ForgotPasswordRequest,
    UserRole,
} from 'src/app/api-clients/models/user.model';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    public loginForm: FormGroup;
    public forgotPasswordForm: FormGroup;
    submitted = false;
    public isStartForgotPassword = false;
    tokenInfo: TokenInfo;

    constructor(
        private formBuilder: FormBuilder,
        private userClient: UserClient,
        private route: Router,
        private userService: UserService,
        private toastr: ToastrService
    ) {
        this.createLoginForm();
        this.createForgotPasswordForm();
    }

    owlcarousel = [
        {
            title: 'Welcome to FourMen Store',
            desc: 'Established in 1999, Fourmen shop is proud to be the largest fashion brand in Vietnam.',
        },
        {
            title: 'Welcome to FourMen Store',
            desc: 'Established in 1999, Fourmen shop is proud to be the largest fashion brand in Vietnam.',
        },
        {
            title: 'Welcome to FourMen Store',
            desc: 'Established in 1999, Fourmen shop is proud to be the largest fashion brand in Vietnam.',
        },
    ];
    owlcarouselOptions = {
        loop: true,
        items: 1,
        dots: true,
    };

    createLoginForm() {
        this.loginForm = this.formBuilder.group({
            username: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
        });
    }

    createForgotPasswordForm() {
        this.forgotPasswordForm = this.formBuilder.group({
            username: ['', [Validators.required, Validators.email]],
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
        });
    }

    ngOnInit() {
        this.createLoginForm();
    }
    get f() {
        return this.loginForm.controls;
    }
    get forgotPasswordValidators() {
        return this.forgotPasswordForm.controls;
    }
    onSubmit() {
        this.submitted = true;
        if (this.loginForm.invalid) {
            return;
        }
        this.userClient
            .login(this.loginForm.value)
            .toPromise()
            .then(
                (res) => {
                    this.tokenInfo = this.userService.getDecodedAccessToken(
                        res.accessToken
                    );
                    this.userService.setLocalStorage(res, this.tokenInfo);
                    localStorage.setItem(
                        'login-event',
                        'login' + Math.random()
                    );
                    this.userService.startTokenTimer();
                    this.route.navigate(['dashboard/default']);
                }
            );
    }

    submitForgotPassword() {
        this.isStartForgotPassword = true;
        if (!this.forgotPasswordForm.invalid) {
            let rq: ForgotPasswordRequest = new ForgotPasswordRequest(
                this.forgotPasswordForm.value.firstName,
                this.forgotPasswordForm.value.lastName,
                this.forgotPasswordForm.value.username
            );
            this.createForgotPasswordForm();
            this.isStartForgotPassword = false;
            this.userClient.forgotPassword(rq).subscribe((res) => {
                this.toastr.success(
                    'Request change password Success!',
                    'Notification'
                );
                this.createForgotPasswordForm();
            });
        }
    }
}
