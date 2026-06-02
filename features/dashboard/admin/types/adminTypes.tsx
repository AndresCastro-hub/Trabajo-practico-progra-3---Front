export interface IUser {
    id: number,
    name: string,
    email: string,
    rolName: string
}
export interface IUserResponse {
    users: Array<IUser>,
    totalUsers: number,
    totalPages: number
}