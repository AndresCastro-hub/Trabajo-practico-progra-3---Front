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

export interface IIngredient {
    id: number;
    nombre: string;
    unidad: string;
}

export interface IIngredientService {
    nombre: string;
    unidad: string;
}

export interface IIngredientResponse {
    ingredients: IIngredient[];
    totalRecords: number;
    totalPages: number;
}