
export interface IUsersEdit {
    userName: string,
    phoneNumber: number,
    email: string,
    rights: Array<string>,
    updatedAt: string;
}
export interface IUsersRequest extends IUsersEdit {
    createdAt: string,
}
export interface IUsersResponce extends IUsersRequest {
    password: string,
    _id: number
}
export interface IUserName {
    name: string
}

export interface IUsersDetails {
    _id: number,
    userName: string,
    phoneNumber: number,
    rights: Array<string>,
    email: string,
    createdAt: string,
    updatedAt: string
}

export interface IRights {
    rights: Array<string>
}

