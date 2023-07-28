export interface User {
    id: number;
    full_name: string | undefined;
    username: string | undefined;
    photo: string | undefined;
    phone?: string | undefined;
    position: string | undefined;
    description: string | undefined;
    email: string | undefined;
    start_date: Date;
    state: string | undefined;
    password: string | undefined;
}

export interface NewUser {
    full_name: string | undefined;
    username: string | undefined;
    photo: string | undefined;
    phone?: string | undefined;
    position: string | undefined;
    description: string | undefined;
    email: string | undefined;
    state: string | undefined;
    password: string | undefined;
}