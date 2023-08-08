// import { Contact, NewContact } from "../models/contact";
// import  { CONTACTS, NEW_CONTACTS } from '../data/seed';

// import fs from 'fs';


// function saveJson() {
//     const jsonData = JSON.stringify(CONTACTS, null, 2);
//     fs.writeFileSync(__dirname + '/dataBase/contactListData.json', JSON.stringify(CONTACTS));
// }

// const getAll = () => CONTACTS;

// const getOne = (id: Number) => {
//     const contact = CONTACTS.find((contact) => contact.id === id);
//     if (!contact) {
//     throw new Error('Contact not found');
//     }
    
// }

// const create = (newContactInfo: NewContact) => {
//     const newContact: Contact = {
//         id: (Number(CONTACTS[CONTACTS.length-1].id) + 1),
//         ...newContactInfo,
//         date: new Date()
//     }
//     CONTACTS.push(newContact);
//     saveJson();
//     return newContact;
// }

// const update = (updatedContact: Omit<Contact, 'date'>) => {
//     for (let [idx, contact] of CONTACTS.entries()) {
//         if (contact.id === updatedContact.id) {
//             CONTACTS[idx] = {
//             ...updatedContact,
//             date: contact.date
//         }
//         saveJson();
//         return CONTACTS[idx];
//         }
//     }
//     throw new Error('Contact not found');
// }

// const _delete = (id: number) => {
//     for (const [idx, contact] of CONTACTS.entries()) {
//         if (contact.id === id) {
//         CONTACTS.splice(idx, 1);
//         saveJson();
//         return `Contact ${id} Deleted`;
//         }
//     }
//     throw new Error('Contact not found');
// }

// export default { getAll, getOne, create, update, delete: _delete }