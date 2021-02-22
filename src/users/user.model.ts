export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    status: UserStatus;
}

export enum UserStatus {
    ACTIVED = 'ACTIVED',
    BLOCKED = 'BLOCKED',
    DELETED = 'DELETED',
}