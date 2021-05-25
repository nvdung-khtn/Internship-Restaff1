import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService } from '../shared/service/user.service';
import {
    PagedList,
    RefreshTokenRequest,
    SearchRequest,
} from './models/common.model';
import {
    ForgotPasswordRequest,
    UrlImage,
    User,
    UserInformationResponse,
    UserUpdateInformation,
} from './models/user.model';
import {
    UpdatePasswordRequest,
    LoginRequest,
    JwtAuthResult,
    CreateUserRequest,
} from './models/_index';

@Injectable()
export class UserClient {
    private apiEndpoint = `${environment.apiUrl}/Users`;
    private apiToken = `${environment.apiUrl}/Token`;
    private apiResetPasswod = `${environment.apiUrl}/Users/reset-password`;
    private apiForgotPassword = `${environment.apiUrl}/Users/forgot-password`;
    private apiGetMyInformation = `${environment.apiUrl}/Users/me`;
    private apiUpdateAvata = `${environment.apiUrl}/Users/me/avatar`;
    private apiUpdateMyinformation = `${environment.apiUrl}/Users/me`;
    apiRefreshToken: string = `${environment.apiUrl}/Token/refresh`;
    constructor(protected httpClient: HttpClient) {}

    searchUsers(
        rq: SearchRequest = new SearchRequest()
    ): Observable<PagedList<User>> {
        const options = {
            params: { ...rq },
        };

        return this.httpClient.get<PagedList<User>>(this.apiEndpoint, options);
    }

    createUser(user: CreateUserRequest): Observable<string> {
        return this.httpClient.post<string>(this.apiEndpoint, user);
    }

    updatePassword(rq: UpdatePasswordRequest): Observable<boolean> {
        return this.httpClient.put<boolean>(this.apiEndpoint, rq);
    }

    resetPassword(): Observable<any> {
        return this.httpClient.post<boolean>(this.apiResetPasswod, '');
    }

    login(rq: LoginRequest = new LoginRequest()): Observable<JwtAuthResult> {
        return this.httpClient.post<JwtAuthResult>(this.apiToken, rq);
    }

    lockoutUser(Id: string) {
        return this.httpClient.put(
            `${environment.apiUrl}/Users/${Id}/Lockout`,
            Id
        );
    }

    unlockoutUser(Id: string) {
        return this.httpClient.put(
            `${environment.apiUrl}/Users/${Id}/Unlockout`,
            Id
        );
    }

    forgotPassword(rq: ForgotPasswordRequest): Observable<string> {
        return this.httpClient.post<string>(this.apiForgotPassword, rq);
    }

    getMyInformation(): Observable<UserInformationResponse> {
        return this.httpClient.get<UserInformationResponse>(
            this.apiGetMyInformation
        );
    }

    updateAvata(urlImage: UrlImage): Observable<any> {
        return this.httpClient.put(`${this.apiUpdateAvata}`, urlImage);
    }

    updateMyInformation(
        userUpdateInformation: UserUpdateInformation
    ): Observable<any> {
        return this.httpClient.put(
            `${this.apiUpdateMyinformation}`,
            userUpdateInformation
        );
    }

    refreshToken(refreshToken: RefreshTokenRequest): Observable<JwtAuthResult> {
        return this.httpClient.post<JwtAuthResult>(
            this.apiRefreshToken,
            refreshToken
        );
    }
}
