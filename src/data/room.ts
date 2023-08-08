// import { Room, NewRoom } from '../models/rooms';
// import { BadRequest } from '../models/error';
// import { ROOMS, NEW_ROOMS } from './seed';
// import fs from 'fs';


// function saveJson() {
// const jsonData = JSON.stringify(ROOMS, null, 2);
// fs.writeFileSync(__dirname + '/dataBase/RoomData.json', JSON.stringify(ROOMS));
// }

// const getAll = () => ROOMS;

// const getOne = (id: number) => {
// const room = ROOMS.find(room => room.id === id);
// if (!room) {
//     throw new BadRequest('No room found by provided ID', 404);
// }
// return room;
// }

// const create = (newRoomInfo: NewRoom) => {
// const newRoom: Room = {
//     id: ROOMS[ROOMS.length-1].id + 1,
//     ...newRoomInfo
// }
// ROOMS.push(newRoom);
// saveJson();
// return newRoom;
// }

// const update = (newRoom: Room) => {
// for (let [idx, room] of ROOMS.entries()) {
//     if (room.id === newRoom.id) {
//         ROOMS[idx] = newRoom;
//     saveJson();
//     return ROOMS[idx];
//     }
// }
// throw new BadRequest('No room found by provided ID', 404);
// }

// const _delete = (id: number) => {
// for (const [idx, room] of ROOMS.entries()) {
//     if (room.id === id) {
//         ROOMS.splice(idx, 1);
//     saveJson();
//     return `Room ${id} Deleted`;
//     }
// }
// throw new BadRequest('No room found by provided ID', 404);
// }

// export default { getAll, getOne, create, update, delete: _delete }