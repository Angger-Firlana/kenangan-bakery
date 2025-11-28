export interface LoginResponse{
    success:boolean;
    message:string;
    token:string;
    user: User;
}

export interface User{
    id:number;
    username:string;
    email:string;
    role:Role;
    role_id:number;
    created_at:string;
    updated_at:string;
}

export interface Role{
    id:number;
    role_name:string;
    created_at:string;
    updated_at:string;
}