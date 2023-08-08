import { Schema, Document, model } from 'mongoose';
import { Request, Response } from "express";
// import toNewUser from '../util/toNewUser';

export interface User extends Document {
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

const UserSchema = new Schema<User>({
    id: { type: Number, required: true },
    full_name: { type: String },
    username: { type: String },
    photo: { type: String },
    phone: { type: String },
    position: { type: String },
    description: { type: String },
    email: { type: String },
    start_date: { type: Date, required: true },
    state: { type: String },
    password: { type: String },
});

export const UserModel = model<User>('User', UserSchema);

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

const NewUserSchema = new Schema<NewUser>({
    full_name: { type: String },
    username: { type: String },
    photo: { type: String },
    phone: { type: String },
    position: { type: String },
    description: { type: String },
    email: { type: String },
    state: { type: String },
    password: { type: String },
});

export const NewUserModel = model<NewUser>('NewUser', NewUserSchema);

const getUsers = async (req: Request, res: Response) => {
    try {
        // Utilizar el modelo User para obtener todos los usuarios
        const users = await UserModel.find().exec();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(404).json({ error: (error as any).mensaje });
    };
}

const getUserById = async (req: Request<{ id: string }>, res: Response) => {
    try {
        // Utilizar el modelo User para buscar por id
        const user = await UserModel.findById(req.params.id).exec();
        return res.status(200).json(user);
    }
    catch (error) {
        return res.status(404).json({ error: (error as any).mensaje });
    }
}

const createUser = async (req: Request<{}, {}, NewUser>, res: Response) => {
    try {
        // Utilizar el modelo User para crear un nuevo usuario
        const user = await NewUserModel.create(req.body);
        return res.status(201).json(user);
    } catch (error) {
        return res.status(404).json({ error: (error as any).mensaje });
    };
}

const updateUser = async (req: Request<{ id: string }, User, NewUser>, res: Response) => {
    try {
        // Utilizar el modelo User para actualizar un usuario
        // const validateUser = toNewUser(req.body);
        const updateUser = await UserModel.findByIdAndUpdate(req.params.id,  { new: true }).exec();
        if (!updateUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.status(200).json(updateUser);
    } catch (error) {
        return res.status(404).json({ error: (error as any).mensaje });
    };
}

const deleteUser = async (req: Request<{ id: string }>, res: Response) => {
    try {
        // Utilizar el modelo User para eliminar un usuario
        const deleteUser = await UserModel.findByIdAndDelete(req.params.id).exec();
        if (!deleteUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.status(200).json(deleteUser);
    } catch (error) {
        return res.status(404).json({ error: (error as any).mensaje });
    };
}

export { getUsers, getUserById, createUser, updateUser, deleteUser};
