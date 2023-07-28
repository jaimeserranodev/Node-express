import { Request, Response } from 'express';
import users from '../data/users';
import { User, NewUser } from '../models/User';
import toNewUser from '../util/toNewUser';

const getUsers = (_: Request, res: Response) => {
    try {
        return res.send(users.getAll());
    } catch (err: any) {
        return res.sendStatus(500);
    }
}

const getUserById = (req: Request<{ id: string }, User>, res: Response) => {
    try {
        return res.send(users.getOne(Number(req.params.id)));
    } catch (err: any) {
        return res.status(err.status ?? 500).send(err.message);
    }
}

const createUser = (req: Request<{}, User, NewUser>, res: Response) => {
    try {
        const newUser = toNewUser(req.body);
        return res.status(201).send(users.create(newUser));
    } catch (err: any) {
        return res.status(err.status ?? 500).send(err.message);
    }
}

const updateUser = (req: Request<{ id: string }, User, NewUser>, res: Response) => {
    try {
        const validateUser = toNewUser(req.body);
        return res.send(users.update({ id: Number(req.params.id), ...validateUser }));
    } catch (err: any) {
        return res.status(err.status ?? 500).send(err.message);
    }
}

const deleteUser = (req: Request<{ id: string }, string>, res: Response) => {
    try {
        return res.send(users.delete(Number(req.params.id)));
    } catch (err: any) {
        return res.status(err.status ?? 500).send(err.message);
    }
}

export { getUsers, getUserById, createUser, updateUser, deleteUser }