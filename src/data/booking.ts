// import { Booking, NewBooking } from '../models/bookings';
// import fs from "fs";
// import { BOOKINGS, NEW_BOOKINGS } from './seed';
// import { BadRequest } from '../models/error';
// import { FakeBooking } from './seed';

// function saveJson() {
//     fs.writeFileSync('./src/data/dataBase/BookingData.json', JSON.stringify(BOOKINGS));
// }

// const getAll = ()   => FakeBooking;

// const getOne = (id: number) => {
//     const booking = BOOKINGS.find((booking) => booking.id === id);
//     if (!booking) {
//         throw new Error(`No existe ninguna reserva con id ${id}`);
//     }
//     return booking;
// };

// const create = (newBookingInfo: NewBooking) => {
//     const newBooking: Booking = {
//         id: BOOKINGS[BOOKINGS.length-1].id + 1,
//         ...newBookingInfo,
//         order_date: new Date(),
//         guest_id: '#' + Math.trunc(Math.random() * 100000000)
//     }
//     BOOKINGS.push(newBooking);
//     saveJson();
//     return newBooking;
// }

// const update = (updatedBooking: NewBooking & {id: number}) => {
//     for (let [idx, booking] of BOOKINGS.entries()) {
//         if (booking.id === updatedBooking.id) {
//             BOOKINGS[idx] = {
//             ...updatedBooking,
//             order_date: booking.order_date,
//             guest_id: booking.guest_id,
//             id: booking.id
//             }
//             saveJson();
//             return BOOKINGS[idx];
//         }
//         }
//         throw new BadRequest('No booking found by provided ID', 404);
// }

// const _delete = (id: number) => {
//     for (const [idx, booking] of BOOKINGS.entries()) {
//     if (booking.id === id) {
//         BOOKINGS.splice(idx, 1);
//         saveJson();
//         return `Booking ${id} Deleted`;
//     }
//     }
//     throw new BadRequest('No booking found by provided ID', 404);
// }

// export default { getAll, getOne, create,  update, delete: _delete }