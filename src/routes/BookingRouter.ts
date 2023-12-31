import { Router } from 'express';
import { getBookings, getBookingById, createBooking, deleteBooking, updateBooking } from '../controllers/booking';

const BookingRouter = Router();

BookingRouter.get('/', getBookings);

BookingRouter.get('/:id', getBookingById);

BookingRouter.post('/', createBooking);

BookingRouter.put('/:id', updateBooking);

BookingRouter.delete('/:id', deleteBooking);
export default BookingRouter;