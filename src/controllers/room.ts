import { Request, Response } from "express";
import rooms from "../data/room";
import { Room, NewRoom } from "../models/rooms";
import toNewRoom from '../util/toNewRoom';

const getRooms = (_: Request, res: Response) => {
    try {
    return res.send(rooms.getAll());
    } catch (err: any) {
    return res.sendStatus(500);
    }
}

const getRoomById = (req: Request<{ id: string }, Room>, res: Response) => {
    try {
    return res.send(rooms.getOne(Number(req.params.id)));
    } catch (err: any) {
    return res.status(err.status ?? 500).send(err.message);
    }
}

const createRoom = (req: Request<{}, Room, NewRoom>, res: Response) => {
    try {
    const newRoom = toNewRoom(req.body);
    return res.status(201).send(rooms.create(newRoom));
    } catch (err: any) {
    return res.status(err.status ?? 500).send(err.message);
    }
}

const updateRoom = (req: Request<{ id: string }, Room, NewRoom>, res: Response) => {
    try {
    const validateRoom = toNewRoom(req.body);
    return res.send(rooms.update({ id: Number(req.params.id), ...validateRoom }));
    } catch (err: any) {
    return res.status(err.status ?? 500).send(err.message);
    }
}

const deleteRoom = (req: Request<{ id: string }, string>, res: Response) => {
    try {
    return res.send(rooms.delete(Number(req.params.id)));
    } catch (err: any) {
    return res.status(err.status ?? 500).send(err.message);
    }
}

export { getRooms, getRoomById, createRoom, updateRoom, deleteRoom }