import { Request, Response } from "express";

import { Room, NewRoom } from "../models/rooms";
import { RoomModel, NewRoomModel } from "../services/room"

const getRooms = async (_: Request, res: Response) => {
    try {
    const rooms = await RoomModel.find().exec();
    return res.status(200).json(rooms);
    } catch (err: any) {
    return res.status(err.status ?? 500).send(err.message);
    }
}

const getRoomById = async (req: Request<{ id: string }, Room>, res: Response) => {
    try {
        const room = await RoomModel.findById(req.params.id).exec();
        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }
        return res.status(200).json(room);
    } catch (err: any) {
        return res.status(err.status ?? 500).send(err.message);
    }
}


const createRoom = async (req: Request<{}, Room, NewRoom>, res: Response) => {
    try {
    const newRoom = new NewRoomModel(req.body);
    const savedRoom = await newRoom.save();
    return res.status(201).json(savedRoom);
    } catch (err: any) {
    return res.status(err.status ?? 500).send(err.message);
    }
}


const updateRoom = async (req: Request<{ id: string }, Room, NewRoom>, res: Response) => {
    try {
        const updateBooking = await RoomModel.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec();
        if (!updateBooking) {
            return res.status(404).json({ error: 'Room not found' });
        }
        return res.status(200).json(updateBooking);
    } catch (err: any) {
        return res.status(err.status ?? 500).send(err.message);
    }
}


const deleteRoom = async (req: Request<{ id: string }, string>, res: Response) => {
    try {
        const deletedRoom = await RoomModel.findByIdAndDelete(req.params.id).exec();
        if (!deletedRoom) {
            return res.status(404).json({ error: 'Room not found' });
        }
        return res.status(200).json(deletedRoom);
    } catch (err: any) {
        return res.status(err.status ?? 500).send(err.message);
    }
}


export { getRooms, getRoomById, createRoom, updateRoom, deleteRoom }