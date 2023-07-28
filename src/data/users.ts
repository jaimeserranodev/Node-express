import { NewUser, User } from '../models/User';
import { BadRequest } from '../models/error';
import fs from 'fs';


const users: User[] = JSON.parse(fs.readFileSync(__dirname + '/dataBase/UserData.json').toString());

function saveJson() {
const jsonData = JSON.stringify(users, null, 2);
fs.writeFileSync(__dirname + '/dataBase/UserData.json', jsonData);
}

const getAll = () => users;

const getOne = (id: number) => {
const user = users.find(user => user.id === id);
if (!user) {
    throw new BadRequest('No user found by provided ID', 404);
}
return user;
}

const create = (newUserInfo: NewUser) => {
const newUser: User = {
    id: users[users.length-1].id + 1,
    ...newUserInfo,
    start_date: new Date(),
}
users.push(newUser);
saveJson();
return newUser;
}

const update = (updatedUser: Partial<User>) => {
for (let [idx, user] of users.entries()) {
    if (user.id === updatedUser.id) {
    users[idx] = {
        ...user,
        ...updatedUser,
    }
    saveJson();
    return users[idx];
    }
}
throw new BadRequest('No user found by provided ID', 404);
}

const _delete = (id: number) => {
for (const [idx, user] of users.entries()) {
    if (user.id === id) {
    users.splice(idx, 1);
    saveJson();
    return `User ${id} Deleted`;
    }
}
throw new BadRequest('No user found by provided ID', 404);
}

export default { getAll, getOne, create, update, delete: _delete }