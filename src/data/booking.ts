import { Booking, NewBooking } from '../models/bookings';
import fs from "fs";
import { BadRequest } from '../models/error';

const bookings: Booking[] = JSON.parse(fs.readFileSync('./src/data/dataBase/BookingData.json', 'utf8'));

function saveJson() {
    const jsonAsString = JSON.stringify(bookings);
    fs.writeFileSync('./src/data/dataBase/BookingData.json', JSON.stringify(bookings));
}

const getAll = ()   => bookings;

const getOne = (id: number) => {
    const booking = bookings.find((booking) => booking.id === id);
    if (!booking) {
        throw new Error(`No existe ninguna reserva con id ${id}`);
    }
    return booking;
};

const create = (newBookingInfo: NewBooking) => {
    const newBooking: Booking = {
        id: bookings[bookings.length-1].id + 1,
        ...newBookingInfo,
        order_date: new Date().toISOString(),
        guest_id: '#' + Math.trunc(Math.random() * 100000000)
    }
    bookings.push(newBooking);
    saveJson();
    return newBooking;
}

const update = (updatedBooking: NewBooking & {id: number}) => {
    for (let [idx, booking] of bookings.entries()) {
        if (booking.id === updatedBooking.id) {
            bookings[idx] = {
            ...updatedBooking,
            order_date: booking.order_date,
            guest_id: booking.guest_id,
            id: booking.id
            }
            saveJson();
            return bookings[idx];
        }
        }
        throw new BadRequest('No booking found by provided ID', 404);
}

const _delete = (id: number) => {
    for (const [idx, booking] of bookings.entries()) {
    if (booking.id === id) {
        bookings.splice(idx, 1);
        saveJson();
        return `Booking ${id} Deleted`;
    }
    }
    throw new BadRequest('No booking found by provided ID', 404);
}

export default { getAll, getOne, create,  update, delete: _delete }