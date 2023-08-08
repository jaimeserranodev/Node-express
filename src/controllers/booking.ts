import { Request, Response  }  from "express";
import { Booking, NewBooking } from "../models/bookings";
import { NewBookingModel } from "../services/booking";
import { BookingModel } from "../services/booking";

const getBookings = async (req: Request, res: Response) => {
    try {
        const bookings = await BookingModel.find().exec();
        return res.status(200).json(bookings);
    } catch (error) {
        return res.status(404).json({ error: (error as any).mensaje });
    };
};

const getBookingById = async (req: Request <{id: string}, Booking>, res: Response) => {
    try{
        const booking = await BookingModel.findById(req.params.id).exec();
        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        return res.status(200).json(booking);

        } catch (error) {
            return res.status(404).json({ error: (error as any).mensaje });
        };
    }

const createBooking =  async (req: Request <{}, {}, NewBooking>, res: Response) => {
    try{
        const newBooking = new NewBookingModel(req.body);
        const savedUser = await newBooking.save();
        return res.status(201).json(savedUser);
    } catch (error) {
        return res.status(404).json({ error: (error as any).mensaje });
    };
    }

const updateBooking = async (req: Request<{ id: string }, Booking, NewBooking>, res: Response) => {
    try {
        const updatedBooking = await BookingModel.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec();
        if (!updatedBooking) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        return res.status(200).json(updatedBooking);
    } catch (error) {
        return res.status(404).json({ error: (error as any).mensaje });
    };
    }

    
    const deleteBooking = async (req: Request<{ id: string }, string>, res: Response) => {
    try {
        const deletedBooking = await BookingModel.findByIdAndDelete(req.params.id).exec();
        if (!deletedBooking) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        return res.status(200).json(deletedBooking);
    } catch (error) {
        return res.status(404).json({ error: (error as any).mensaje });
    };
    }


    export { getBookings, getBookingById, createBooking, updateBooking, deleteBooking }