import { Request, Response } from 'express';

import { User, NewUser } from '../models/User';
import {UserModel, NewUserModel } from '../services/user';

const getUsers = async (_: Request, res: Response) => {
    try {
        const users = await UserModel.find().exec();
        return res.status(200).json(users);
    } catch (err: any) {
        return res.status(err.status ?? 500).send(err.message);
    }
}


const getUserById = async (req: Request<{ id: string }, User>, res: Response) => {
    try {
        const user = await UserModel.findById(req.params.id).exec();
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.status(200).json(user);
    } catch (err: any) {
        return res.status(err.status ?? 500).send(err.message);
    }
}


const createUser = async (req: Request<{}, User, NewUser>, res: Response) => {
    try {
        const newUser = new NewUserModel(req.body);
        const savedUser = await newUser.save();
        return res.status(201).json(savedUser);
    } catch (err: any) {
        return res.status(err.status ?? 500).send(err.message);
    }
}


const updateUser = async (req: Request<{ id: string }, User, NewUser>, res: Response) => {
    try {
        const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec();
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.status(200).json(updatedUser);
    } catch (err: any) {

        return res.status(err.status ?? 500).send(err.message);
    }
}


const deleteUser = async (req: Request<{ id: string }, string>, res: Response) => {
    try {
        const deletedUser = await UserModel.findByIdAndDelete(req.params.id).exec();
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.status(200).json(deletedUser);
    } catch (err: any) {
        return res.status(err.status ?? 500).send(err.message);
    }
}

export { getUsers, getUserById, createUser, updateUser, deleteUser }