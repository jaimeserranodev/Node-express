import express from 'express';
import serverless from 'serverless-http';
import dotenv from 'dotenv';
import 'dotenv/config';
import passport from 'passport';
import {connectDB}  from "./util/db";

import BookingRouter from './routes/BookingRouter';
import RoomRouter from './routes/RoomRouter';
import LoginRouter from './controllers/login';
import ContactRouter from './routes/ContactRouter';
import UserRouter from './routes/UserRouter';
import "./middleware/auth";
import cors from 'cors'
dotenv.config();
export const app = express();



app.use(cors())
app.use((req, res, next) => {
  if (req.method === 'OPTIONS')
      return res.end();
  next()
});

app.use(express.json());
connectDB();
// Configurar la ruta raíz
app.get('/info', (req, res) => {
  res.send('¡Hola! Bienvenido a MIRANDA.');
});


app.use('/login', LoginRouter)

  // Configurar las rutas usando el enrutador BookingRouter
  app.use('/bookings', passport.authenticate('jwt', { session: false }), BookingRouter);

  // Configurar las rutas usando el enrutador RoomRouter
  app.use('/rooms', passport.authenticate('jwt', { session: false }), RoomRouter);

  // Configurar las rutas usando el enrutador ContactRouter
  app.use('/contact', passport.authenticate('jwt', { session: false }), ContactRouter);

  // Configurar las rutas usando el enrutador UserRouter
  app.use('/users', passport.authenticate('jwt', { session: false }), UserRouter);





