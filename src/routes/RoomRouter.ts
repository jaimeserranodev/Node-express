import { Router } from 'express';
import { getRooms, getRoomById, createRoom, deleteRoom, updateRoom } from '../controllers/room';
const RoomRouter = Router();

RoomRouter.get('/', getRooms);

RoomRouter.get('/:id', getRoomById);

RoomRouter.post('/', createRoom);

RoomRouter.put('/:id', updateRoom);

RoomRouter.delete('/:id', deleteRoom);

export default RoomRouter;
