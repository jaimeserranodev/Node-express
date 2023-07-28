import { Room, NewRoom } from '../models/rooms';
import { BadRequest } from '../models/error';
import fs from 'fs';

const rooms: Room[] = JSON.parse(fs.readFileSync(__dirname + '/dataBase/RoomData.json').toString());

function saveJson() {
const jsonData = JSON.stringify(rooms, null, 2);
fs.writeFileSync(__dirname + '/dataBase/RoomData.json', jsonData);
}

const getAll = () => rooms;

const getOne = (id: number) => {
const room = rooms.find(room => room.id === id);
if (!room) {
    throw new BadRequest('No room found by provided ID', 404);
}
return room;
}

const create = (newRoomInfo: NewRoom) => {
const newRoom: Room = {
    id: rooms[rooms.length-1].id + 1,
    ...newRoomInfo
}
rooms.push(newRoom);
saveJson();
return newRoom;
}

const update = (newRoom: Room) => {
for (let [idx, room] of rooms.entries()) {
    if (room.id === newRoom.id) {
    rooms[idx] = newRoom;
    saveJson();
    return rooms[idx];
    }
}
throw new BadRequest('No room found by provided ID', 404);
}

const _delete = (id: number) => {
for (const [idx, room] of rooms.entries()) {
    if (room.id === id) {
    rooms.splice(idx, 1);
    saveJson();
    return `Room ${id} Deleted`;
    }
}
throw new BadRequest('No room found by provided ID', 404);
}

export default { getAll, getOne, create, update, delete: _delete }