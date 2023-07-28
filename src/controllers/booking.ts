import { Request, Response  }  from "express";
import booking from "../data/booking";
import { Booking, NewBooking } from "../models/bookings";
import toNewBooking from '../util/toNewBooking';

const getBookings = (req: Request, res: Response) => {
    try {
        return res.status(200).json(booking.getAll());
    } catch (error) {
        return res.status(404).json({ error: (error as any).mensaje });
    };
};

const getBookingById = (req: Request <{id: string}, Booking>, res: Response) => {
    try{
        return res.status(200).json(booking.getOne(parseInt(req.params.id)));
    } catch (error) {
        return res.status(404).json({ error: (error as any).mensaje });
    };
    }

const createBooking = (req: Request <{}, {}, NewBooking>, res: Response) => {
    try{
        return res.status(201).json(booking.create(req.body));
    } catch (error) {
        return res.status(404).json({ error: (error as any).mensaje });
    };
    }
const updateBooking = (req: Request<{ id: string }, Booking, NewBooking>, res: Response) => {
    try {
        const validateBooking = toNewBooking(req.body);
        return res.send(booking.update({ id: Number(req.params.id), ...validateBooking }));
    } catch (err: any) {
        return res.status(err.status ?? 500).send(err.message);
    }
    }
    
    const deleteBooking = (req: Request<{ id: string }, string>, res: Response) => {
    try {
        return res.send(booking.delete(Number(req.params.id)));
    } catch (err: any) {
        return res.status(err.status ?? 500).send(err.message);
    }
    }

    export { getBookings, getBookingById, createBooking, updateBooking, deleteBooking }