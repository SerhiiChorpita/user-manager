export interface IUsersEdit {
    name: string,
    email: string,
    password: string,
    updatedAt: number;
}
export interface IUsersRequest extends IUsersEdit {
    createdAt: number,
}
export interface IUsersResponce extends IUsersRequest {
    id: number,
}