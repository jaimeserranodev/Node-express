// import { NewUser, User } from '../models/User';
// import { BadRequest } from '../models/error';
// import { USERS } from './seed';
// import fs from 'fs';


// function saveJson() {
// const jsonData = JSON.stringify(USERS, null, 2);
// fs.writeFileSync(__dirname + '/dataBase/UserData.json', jsonData);
// }

// const getAll = () => USERS;

// const getOne = (id: number) => {
// const user = USERS.find(user => user.id === id);
// if (!user) {
//     throw new BadRequest('No user found by provided ID', 404);
// }
// return user;
// }

// const create = (newUserInfo: NewUser) => {
// const newUser: User = {
//     id: USERS[USERS.length-1].id + 1,
//     ...newUserInfo,
//     start_date: new Date(),
// }
// USERS.push(newUser);
// saveJson();
// return newUser;
// }

// const update = (updatedUser: Partial<User>) => {
// for (let [idx, user] of USERS.entries()) {
//     if (user.id === updatedUser.id) {
//         USERS[idx] = {
//         ...user,
//         ...updatedUser,
//     }
//     saveJson();
//     return USERS[idx];
//     }
// }
// throw new BadRequest('No user found by provided ID', 404);
// }

// const _delete = (id: number) => {
// for (const [idx, user] of USERS.entries()) {
//     if (user.id === id) {
//         USERS.splice(idx, 1);
//     saveJson();
//     return `User ${id} Deleted`;
//     }
// }
// throw new BadRequest('No user found by provided ID', 404);
// }

// export default { getAll, getOne, create, update, delete: _delete }