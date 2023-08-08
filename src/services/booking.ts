import { Schema, Document, model } from 'mongoose';
import { Request, Response } from "express";

// import toNewBooking from '../util/toNewBooking';

export interface Booking extends Document {
    guest: string | undefined;
    guest_id: string;
    photo: string | undefined;
    order_date: string;
    check_in: string;
    check_out: string;
    room_type: string | undefined;
    special_request: string | undefined;
    status: 'Check In' | 'In Progress' | 'Check Out';
}

export interface NewBooking extends Document {
    guest: string | undefined;
    photo: string | undefined;
    check_in: string;
    check_out: string;
    room_type: string | undefined;
    special_request: string | undefined;
    status: 'Check In' | 'In Progress' | 'Check Out';
}

const BookingSchema = new Schema({
    
    guest: { type: String, },
    guest_id: { type: String,  },
    photo: { type: String,  },
    order_date: { type: String,  },
    check_in: { type: String,  },
    check_out: { type: String, },
    room_type: { type: String,  },
    special_request: { type: String,  },
    status: { type: String,  },
});

export const BookingModel = model<Booking>('Booking', BookingSchema);

const NewBookingSchema = new Schema({
    guest: { type: String,  },
    photo: { type: String,  },
    check_in: { type: String,  },
    check_out: { type: String, },
    room_type: { type: String,  },
    special_request: { type: String,  },
    status: { type: String,  },
});

export const NewBookingModel = model<NewBooking>('NewBooking', NewBookingSchema);

const getBookings = async (req: Request, res: Response) => {
    try {
        // Utilizar el modelo Booking para obtener todas las reservas
        const bookings = await BookingModel.find().exec();
        return res.status(200).json(bookings);
    } catch (error) {
        return res.status(404).json({ error: (error as any).message });
    };
};

const getBookingById = async (req: Request<{ id: string }, Booking>, res: Response) => {
    try {
        // Utilizar el modelo Booking para obtener una reserva por su ID
        const booking = await BookingModel.findById(req.params.id).exec();
        if (!booking) {
            return res.status(404).json({ error: "Reserva no encontrada" });
        }
        return res.status(200).json(booking);
    } catch (error) {
        return res.status(404).json({ error: (error as any).message });
    };
};

const createBooking = async (req: Request<{}, {}, NewBooking>, res: Response) => {
    try {
        // Utilizar el modelo NewBookingModel para crear una nueva reserva

        const statusOptions = ["Check In", "In Progress", "Check Out"];
        const room_type = ["Single", "Double", "Suite", "Double Superior"];

        const newBookingData  = new BookingModel({
            guest: req.body.guest,
            photo: req.body.photo,
            order_date: String(new Date()),
            check_in: req.body.check_in,
            check_out: req.body.check_out,
            room_type: req.body.room_type,
            special_request: req.body.special_request,
            status: statusOptions[Math.floor(Math.random() * statusOptions.length)],
        });

        const newBooking = new BookingModel(newBookingData );
        const savedBooking = await newBooking.save();
        return res.status(201).json(savedBooking);
    } catch (error) {
        return res.status(404).json({ error: (error as any).message });
    };
};

const updateBooking = async (req: Request<{ id: string }, Booking>, res: Response) => {
    try {
        // Utilizar el modelo Booking para actualizar una reserva existente
        // const validateBooking = toNewBooking(req.body);
        const updatedBooking = await BookingModel.findByIdAndUpdate(req.params.id, { new: true }).exec();
        if (!updatedBooking) {
            return res.status(404).json({ error: "Reserva no encontrada" });
        }
        return res.status(200).json(updatedBooking);
    } catch (err: any) {
        return res.status(err.status ?? 500).send(err.message);
    }
};

const deleteBooking = async (req: Request<{ id: string }, string>, res: Response) => {
    try {
        // Utilizar el modelo Booking para eliminar una reserva por su ID
        const deletedBooking = await BookingModel.findByIdAndDelete(req.params.id).exec();
        if (!deletedBooking) {
            return res.status(404).json({ error: "Reserva no encontrada" });
        }
        return res.status(200).json({ message: "Reserva eliminada exitosamente" });
    } catch (err: any) {
        return res.status(err.status ?? 500).send(err.message);
    }
};

export { getBookings, getBookingById, createBooking, updateBooking, deleteBooking };
