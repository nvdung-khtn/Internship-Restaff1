import { stringify } from '@angular/compiler/src/util';
import { Inventory } from './inventory.model';

export class PagedList<T> {
    totalRows: number;
    totalPages: number;
    items: T[];
}

export class SearchRequestInventory extends Inventory {}

export class SearchRequest {
    searchTerm?: string;
    sort?: string;
    pageNumber?: string;
    pageSize?: string;
    isLockout?: string;
}

export class SearchRequestProduct {
    searchTerm?: string;
    sort?: string;
    pageNumber?: string;
    pageSize?: string;
    ownerName?: string;
    categoryName?: string;
}

export class NameValue {
    value = 0;
    name: string;
}

export class LoginRequest {
    userName: string;
    password: string;
    constructor(userName?: string, password?: string) {
        this.userName = userName;
        this.password = password;
    }
}

export class JwtAuthResult {
    accessToken: string;
    refreshToken: RefreshToken;
}

export class RefreshToken {
    userName: string;
    value: string;
    expireAt: Date;
}

export class TokenInfo {
    id: string;
    username: string;
    role: string;
    avatar: string;
    exp: number;
    iss: string;
    aud: string;
}

export class RefreshTokenRequest {
    // accessToken: string;
    refreshToken: string;
}
