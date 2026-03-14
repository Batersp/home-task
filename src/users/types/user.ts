import {WithId} from "mongodb";

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
    items: WithId<User>[]
}
