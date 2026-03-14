import {UserViewModel} from "./user-view-model";

export type User = {
    login: string;
    email: string;
    createdAt: string;
    passHash: string;
}

export type UsersResponse = {
    pagesCount: number,
    page: number,
    pageSize: number,
    totalCount: number,
    items: UserViewModel[]
}
