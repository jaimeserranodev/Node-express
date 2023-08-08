import { Schema, Document, model } from 'mongoose';
import { Request, Response } from "express";
// import toNewRoom from '../util/toNewRoom';



export interface Room extends Document {
    id: number;
    name: string | undefined;
    bed_type: string | undefined;
    photo: string | undefined;
    description?: string | undefined;
    amenities: string[];
    rate: number;
    offer: number;
    status: string | undefined;
}

const RoomSchema = new Schema<Room>({
    id: { type: Number },
    name: { type: String },
    bed_type: { type: String },
    photo: { type: String },
    description: { type: String },
    amenities: [{ type: String }],
    rate: { type: Number, required: true, default: 0 },
    offer: { type: Number, required: true },
    status: { type: String, required: true, default: 'default status' },
});

export const RoomModel = model<Room>('Room', RoomSchema);

export interface NewRoom {
    name: string | undefined;
    bed_type: string | undefined;
    photo: string | undefined;
    description?: string | undefined;
    amenities: string[];
    rate: number;
    offer: number;
    status: string;
}

const NewRoomSchema = new Schema<NewRoom>({
    name: { type: String },
    bed_type: { type: String },
    photo: { type: String },
    description: { type: String },
    amenities: [{ type: String }],
    rate: { type: Number, required: true },
    offer: { type: Number, required: true },
    status: { type: String, required: true },
});

export const NewRoomModel = model<NewRoom>('NewRoom', NewRoomSchema);

const getRooms = async (req: Request, res: Response) => {
    try {
        // Utilizar el modelo Room para obtener todas las habitaciones
        const rooms = await RoomModel.find().exec();
        return res.status(200).json(rooms);
    } catch (error) {
        return res.status(404).json({ error: (error as any).mensaje });
    };
}

const getRoomById = async (req: Request<{ id: string }>, res: Response) => {
    try {
        // Utilizar el modelo Room para buscar por id
        const room = await RoomModel.findById(req.params.id).exec();
        return res.status(200).json(room);
    } catch (error) {
        return res.status(404).json({ error: (error as any).mensaje });
    };
}

const createRoom = async (req: Request<{}, {}, NewRoom>, res: Response) => {
    try {
        // Utilizar el modelo Room para crear una nueva habitación
        const room = await NewRoomModel.create(req.body);
        return res.status(201).json(room);
    } catch (error) {
        return res.status(404).json({ error: (error as any).mensaje });
    };
}

const updateRoom = async (req: Request<{ id: string }, Room, NewRoom>, res: Response) => {
    try {
        // Utilizar el modelo Room para actualizar una habitación
        // const validateRoom = toNewRoom(req.body);
        const updateRoom = await RoomModel.findByIdAndUpdate(req.params.id, { new: true }).exec();
        if (!updateRoom) {
            return res.status(404).json({ error: 'Room not found' });
        }
        return res.status(200).json(updateRoom);
    } catch (error) {
        return res.status(404).json({ error: (error as any).mensaje });
    };
}

const deleteRoom = async (req: Request<{ id: string }>, res: Response) => {
    try {
        // Utilizar el modelo Room para eliminar una habitación
        const room = await RoomModel.findByIdAndDelete(req.params.id).exec();
        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }
        return res.status(200).json(room);
    } catch (error) {
        return res.status(404).json({ error: (error as any).mensaje });
    };
}

export { getRooms, getRoomById, createRoom, updateRoom, deleteRoom }