import { UserClient } from 'src/app/api-clients/user.client';
import { UserRole } from './../../api-clients/models/user.model';
import { Injectable, OnDestroy } from '@angular/core';
import jwt_decode from 'jwt-decode';
import {
    JwtAuthResult,
    RefreshToken,
    RefreshTokenRequest,
    TokenInfo,
} from 'src/app/api-clients/models/common.model';
import { of, Subscription } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {


    private urlAvatarSource: BehaviorSubject<string> = new BehaviorSubject('');
    private timer: Subscription;

    constructor(private userClient: UserClient) {


    }

    loggedIn() {
        return !!localStorage.getItem('access_token');
    }

    getUrlAvatarObs(): Observable<string> {
        return this.urlAvatarSource.asObservable();
    }

    getUrlAvatar(): string {
        return localStorage.getItem('url_avatar');
    }

    updatedUrlAvatar(url: string) {
        this.setUrlAvatar(url);
        this.urlAvatarSource.next(url);
    }

    getDecodedAccessToken(token: string): any {
        try {
            return jwt_decode(token);
        } catch (Error) {
            return null;
        }
    }

    getToken(): string {
        this.urlAvatarSource.next(localStorage.getItem('url_avatar'));
        return localStorage.getItem('access_token');
    }

    getRole(): string {
        return UserRole[this.getTokenInfo().role];
    }

    getUserId(): string {
        return this.getTokenInfo().id;
    }

    localStorageSetToken(responseToken: JwtAuthResult, tokenInfo: TokenInfo) {
        //accessToken
        localStorage.setItem('access_token', responseToken.accessToken);
        //refreshToken
        localStorage.setItem(
            'refresh_token',
            JSON.stringify(responseToken.refreshToken)
        );
        //tokenInfo
        localStorage.setItem('token_info', JSON.stringify(tokenInfo));
    }

    public startTokenTimer() {
        const timeout = this.getTokenRemainingTime();
        this.timer = of(true)
            .pipe(
                delay(timeout),
                tap(() => this.refreshToken())
            )
            .subscribe();
    }

    refreshToken(): any {
        const refreshToken: RefreshToken = JSON.parse(
            localStorage.getItem('refresh_token')
        );
        if (!refreshToken) {
            this.clearLocalStorage();
            return of(null);
        }
        let rq: RefreshTokenRequest;
        rq = { refreshToken: refreshToken.value };
        // return this.userClient.refreshToken(rq).subscribe((res) => {
        //     this.setLocalStorage(res);
        //     this.startTokenTimer();
        //     console.log('token is refreshed', res);
        //     return res;
        // });
        return this.userClient.refreshToken(rq).subscribe((res) => {
            let token_info = this.getDecodedAccessToken(res.accessToken);
            this.setLocalStorage(res, token_info);
            this.startTokenTimer();
            return res;
        });
    }

    getTokenRemainingTime() {
        const accessToken = localStorage.getItem('access_token');
        console.log("test", jwt_decode(accessToken))

        if (!accessToken) {
            return 0;
        }
        const jwtToken: TokenInfo = jwt_decode(accessToken);
        this.setUrlAvatar(jwtToken.avatar);
        this.updatedUrlAvatar(jwtToken.avatar);
        const expires = new Date(jwtToken.exp * 1000);
        console.log(expires.getTime() - Date.now());
        return expires.getTime() - Date.now();
    }

    clearLocalStorage() {
        // localStorage.removeItem('access_token');
        // localStorage.removeItem('refresh_token');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('token_info');
        localStorage.setItem('logout-event', 'logout' + Math.random());
    }

    private setUrlAvatar(url: string) {
        localStorage.setItem('url_avatar', url);
    }

    setLocalStorage(x: JwtAuthResult, tokenInfo?: TokenInfo) {
        localStorage.setItem('access_token', x.accessToken);
        localStorage.setItem('refresh_token', JSON.stringify(x.refreshToken));
        localStorage.setItem('token_info', JSON.stringify(tokenInfo));
    }

    stopTokenTimer() {
        this.timer?.unsubscribe();
    }

    getTokenInfo(): TokenInfo {
        return JSON.parse(localStorage.getItem('token_info'));
    }

    getUsername(): string {
        return this.getTokenInfo().username;
    }
}
