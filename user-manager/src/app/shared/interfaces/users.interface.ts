export interface IUsersEdit {
    name: string,
    email: string,
    password: string,
    updatedAt: string;
}
export interface IUsersRequest extends IUsersEdit {
    createdAt: string,
}
export interface IUsersResponce extends IUsersRequest {
    id: number,
}
export interface IUserName {
    name: string
}